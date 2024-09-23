use std::{
    fs::{read_to_string, File},
    io::Write,
    path::Path,
};

use crate::{
    err::{ProjectReadError, ProjectWritingError},
    project::model::Project,
};

pub const PROJECT: &str = "compendium_project.json";

pub fn write_project(project: &Project) -> Result<(), ProjectWritingError> {
    File::create(project.meta_path())?
        .write_all(serde_json::to_string(project).unwrap().as_bytes())
        .map_err(|_| ProjectWritingError::Interrupted)
}

pub fn read_project(path: String) -> Result<Project, ProjectReadError> {
    Ok(serde_json::from_str::<Project>(&read_to_string(
        Path::new(&path).join(PROJECT),
    )?)?)
}
