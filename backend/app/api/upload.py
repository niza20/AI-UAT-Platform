from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.workflow_service import WorkflowService
from app.services.project_service import ProjectService

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_brd(file: UploadFile = File(...)):

    print("Upload request received")

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("File saved:", file_path)

# Create Project Folder
    project_id = ProjectService.create_project(file_path)

    print("Project Created:", project_id)

    print("Starting workflow...")
    result = WorkflowService.process_document(
    file_path,
    project_id
)

    
    print("Workflow finished")

    print("Workflow Keys:", result.keys())
    print("Requirements:", len(result["requirements"]))

    return {
    "project_id": project_id,
    "filename": file.filename,
    "modules": result["modules"],
    "requirements": result["requirements"],
    "questions": result["questions"],
    "testcases": result["testcases"]
}