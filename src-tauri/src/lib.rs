use std::sync::Mutex;

use tauri::Manager;

use crate::project::Project;

mod project;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            project::create_project,
            project::open_project,
            project::close_project,
            project::fetch_project
        ])
        .setup(|app| {
            app.manage(Mutex::<Option<Project>>::new(None));
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
