from app.services.parser_service import parse_document
from app.agents.testcase_builder import build_testcases
from app.agents.requirement_agent import extract_requirements_ai
from app.agents.clarification_agent import generate_questions
from app.agents.scenario_agent import generate_scenarios

from app.services.module_detector import detect_modules
from app.services.project_service import ProjectService
from app.services.traceability_service import TraceabilityService
from app.services.analytics_service import AnalyticsService
from app.services.quality_service import RequirementQualityService


class WorkflowService:

    @staticmethod
    def process_document(file_path: str, project_id):

        print("\n========== AI UAT WORKFLOW ==========\n")

        # -------------------------
        # Create Project Version
        # -------------------------

        version = ProjectService.create_version(project_id)

        print(f"Project Version : {version}")

        # -------------------------
        # STEP 1
        # -------------------------

        print("\nSTEP 1 : Parsing Document")

        text = parse_document(file_path)

        print("Done")

        # -------------------------
        # STEP 2
        # -------------------------

        print("\nSTEP 2 : Detecting Modules")

        modules = detect_modules(text)
        print("\nDetected Modules:")
        print(modules)
        ProjectService.save_json(
    project_id,
    "modules.json",
    modules,
    version
)
        print(modules)
        print(type(modules))

        print(modules)

        # -------------------------
        # STEP 3
        # -------------------------

        print("\nSTEP 3 : Extracting Requirements")

        requirements = extract_requirements_ai(text,modules,project_id)

        print(f"Requirements : {len(requirements)}")

        ProjectService.save_json(
            project_id,
            "requirements.json",
            requirements,
            version
        )

        # -------------------------
        # STEP 4
        # -------------------------

        print("\nSTEP 4 : Clarification Questions")

        questions = generate_questions(
            modules,requirements
        )

        print(f"Questions : {len(questions)}")

        ProjectService.save_json(
            project_id,
            "questions.json",
            questions,
            version
        )

        # -------------------------
        # STEP 5
        # -------------------------

        print("\nSTEP 5 : Business Scenarios")

        scenarios = generate_scenarios(
            requirements,questions
        )

        print(f"Scenarios : {len(scenarios)}")

        ProjectService.save_json(
            project_id,
            "scenarios.json",
            scenarios,
            version
        )

        # -------------------------
        # STEP 6
        # -------------------------

        print("\nSTEP 6 : Test Cases")

        testcases = build_testcases(
            scenarios
        )

        print(f"Test Cases : {len(testcases)}")

        ProjectService.save_json(
            project_id,
            "testcases.json",
            testcases,
            version
        )

        # -------------------------
        # STEP 7
        # -------------------------

        print("\nSTEP 7 : Traceability")

        traceability = TraceabilityService.build(

            requirements,

            testcases

        )

        ProjectService.save_json(

            project_id,

            "traceability.json",

            traceability,

            version

        )

        # -------------------------
        # STEP 8
        # -------------------------

        print("\nSTEP 8 : Analytics")

        analytics = AnalyticsService.generate(

            requirements,

            testcases

        )

        ProjectService.save_json(

            project_id,

            "analytics.json",

            analytics,

            version

        )

        # -------------------------
        # STEP 9
        # -------------------------

        print("\nSTEP 9 : Requirement Quality")

        quality = RequirementQualityService.analyze(

            requirements

        )

        ProjectService.save_json(

            project_id,

            "quality.json",

            quality,

            version

        )

        print("\n========== WORKFLOW COMPLETE ==========\n")

        return {

            "project_id": project_id,

            "version": version,

            "modules": modules,

            "requirements": requirements,

            "questions": questions,

            "scenarios": scenarios,

            "testcases": testcases,

            "traceability": traceability,

            "analytics": analytics,

            "quality": quality

        }