import os
import json

from fastapi import APIRouter, HTTPException

router = APIRouter()

PROJECT_DIR = "storage/projects"


@router.get("/projects/{project_id}")
def get_project(project_id: str):

    folder = os.path.join(PROJECT_DIR, project_id)

    if not os.path.exists(folder):
        raise HTTPException(404, "Project not found")

    result = {}

    files = {
        "requirements": "requirements.json",
        "questions": "questions.json",
        "scenarios": "scenarios.json",
        "testcases": "testcases.json",
        "metadata": "metadata.json",
    }

    for key, filename in files.items():

        path = os.path.join(folder, filename)

        if os.path.exists(path):

            with open(path, "r", encoding="utf-8") as f:
                result[key] = json.load(f)

        else:
            result[key] = []

    return result