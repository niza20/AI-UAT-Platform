from app.engine.action_engine import ACTIONS, detect_action


def detect_object(scenario: str, action: str):

    scenario_lower = scenario.lower()

    if action in scenario_lower:
        idx = scenario_lower.find(action)
        obj = scenario[idx + len(action):].strip()

        if obj:
            return obj.title()

    # Better fallback
    words = scenario.split()

    if len(words) >= 2:
        return " ".join(words[-2:]).title()

    return scenario.title()


def build_expected(step_action: str):

    action = step_action.lower()

    if "open" in action:
        return "Requested page is displayed successfully."

    if "view" in action:
        return "Relevant information is displayed."

    if "create" in action:
        return "Record is created successfully."

    if "approve" in action:
        return "Request is approved successfully."

    if "reject" in action:
        return "Request is rejected successfully."

    if "submit" in action:
        return "Submission completes successfully."

    if "verify" in action:
        return "Displayed information matches expected values."

    if "delete" in action:
        return "Record is deleted successfully."

    if "update" in action:
        return "Changes are saved successfully."

    return "Expected business outcome is achieved."


def build_steps(scenario):

    action = detect_action(scenario)

    obj = detect_object(scenario, action)

    template = ACTIONS[action]

    steps = []

    for i, step in enumerate(template, start=1):

        step_action = step.replace("{object}", obj)

        steps.append({

            "step_number": i,

            "actor": "Business User",

            "navigation": obj,

            "action": step_action,

            "expected_result": build_expected(step_action)

        })

    return steps