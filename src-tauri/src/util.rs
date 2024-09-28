use std::path::Path;

#[tauri::command]
pub fn relativize_path(path: String, base: String) -> Result<String, ()> {
    pathdiff::diff_paths(path, base)
        .map(|path| path.to_str().unwrap().to_string())
        .ok_or(())
}

#[tauri::command]
pub fn absolutize_path(path: String, base: String) -> Result<String, ()> {
    Path::new(&base)
        .join(path)
        .canonicalize()
        .map(|path| path.to_str().unwrap().to_string())
        .map_err(|_| ())
}
