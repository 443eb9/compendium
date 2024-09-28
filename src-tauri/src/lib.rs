use std::sync::Mutex;

use tauri::Manager;

use crate::project::model::Project;

mod err;
mod project;
mod util;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            project::create_project,
            project::open_project,
            project::close_project,
            project::fetch_project,
            project::update_project,
            util::relativize_path,
            util::absolutize_path,
        ])
        .setup(|app| {
            app.manage(Mutex::<Option<Project>>::new(None));
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
