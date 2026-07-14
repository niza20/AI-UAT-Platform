import os
import json

from fastapi import APIRouter, HTTPException

from app.services.project_service import ProjectService

router = APIRouter()

PROJECT_DIR = "storage/projects"


@router.get("/projects/{project_id}")
def get_project(project_id: str):

    folder = os.path.join(PROJECT_DIR, project_id)

    if not os.path.exists(folder):
        raise HTTPException(status_code=404, detail="Project not found")

    versions = ProjectService.get_versions(project_id)

    if not versions:
        raise HTTPException(status_code=404, detail="No versions found")

    latest = versions[-1]

    version_folder = os.path.join(folder, latest)

    def read(filename):

        path = os.path.join(version_folder, filename)

        if os.path.exists(path):

            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)

        return []

    metadata = {}

    metadata_path = os.path.join(folder, "metadata.json")

    if os.path.exists(metadata_path):

        with open(metadata_path, "r", encoding="utf-8") as f:
            metadata = json.load(f)

    return {

        "project_id": project_id,

        "version": latest,

        "metadata": metadata,

        "modules": read("modules.json"),

        "requirements": read("requirements.json"),

        "questions": read("questions.json"),

        "scenarios": read("scenarios.json"),

        "testcases": read("testcases.json"),

        "traceability": read("traceability.json"),

        "analytics": read("analytics.json"),

        "quality": read("quality.json")

    }