use std::{path::Path, sync::Mutex};

use tauri::{
    ipc::{InvokeResponseBody, Response},
    State,
};

use crate::{
    err::{
        Error, ProjectCloseError, ProjectCreationError, ProjectFetchError, ProjectReadError,
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
) -> Result<(), Error<ProjectCreationError>> {
    if Path::new(&path).join(PROJECT).exists() {
        return Err(Error::no_content(ProjectCreationError::AlreadyExists));
    }

    let proj = Project::new(path)?;
    io::write_project(&proj)
        .map_err(|err| Error::new(ProjectCreationError::WritingError, err.to_string()))?;
    project.lock().unwrap().replace(proj);
    Ok(())
}

#[tauri::command]
pub fn open_project(
    path: String,
    project: State<Mutex<Option<Project>>>,
) -> Result<(), Error<ProjectReadError>> {
    *project.lock().unwrap() = Some(io::read_project(path)?);
    Ok(())
}

#[tauri::command]
pub fn close_project(
    project: State<Mutex<Option<Project>>>,
) -> Result<(), Error<ProjectCloseError>> {
    let mut guard = project.lock().unwrap();
    let project = guard
        .as_ref()
        .ok_or_else(|| ProjectCloseError::ProjectUninitialized)?;
    io::write_project(&project)
        .map_err(|err| Error::new(ProjectCloseError::WritingError, err.to_string()))?;
    *guard = None;
    Ok(())
}

#[tauri::command]
pub fn fetch_project(
    project: State<Mutex<Option<Project>>>,
) -> Result<Response, Error<ProjectFetchError>> {
    match &*project.lock().unwrap() {
        Some(project) => Ok(Response::new(InvokeResponseBody::Json(
            serde_json::to_string(project).unwrap(),
        ))),
        None => Err(Error::no_content(ProjectFetchError::ProjectUninitialized)),
    }
}

#[tauri::command]
pub fn update_project(
    new_project: String,
    project: State<Mutex<Option<Project>>>,
) -> Result<(), Error<ProjectUpdateError>> {
    let mut project = project.lock().unwrap();
    let new_project = serde_json::from_str(&new_project)
        .map_err(|err| Error::new(ProjectUpdateError::InvalidProject, err.to_string()))?;

    io::write_project(&new_project)
        .map_err(|err| Error::new(ProjectUpdateError::WritingError, err.to_string()))?;
    *project = Some(new_project);

    Ok(())
}
