from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side


def export_testcases(testcases):

    print("\n========== EXCEL DEBUG ==========")
    print("Total Testcases:", len(testcases))

    if testcases:
        print("First Testcase:")
        print(testcases[0])

    print("=================================\n")

    wb = Workbook()
    ws = wb.active
    ws.title = "SIM"

    # ---------- Header ----------

    ws["A1"] = "SIM 1"
    ws["C1"] = "AI Generated UAT Test Cases"

    ws["A3"] = "Description"
    ws["C3"] = "Generated automatically from BRD"

    ws["A4"] = "Back"

    header_fill = PatternFill("solid", fgColor="D9EAD3")
    bold = Font(bold=True)

    thin = Side(style="thin")
    border = Border(
        left=thin,
        right=thin,
        top=thin,
        bottom=thin
    )

    headers = [
        "#",
        "Navigation",
        "Action",
        "Executed By",
        "Expected Result",
        "Status",
        "Tester",
        "Pass/Fail",
        "SIM ID",
        "Comments"
    ]

    for col, h in enumerate(headers, start=1):

        cell = ws.cell(row=5, column=col)
        cell.value = h
        cell.fill = header_fill
        cell.font = bold
        cell.alignment = Alignment(horizontal="center")

    row = 6

    # ---------- Test Cases ----------

    for tc in testcases:

        print("Current Testcase:", tc["testcase_id"])
        print("Steps:", tc.get("steps"))

        for step in tc.get("steps", []):

            ws.cell(row=row, column=1).value = step["step_number"]
            ws.cell(row=row, column=2).value = step["navigation"]
            ws.cell(row=row, column=3).value = step["action"]
            ws.cell(row=row, column=4).value = step["actor"]
            ws.cell(row=row, column=5).value = step["expected_result"]
            ws.cell(row=row, column=6).value = ""
            ws.cell(row=row, column=7).value = ""
            ws.cell(row=row, column=8).value = ""
            ws.cell(row=row, column=9).value = tc["testcase_id"]
            ws.cell(row=row, column=10).value = ""

            for col in range(1, 11):

                cell = ws.cell(row=row, column=col)
                cell.border = border
                cell.alignment = Alignment(
                    vertical="top",
                    wrap_text=True
                )

            row += 1

        row += 1

    widths = {
        "A": 8,
        "B": 30,
        "C": 60,
        "D": 20,
        "E": 60,
        "F": 12,
        "G": 15,
        "H": 12,
        "I": 15,
        "J": 25,
    }

    for col, width in widths.items():
        ws.column_dimensions[col].width = width

    wb.save("generated_testcases.xlsx")

    print("✅ Excel Generated Successfully")