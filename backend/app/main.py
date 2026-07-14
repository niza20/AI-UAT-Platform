from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.export import router as export_router
from app.api.projects import router as project_router
from app.api.project_details import router as project_detail_router
from app.api.copilot import router as copilot_router

app = FastAPI(title="AI UAT Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(upload_router)
app.include_router(export_router)
app.include_router(project_router)
app.include_router(project_detail_router)
app.include_router(copilot_router)


@app.get("/")
def home():
    return {
        "message": "Backend Running 🚀"
    }