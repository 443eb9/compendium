use std::{
    fs,
    path::{Path, PathBuf},
    sync::Mutex,
};

use compendium_macros::SerializableError;
use serde::{Deserialize, Serialize};
use tauri::{
    ipc::{InvokeResponseBody, Response},
    State,
};
use thiserror::Error;

use crate::project::io::{ProjectOpenError, ProjectWritingError, PROJECT_META};

pub mod io;

#[tauri::command]
pub fn create_project(
    path: String,
    project: State<Mutex<Option<Project>>>,
) -> Result<(), ProjectCreationError> {
    let dir = fs::read_dir(&path).map_err(|_| ProjectCreationError::IoError)?;
    if dir.count() != 0 {
        return Err(ProjectCreationError::NotEmpty);
    }

    let proj = Project::new(path)?;
    io::write_project_meta(&proj)?;
    project.lock().unwrap().replace(proj);
    Ok(())
}

#[tauri::command]
pub fn open_project(
    path: String,
    project: State<Mutex<Option<Project>>>,
) -> Result<(), ProjectOpenError> {
    *project.lock().unwrap() = Some(io::open_project(path)?);
    Ok(())
}

#[tauri::command]
pub fn close_project(project: State<Mutex<Option<Project>>>) -> Result<(), ProjectCloseError> {
    let mut guard = project.lock().unwrap();
    let project = guard
        .as_ref()
        .ok_or_else(|| ProjectCloseError::ProjectUninitialized)?;
    io::write_project_meta(&project)?;
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

#[derive(Serialize, Deserialize)]
pub struct Project {
    pub path: String,
    pub name: String,
}

impl Project {
    #[inline]
    pub fn new(path: String) -> Result<Self, ProjectCreationError> {
        let name = Path::new(&path)
            .file_name()
            .ok_or_else(|| ProjectCreationError::RootFolder)?;
        Ok(Project {
            name: name.to_str().unwrap().to_string(),
            path,
        })
    }

    #[inline]
    pub fn meta_path(&self) -> PathBuf {
        Path::new(&self.path).join(PROJECT_META)
    }
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCreationError {
    #[error("projectCreateFailRootFolder")]
    RootFolder,
    #[error("projectCreateFailNotEmpty")]
    NotEmpty,
    #[error("projectCreateIoError")]
    IoError,
    #[error("{0}")]
    WritingError(#[from] ProjectWritingError),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCloseError {
    #[error("projectCloseErrorProjectUninitialized")]
    ProjectUninitialized,
    #[error("{0}")]
    WritingError(#[from] ProjectWritingError),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectFetchError {
    #[error("projectFetchErrorProjectUninitialized")]
    ProjectUninitialized,
}
