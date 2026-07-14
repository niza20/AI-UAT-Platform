import os
import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.services.project_service import ProjectService
from app.utils.excel_export import export_ai_report

router = APIRouter()

PROJECT_DIR = "storage/projects"


@router.get("/export-excel")
def export_excel():

    if not os.path.exists(PROJECT_DIR):
        raise HTTPException(404, "No projects found")

    # Get all project folders
    projects = [

        p

        for p in os.listdir(PROJECT_DIR)

        if os.path.isdir(
            os.path.join(PROJECT_DIR, p)
        )

    ]

    if not projects:
        raise HTTPException(404, "No projects found")

    # Sort numerically
    projects = sorted(
        projects,
        key=lambda x: int(x.replace("P", ""))
    )

    project_id = None
    versions = []

    # Find latest project that actually has versions
    for p in reversed(projects):

        versions = ProjectService.get_versions(p)

        if versions:

            project_id = p
            break

    if project_id is None:
        raise HTTPException(
            404,
            "No processed projects found"
        )

    latest = versions[-1]

    version_folder = os.path.join(

        PROJECT_DIR,

        project_id,

        latest

    )

    def read(filename):

        path = os.path.join(
            version_folder,
            filename
        )

        if os.path.exists(path):

            with open(
                path,
                "r",
                encoding="utf-8"
            ) as f:

                return json.load(f)

        return []

    result = {

        "project_id": project_id,

        "version": latest,

        "modules": read("modules.json"),

        "requirements": read("requirements.json"),

        "questions": read("questions.json"),

        "scenarios": read("scenarios.json"),

        "testcases": read("testcases.json"),

        "traceability": read("traceability.json"),

        "analytics": read("analytics.json"),

        "quality": read("quality.json")

    }

    print("\n========== EXPORT ==========")

    print("Project :", project_id)
    print("Version :", latest)

    print("Modules :", len(result["modules"]))
    print("Requirements :", len(result["requirements"]))
    print("Questions :", len(result["questions"]))
    print("Scenarios :", len(result["scenarios"]))
    print("Testcases :", len(result["testcases"]))
    print("Traceability :", len(result["traceability"]))

    print("============================\n")

    export_ai_report(result)

    return FileResponse(

        "generated_testcases.xlsx",

        filename=f"{project_id}_{latest}_AI_UAT_Report.xlsx",

        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    )