from fastapi import APIRouter
import os
import json

from app.services.project_service import (
    PROJECT_DIR,
    ProjectService,
)

router = APIRouter()


@router.get("/projects")
def get_projects():

    os.makedirs(PROJECT_DIR, exist_ok=True)

    projects = []

    for project_id in sorted(os.listdir(PROJECT_DIR)):

        folder = os.path.join(PROJECT_DIR, project_id)

        if not os.path.isdir(folder):
            continue

        metadata_file = os.path.join(folder, "metadata.json")

        if not os.path.exists(metadata_file):
            continue

        try:
            with open(metadata_file, "r", encoding="utf-8") as f:
                metadata = json.load(f)

        except Exception as e:
            print(f"Skipping {project_id}: {e}")
            continue

        metadata["versions"] = ProjectService.get_versions(project_id)

        if len(metadata["versions"]) == 0:
            continue

        projects.append(metadata)

    return projects