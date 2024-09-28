use std::path::Path;

// https://stackoverflow.com/questions/50322817/how-do-i-remove-the-prefix-from-a-canonical-windows-path
#[cfg(not(target_os = "windows"))]
fn adjust_canonicalization<P: AsRef<Path>>(p: P) -> String {
    p.as_ref().display().to_string()
}

#[cfg(target_os = "windows")]
fn adjust_canonicalization<P: AsRef<Path>>(p: P) -> String {
    const VERBATIM_PREFIX: &str = r#"\\?\"#;
    let p = p.as_ref().display().to_string();
    if p.starts_with(VERBATIM_PREFIX) {
        p[VERBATIM_PREFIX.len()..].to_string()
    } else {
        p
    }
}

#[tauri::command]
pub fn relativize_path(path: String, base: String) -> Result<String, String> {
    if Path::new(&path).is_absolute() {
        pathdiff::diff_paths(path, base)
            .map(|path| path.to_str().unwrap().to_string())
            .ok_or_else(|| "Failed to calculate relative path.".to_string())
    } else {
        Ok(path)
    }
}

#[tauri::command]
pub fn absolutize_path(path: String, base: String) -> Result<String, ()> {
    let p = Path::new(&path);
    if p.is_relative() {
        Ok(adjust_canonicalization(Path::new(&base).join(p)))
    } else {
        Ok(path)
    }
}
