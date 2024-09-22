use std::{
    fs::{read_to_string, File},
    io::Write,
    path::Path,
};

use compendium_macros::SerializableError;
use thiserror::Error;

use crate::project::model::Project;

pub const PROJECT: &str = "compendium_project.json";

#[derive(Debug, Error, SerializableError)]
pub enum ProjectWritingError {
    #[error("ProjectWritingErrorIoError")]
    IoError,
    #[error("ProjectWritingErrorInterrupted")]
    Interrupted,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectOpenError {
    #[error("ProjectOpenErrorIoError")]
    IoError,
    #[error("ProjectOpenErrorDeserializingError")]
    DeserializingError,
}

pub fn write_project(project: &Project) -> Result<(), ProjectWritingError> {
    File::create(project.meta_path())
        .map_err(|_| ProjectWritingError::IoError)?
        .write_all(serde_json::to_string(project).unwrap().as_bytes())
        .map_err(|_| ProjectWritingError::Interrupted)
}

pub fn read_project(path: String) -> Result<Project, ProjectOpenError> {
    serde_json::from_str(
        &read_to_string(Path::new(&path).join(PROJECT)).map_err(|_| ProjectOpenError::IoError)?,
    )
    .map_err(|_| ProjectOpenError::DeserializingError)
}
