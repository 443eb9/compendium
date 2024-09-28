use quote::quote;

pub fn expand_serializable_error_derive(input: syn::DeriveInput) -> proc_macro::TokenStream {
    let ty = &input.ident;
    let (impl_generics, type_generics, where_clause) = input.generics.split_for_impl();
    let data = match &input.data {
        syn::Data::Enum(data_enum) => data_enum,
        syn::Data::Struct(_) | syn::Data::Union(_) => {
            panic!("SerializableError only supports enums.")
        }
    };

    let mut content = Vec::with_capacity(data.variants.len());

    for var in &data.variants {
        let var_ident = &var.ident;
        let var_arm = if var.fields.is_empty() {
            quote! { => String::default() }
        } else {
            quote! { (err) => err.to_string() }
        };

        content.push(quote! {
            Self::#var_ident #var_arm,
        });
    }

    quote::quote! {
        impl #impl_generics serde::Serialize for #ty #type_generics #where_clause {
            fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
            where
                S: serde::Serializer,
            {
                use serde::ser::SerializeStruct;

                let mut err = serializer.serialize_struct("Error", 2)?;
                err.serialize_field("ty", &self.to_string())?;
                err.serialize_field(
                    "content",
                    &match self {
                        #(#content)*
                    },
                )?;
                err.end()
            }
        }
    }
    .into()
}
