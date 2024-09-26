use std::{
    collections::{HashMap, HashSet},
    hash::{Hash, Hasher},
    path::{Path, PathBuf},
    str::FromStr,
};

use serde::{de::Visitor, Deserialize, Serialize};
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
    pub tags: HashMap<Id, Tag>,
    pub tags_settings: TagsSettings,
    pub assets: HashMap<Id, Asset>,
    pub assets_settings: AssetSettings,
    pub items: HashMap<Id, Item>,
    pub items_settings: ItemsSettings,
    pub stories: HashMap<Id, Story>,
    pub story_settings: StorySettings,
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

#[derive(Default, Serialize_repr, Deserialize_repr)]
#[repr(u8)]
pub enum ReferenceType {
    #[default]
    Asset,
    Item,
    Structure,
}

#[derive(PartialEq, Eq, Hash)]
pub enum Id {
    Uuid(Uuid),
    IncreasingSequence(u32),
}

impl Serialize for Id {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&match self {
            Id::Uuid(uuid) => uuid.to_string(),
            Id::IncreasingSequence(id) => id.to_string(),
        })
    }
}

impl<'de> Deserialize<'de> for Id {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct IdVisitor;

        impl Visitor<'_> for IdVisitor {
            type Value = Id;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a uuid string or number string")
            }

            fn visit_u64<E>(self, v: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Id::IncreasingSequence(v as u32))
            }

            fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match v.parse::<u32>() {
                    Ok(ok) => Ok(Id::IncreasingSequence(ok)),
                    Err(_) => Ok(Id::Uuid(Uuid::from_str(v).unwrap())),
                }
            }
        }

        deserializer.deserialize_str(IdVisitor)
    }
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
    pub desc: String,
    pub color: String,
}

impl PartialEq for Tag {
    #[inline]
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Hash for Tag {
    #[inline]
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
    }
}

#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TagsSettings {
    pub id_type: IdType,
    pub next_id: u32,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Asset {
    pub ty: AssetType,
    pub id: Id,
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
pub struct AssetSettings {
    pub id_type: IdType,
    pub next_id: u32,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Item {
    pub id: Id,
    pub reference: String,
    pub name: String,
    pub desc: String,
    pub tags: HashSet<Id>,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ItemsSettings {
    pub id_type: IdType,
    pub next_id: u32,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Story {
    pub id: Id,
    pub reference: String,
    pub ref_type: ReferenceType,
    pub title: String,
    pub body: String,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StorySettings {
    pub id_type: IdType,
    pub next_id: u32,
}
