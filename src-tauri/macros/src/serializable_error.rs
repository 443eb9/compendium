pub fn expand_serializable_error_derive(input: syn::DeriveInput) -> proc_macro::TokenStream {
    let ty = &input.ident;
    let (impl_generics, type_generics, where_clause) = input.generics.split_for_impl();

    quote::quote! {
        impl #impl_generics serde::Serialize for #ty #type_generics #where_clause {
            fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
            where
                S: serde::Serializer,
            {
                serializer.serialize_str(self.to_string().as_ref())
            }
        }
    }
    .into()
}
