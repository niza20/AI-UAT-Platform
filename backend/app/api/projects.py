import os
import json
from fastapi import APIRouter

router = APIRouter()

PROJECT_DIR = "storage/projects"


@router.get("/projects")
def get_projects():

    projects = []

    if not os.path.exists(PROJECT_DIR):
        return []

    for project in sorted(os.listdir(PROJECT_DIR)):

        meta = os.path.join(
            PROJECT_DIR,
            project,
            "metadata.json"
        )

        if os.path.exists(meta):

            with open(meta, "r") as f:

                projects.append(json.load(f))

    return projects