import json

from app.llm.gemini import ask_llm
from app.prompts.scenario_prompt import SYSTEM_PROMPT


def generate_scenarios(requirements):

    scenarios = []

    for req in requirements:

        prompt = f"""
{SYSTEM_PROMPT}

Requirement

{json.dumps(req, indent=2)}
"""

        response = ask_llm(prompt)

        if response is None:
            continue

        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:

            data = json.loads(response)

            if isinstance(data, list):

                for sc in data:

                    sc["requirement_id"] = req["id"]
                    sc["module"] = req["module"]

                scenarios.extend(data)

        except Exception as e:

            print("Scenario JSON Error:", e)

    print(f"Generated {len(scenarios)} scenarios")

    return scenarios