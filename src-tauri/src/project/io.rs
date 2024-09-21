use std::{
    fs::{read_to_string, File},
    io::Write,
    path::Path,
};

use compendium_macros::SerializableError;
use thiserror::Error;

use crate::project::Project;

pub const PROJECT_META: &str = "compendium_project.json";

#[derive(Debug, Error, SerializableError)]
pub enum ProjectWritingError {
    #[error("projectWritingErrorIoError")]
    IoError,
    #[error("projectWritingErrorInterrupted")]
    Interrupted,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectOpenError {
    #[error("projectOpenErrorIoError")]
    IoError,
    #[error("projectOpenErrorDeserializingError")]
    DeserializingError,
}

pub fn write_project_meta(project: &Project) -> Result<(), ProjectWritingError> {
    File::create(project.meta_path())
        .map_err(|_| ProjectWritingError::IoError)?
        .write_all(serde_json::to_string(project).unwrap().as_bytes())
        .map_err(|_| ProjectWritingError::Interrupted)
}

pub fn open_project(path: String) -> Result<Project, ProjectOpenError> {
    serde_json::from_str(
        &read_to_string(Path::new(&path).join(PROJECT_META))
            .map_err(|_| ProjectOpenError::IoError)?,
    )
    .map_err(|_| ProjectOpenError::DeserializingError)
}
