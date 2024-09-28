use std::{path::Path, sync::Mutex};

use tauri::{
    ipc::{InvokeResponseBody, Response},
    State,
};

use crate::{
    err::{
        ProjectCloseError, ProjectCreationError, ProjectFetchError, ProjectReadError,
        ProjectUpdateError,
    },
    project::{io::PROJECT, model::Project},
};

pub mod io;
pub mod model;

#[tauri::command]
pub fn create_project(
    path: String,
    project: State<Mutex<Option<Project>>>,
) -> Result<(), ProjectCreationError> {
    if Path::new(&path).join(PROJECT).exists() {
        return Err(ProjectCreationError::AlreadyExists);
    }

    let proj = Project::new(path)?;
    io::write_project(&proj)?;
    project.lock().unwrap().replace(proj);
    Ok(())
}

#[tauri::command]
pub fn open_project(
    path: String,
    project: State<Mutex<Option<Project>>>,
) -> Result<(), ProjectReadError> {
    let mut proj = io::read_project(path.as_str())?;
    proj.path = path;
    *project.lock().unwrap() = Some(proj);
    Ok(())
}

#[tauri::command]
pub fn close_project(project: State<Mutex<Option<Project>>>) -> Result<(), ProjectCloseError> {
    let mut guard = project.lock().unwrap();
    let project = guard
        .as_ref()
        .ok_or_else(|| ProjectCloseError::ProjectUninitialized)?;
    io::write_project(&project)?;
    *guard = None;
    Ok(())
}

#[tauri::command]
pub fn fetch_project(
    project: State<Mutex<Option<Project>>>,
) -> Result<Response, ProjectFetchError> {
    match &*project.lock().unwrap() {
        Some(project) => Ok(Response::new(InvokeResponseBody::Json(
            serde_json::to_string(project).unwrap(),
        ))),
        None => Err(ProjectFetchError::ProjectUninitialized),
    }
}

#[tauri::command]
pub fn update_project(
    new_project: String,
    project: State<Mutex<Option<Project>>>,
) -> Result<(), ProjectUpdateError> {
    let mut project = project.lock().unwrap();
    let new_project = serde_json::from_str(&new_project)?;

    io::write_project(&new_project)?;
    *project = Some(new_project);

    Ok(())
}
