use compendium_macros::SerializableError;
use thiserror::Error;

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCreationError {
    #[error("ProjectCreateFailRootFolder")]
    RootFolder,
    #[error("ProjectCreateFailAlreadyExists")]
    AlreadyExists,
    #[error("ProjectWritingError")]
    WritingError(#[from] ProjectWritingError),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCloseError {
    #[error("ProjectCloseErrorProjectUninitialized")]
    ProjectUninitialized,
    #[error("ProjectWritingError")]
    WritingError(#[from] ProjectWritingError),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectFetchError {
    #[error("ProjectFetchErrorProjectUninitialized")]
    ProjectUninitialized,
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectUpdateError {
    #[error("ProjectUpdateErrorInvalidProject")]
    InvalidProject(#[from] serde_json::Error),
    #[error("ProjectWritingError")]
    WritingError(#[from] ProjectWritingError),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectWritingError {
    #[error("{0}")]
    IoError(#[from] std::io::Error),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectReadError {
    #[error("{0}")]
    IoError(#[from] std::io::Error),
    #[error("{0}")]
    DeserializingError(#[from] serde_json::Error),
}
