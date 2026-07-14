from collections import Counter


class AnalyticsService:

    @staticmethod
    def generate(requirements, testcases):
        print("🚀 NEW ANALYTICS SERVICE RUNNING")

        requirement_ids = {
            str(req.get("requirement_id", "")).strip().upper()
            for req in requirements
            if req.get("requirement_id")
        }

        testcase_requirement_ids = {
            str(tc.get("requirement_id", "")).strip().upper()
            for tc in testcases
            if tc.get("requirement_id")
        }

        total_requirements = len(requirement_ids)
        total_testcases = len(testcases)

        covered = len(requirement_ids & testcase_requirement_ids)
        missing = len(requirement_ids - testcase_requirement_ids)

        coverage = (
            round((covered / total_requirements) * 100, 2)
            if total_requirements
            else 0
        )

        print("Unique Requirements:", total_requirements)
        print("Covered:", covered)
        print("Missing:", missing)
        print("Coverage:", coverage)

        # -------------------------
        # Module Distribution
        # -------------------------

        module_counter = Counter()

        for tc in testcases:
            module_counter[tc.get("module", "Unknown")] += 1

        # -------------------------
        # Priority Distribution
        # -------------------------

        priority_counter = Counter()

        for tc in testcases:
            priority_counter[tc.get("priority", "Medium")] += 1

        # -------------------------
        # DEBUG
        # -------------------------

        print("\n========== ANALYTICS DEBUG ==========")
        print("Requirements:", requirement_ids)
        print("Covered IDs :", testcase_requirement_ids)
        print("Covered     :", covered)
        print("Missing     :", missing)
        print("Coverage    :", coverage)
        print("=====================================\n")

        return {
            "summary": {
                "requirements": total_requirements,
                "testcases": total_testcases,
                "covered": covered,
                "missing": missing,
                "coverage": coverage,
            },
            "modules": dict(module_counter),
            "priorities": dict(priority_counter),
        }