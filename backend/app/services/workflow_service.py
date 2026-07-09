from app.services.parser_service import parse_document
from app.services.module_detector import detect_modules

from app.agents.requirement_agent import extract_requirements_ai
from app.agents.clarification_agent import generate_questions
from app.agents.scenario_agent import generate_scenarios
from app.agents.testcase_builder import build_testcases

from app.services.project_service import ProjectService


class WorkflowService:

    @staticmethod
    def process_document(file_path: str, project_id):

        print("========== STEP 1: Parsing Document ==========")
        text = parse_document(file_path)
        print("✅ Parsing completed")

        print("========== STEP 2: Detecting Modules ==========")
        modules = detect_modules(text)
        print("✅ Module detection completed")

        print("========== STEP 3: Extracting Requirements ==========")
        requirements = extract_requirements_ai(text)

        ProjectService.save_json(
            project_id,
            "requirements.json",
            requirements
        )

        print(f"✅ Requirements extracted: {len(requirements)}")

        print("========== STEP 4: Generating Clarification Questions ==========")
        questions = generate_questions(requirements)

        ProjectService.save_json(
            project_id,
            "questions.json",
            questions
        )

        print(f"✅ Questions generated: {len(questions)}")

        # Temporary limit during development
        requirements = requirements[:5]

        print("========== STEP 5: Generating Scenarios ==========")
        scenarios = generate_scenarios(requirements)

        ProjectService.save_json(
            project_id,
            "scenarios.json",
            scenarios
        )

        print(f"✅ Scenarios generated: {len(scenarios)}")

        print("========== STEP 6: Building Test Cases ==========")
        testcases = build_testcases(scenarios)

        ProjectService.save_json(
            project_id,
            "testcases.json",
            testcases
        )

        print(f"✅ Test cases generated: {len(testcases)}")

        print("========== WORKFLOW FINISHED ==========")

        return {
            "text": text,
            "modules": modules,
            "requirements": requirements,
            "questions": questions,
            "testcases": testcases
        }