import json

from app.llm.gemini import ask_llm
from app.prompts.clarification_prompt import SYSTEM_PROMPT


def generate_questions(requirements):

    if not requirements:
        return []

    prompt = f"""
{SYSTEM_PROMPT}

Requirements:

{json.dumps(requirements, indent=2)}
"""

    response = ask_llm(prompt)

    print("\n========== CLARIFICATION RESPONSE ==========")
    print(response)
    print("===========================================\n")

    if response is None:
        print("LLM returned None")
        return []

    response = (
        response.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        questions = json.loads(response)

        print(f"Questions Parsed: {len(questions)}")

        return questions

    except Exception as e:
        print("Clarification JSON Error:", e)
        print(response)
        return []