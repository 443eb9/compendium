use compendium_macros::SerializableError;
use serde::Serialize;
use tauri::ipc::InvokeError;
use thiserror::Error;

#[derive(Serialize)]
pub struct Error<E: std::error::Error> {
    pub ty: E,
    pub content: String,
}

impl<E: std::error::Error> From<E> for Error<E> {
    fn from(value: E) -> Self {
        Self {
            ty: value,
            content: String::default(),
        }
    }
}

impl<E: std::error::Error> Error<E> {
    pub fn new(ty: E, content: String) -> Self {
        Self { ty, content }
    }

    pub fn no_content(ty: E) -> Self {
        Self {
            ty,
            content: String::default(),
        }
    }
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCreationError {
    #[error("ProjectCreateFailRootFolder")]
    RootFolder,
    #[error("ProjectCreateFailAlreadyExists")]
    AlreadyExists,
    #[error("ProjectWritingError")]
    WritingError,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCloseError {
    #[error("ProjectCloseErrorProjectUninitialized")]
    ProjectUninitialized,
    #[error("ProjectWritingError")]
    WritingError,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectFetchError {
    #[error("ProjectFetchErrorProjectUninitialized")]
    ProjectUninitialized,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectUpdateError {
    #[error("ProjectUpdateErrorInvalidProject")]
    InvalidProject,
    #[error("ProjectWritingError")]
    WritingError,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectWritingError {
    #[error("ProjectWritingErrorIoError")]
    IoError(#[from] std::io::Error),
    #[error("ProjectWritingErrorInterrupted")]
    Interrupted,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectOpenError {
    #[error("ProjectOpenErrorIoError")]
    IoError(#[from] std::io::Error),
    #[error("ProjectOpenErrorDeserializingError")]
    DeserializingError(#[from] serde_json::Error),
}
