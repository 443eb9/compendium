use std::{
    collections::{HashMap, HashSet},
    hash::{Hash, Hasher},
    path::{Path, PathBuf},
};

use serde::{Deserialize, Serialize};
use serde_repr::{Deserialize_repr, Serialize_repr};
use uuid::Uuid;

use crate::{
    err::{Error, ProjectCreationError},
    project::io::PROJECT,
};

#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub path: String,
    pub name: String,
    pub assets: HashMap<Id, Asset>,
    pub assets_settings: AssetSettingsData,
    pub items: HashMap<Id, Item>,
    pub items_settings: ItemsSettings,
}

impl Project {
    #[inline]
    pub fn new(path: String) -> Result<Self, Error<ProjectCreationError>> {
        let name = Path::new(&path)
            .file_name()
            .ok_or_else(|| ProjectCreationError::RootFolder)?;
        Ok(Project {
            name: name.to_str().unwrap().to_string(),
            path,
            ..Default::default()
        })
    }

    #[inline]
    pub fn meta_path(&self) -> PathBuf {
        Path::new(&self.path).join(PROJECT)
    }
}

#[derive(Default, Serialize_repr, Deserialize_repr)]
#[repr(u8)]
pub enum IdType {
    Uuid,
    #[default]
    IncreasingSequence,
}

#[derive(Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(untagged)]
pub enum Id {
    Uuid(Uuid),
    IncreasingSequence(u32),
}

impl Default for Id {
    fn default() -> Self {
        Self::IncreasingSequence(0)
    }
}

#[derive(Serialize, Deserialize, Eq)]
#[serde(rename_all = "camelCase")]
pub struct Tag {
    pub id: Id,
    pub name: String,
    pub color: String,
}

impl PartialEq for Tag {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Hash for Tag {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
    }
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Asset {
    pub ty: AssetType,
    pub id: Id,
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

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Item {
    pub id: Id,
    pub reference: String,
    pub name: String,
    pub tags: HashSet<Tag>,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ItemsSettings {
    pub id_type: IdType,
    pub next_id: u32,
}
