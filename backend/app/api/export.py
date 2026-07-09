from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.utils.excel_export import export_testcases

router = APIRouter()

# Stores latest generated testcases
latest_testcases = []


@router.post("/save-testcases")
def save_testcases(testcases: list):

    global latest_testcases

    latest_testcases.clear()
    latest_testcases.extend(testcases)

    return {"message": "Saved successfully"}


@router.get("/export-excel")
def export_excel():

    print("\n========== EXPORT DEBUG ==========")
    print("Total Testcases:", len(latest_testcases))

    if latest_testcases:
        print("First Testcase:")
        print(latest_testcases[0])

    print("==================================\n")

    export_testcases(latest_testcases)

    return FileResponse(
        "generated_testcases.xlsx",
        filename="AI_UAT_TestCases.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )