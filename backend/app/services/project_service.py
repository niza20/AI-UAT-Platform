import os
import json
import shutil
from datetime import datetime

PROJECT_DIR = "storage/projects"


class ProjectService:

    @staticmethod
    def create_project(file_path):

        os.makedirs(PROJECT_DIR, exist_ok=True)

        existing = [
            d for d in os.listdir(PROJECT_DIR)
            if os.path.isdir(os.path.join(PROJECT_DIR, d))
        ]

        project_id = f"P{len(existing)+1:03}"

        folder = os.path.join(PROJECT_DIR, project_id)

        os.makedirs(folder, exist_ok=True)

# Create first version
        os.makedirs(
            os.path.join(folder, "v1"),
            exist_ok=True
)

        filename = os.path.basename(file_path)

        shutil.copy(
            file_path,
            os.path.join(folder, filename)
        )

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

            json.dump(

                metadata,

                f,

                indent=4,

                ensure_ascii=False

            )

        return project_id
    

    @staticmethod
    def create_version(project_id):

        folder = os.path.join(PROJECT_DIR, project_id)

        versions = []

        for item in os.listdir(folder):

            path = os.path.join(folder, item)

            if os.path.isdir(path) and item.startswith("v"):

                try:

                    versions.append(int(item[1:]))

                except:

                    pass

        version = f"v{max(versions)+1}" if versions else "v1"

        os.makedirs(

            os.path.join(folder, version),

            exist_ok=True

        )

        return version

    @staticmethod
    def save_json(
        project_id,
        filename,
        data,
        version=None
    ):

        if version is None:
            version = "v1"

        folder = os.path.join(
            PROJECT_DIR,
            project_id,
            version
)

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

    @staticmethod
    def get_versions(project_id):

        folder = os.path.join(
            PROJECT_DIR,
            project_id
        )

        if not os.path.exists(folder):
            return []

        versions = [

            d

            for d in os.listdir(folder)

            if d.startswith("v")
            and os.path.isdir(
                os.path.join(folder, d)
            )

        ]

        versions = sorted(
            versions,
            key=lambda x: int(x[1:])
        )

        return versions