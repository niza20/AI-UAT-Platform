import json

from app.llm.gemini import ask_llm
from app.prompts.testcase_prompt import SYSTEM_PROMPT


def generate_testcases(requirements):

    all_testcases = []

    print(f"\nGenerating test cases for {len(requirements)} requirements\n")

    for index, req in enumerate(requirements):

        print(f"\nRequirement {index+1}")

        print(json.dumps(req, indent=2))

        prompt = f"""
{SYSTEM_PROMPT}

Requirement:

{json.dumps(req, indent=2)}
"""

        response = ask_llm(prompt)

        if response is None:

            print("LLM returned None")

            continue

        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        print("\n========== CLEAN RESPONSE ==========\n")
        print(response)
        print("\n====================================\n")

        if not response.startswith("["):

            print("Not valid JSON.")

            continue

        try:

            testcases = json.loads(response)

            if isinstance(testcases, list):

                all_testcases.extend(testcases)

                print(f"Added {len(testcases)} testcase(s)")

        except Exception as e:

            print("JSON ERROR")

            print(e)

            print(response)

    print(f"\nTotal Test Cases Generated: {len(all_testcases)}\n")

    return all_testcases