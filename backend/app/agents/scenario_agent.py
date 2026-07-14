import json
import re

from app.llm.gemini import ask_llm
from app.prompts.scenario_prompt import SYSTEM_PROMPT


def generate_scenarios(requirements, questions):

    scenarios = []

    # Group questions by module
    question_map = {}

    for q in questions:

        module = q.get("module", "General")

        question_map.setdefault(module, []).append(
            q["question"]
        )

    for req in requirements:

        module_questions = []

        req_module = req.get("module", "").lower()

        for detected_module, qs in question_map.items():

            keyword = (
                detected_module.split()[0].lower()
                if detected_module else ""
            )

            if keyword and keyword in req_module:

                module_questions.extend(qs)

        clarifications = "\n".join(
            f"- {q}" for q in module_questions
        )

        prompt = f"""
{SYSTEM_PROMPT}

Requirement

{json.dumps(req, indent=2)}

Clarification Questions

{clarifications}

Generate comprehensive business test scenarios.

Include:

- Positive
- Negative
- Validation
- Boundary
- Exception
- Permission

Return ONLY a JSON array.

Example:

[
  {{
    "scenario_id":"SC-001",
    "scenario":"...",
    "priority":"High",
    "type":"Positive"
  }}
]
"""

        response = ask_llm(prompt)

        if response is None:
            continue

        # Remove markdown
        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        # Extract JSON array only
        match = re.search(r"\[.*\]", response, re.DOTALL)

        if not match:

            print("\nNo JSON array found.")
            print(response)
            continue

        json_text = match.group(0)

        try:

            data = json.loads(json_text)

            if not isinstance(data, list):
                continue

            # Maximum 5 scenarios per requirement
            data = data[:5]

            for i, sc in enumerate(data, start=1):

                sc["scenario_id"] = f"SC-{len(scenarios)+1:03}"

                sc["requirement_id"] = req["requirement_id"]

                sc["module"] = req["module"]

            scenarios.extend(data)

        except Exception as e:

            print("\n========== Scenario JSON Error ==========")
            print(e)
            print("\nRAW RESPONSE\n")
            print(response)
            print("\n=========================================\n")

    print(f"\nGenerated {len(scenarios)} scenarios")

    return scenarios