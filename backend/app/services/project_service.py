import os
import json
import shutil
from datetime import datetime

PROJECT_DIR = "storage/projects"


class ProjectService:

    @staticmethod
    def create_project(file_path):

        os.makedirs(PROJECT_DIR, exist_ok=True)

        existing = os.listdir(PROJECT_DIR)

        project_id = f"P{len(existing) + 1:03}"

        folder = os.path.join(PROJECT_DIR, project_id)

        os.makedirs(folder, exist_ok=True)

        filename = os.path.basename(file_path)

        shutil.copy(file_path, os.path.join(folder, filename))

        metadata = {
            "project_id": project_id,
            "file_name": filename,
            "created_at": datetime.now().isoformat(),
            "status": "Processed"
        }

        with open(
            os.path.join(folder, "metadata.json"),
            "w",
            encoding="utf-8"
        ) as f:
            json.dump(metadata, f, indent=4)

        return project_id

    @staticmethod
    def save_json(project_id, filename, data):

        folder = os.path.join(PROJECT_DIR, project_id)

        os.makedirs(folder, exist_ok=True)

        with open(
            os.path.join(folder, filename),
            "w",
            encoding="utf-8"
        ) as f:
            json.dump(
                data,
                f,
                indent=4,
                ensure_ascii=False
            )