mod serializable_error;

#[proc_macro_derive(SerializableError)]
pub fn derive_serializable_error(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    serializable_error::expand_serializable_error_derive(syn::parse(input).unwrap())
}
