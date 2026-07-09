from app.engine.workflow_builder import build_steps


def build_testcases(scenarios):

    testcases = []

    for i, sc in enumerate(scenarios, start=1):

        testcases.append({

            "testcase_id": f"TC-{i:03}",

            "requirement_id": sc["requirement_id"],

            "module": sc["module"],

            "scenario": sc["scenario"],

            "priority": sc["priority"],

            "type": sc["type"],

            "preconditions": [
                "User is logged into application"
            ],

            "steps": build_steps(sc["scenario"]),

            "overall_expected_result": sc["scenario"] + " completed successfully."

        })

    return testcases