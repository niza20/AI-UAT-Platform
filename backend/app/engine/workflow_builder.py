from app.engine.action_engine import ACTIONS, detect_action


def detect_object(scenario: str, action: str):

    s = scenario.lower()

    if action in s:
        idx = s.find(action)
        obj = scenario[idx + len(action):].strip()

        if obj:
            return obj.title()

    return "Business Object"


def build_steps(scenario):

    action = detect_action(scenario)

    obj = detect_object(scenario, action)

    template = ACTIONS[action]

    steps = []

    for i, step in enumerate(template, start=1):

        steps.append({

            "step_number": i,

            "actor": "Business User",

            "navigation": obj,

            "action": step.replace("{object}", obj),

            "expected_result": "Step completed successfully."

        })

    return steps