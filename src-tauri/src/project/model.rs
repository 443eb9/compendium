use std::path::{Path, PathBuf};

use compendium_macros::SerializableError;
use serde::{Deserialize, Serialize};
use serde_repr::{Deserialize_repr, Serialize_repr};
use thiserror::Error;

use crate::project::io::{ProjectWritingError, PROJECT};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub path: String,
    pub name: String,
    pub assets: Vec<Asset>,
    pub asset_settings: AssetSettingsData,
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
            assets: Default::default(),
            asset_settings: Default::default(),
        })
    }

    #[inline]
    pub fn meta_path(&self) -> PathBuf {
        Path::new(&self.path).join(PROJECT)
    }
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCreationError {
    #[error("ProjectCreateFailRootFolder")]
    RootFolder,
    #[error("ProjectCreateFailAlreadyExists")]
    AlreadyExists,
    #[error("{0}")]
    WritingError(#[from] ProjectWritingError),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectCloseError {
    #[error("ProjectCloseErrorProjectUninitialized")]
    ProjectUninitialized,
    #[error("{0}")]
    WritingError(#[from] ProjectWritingError),
}

#[derive(Debug, Error, SerializableError)]
pub enum ProjectFetchError {
    #[error("ProjectFetchErrorProjectUninitialized")]
    ProjectUninitialized,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Asset {
    pub ty: AssetType,
    pub id: String,
    pub name: String,
    pub path: String,
}

#[derive(Serialize_repr, Deserialize_repr)]
#[repr(u8)]
pub enum AssetType {
    Image,
    Video,
    Text,
    Model,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AssetSettingsData {
    pub id_type: IdType,
    pub next_id: u32,
}

#[derive(Default, Serialize_repr, Deserialize_repr)]
#[repr(u8)]
pub enum IdType {
    Uuid,
    #[default]
    IncreasingSequence,
}
