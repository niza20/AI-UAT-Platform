import json

from app.llm.gemini import ask_llm
from app.prompts.clarification_prompt import SYSTEM_PROMPT


def generate_questions(modules, requirements):

    if not requirements:
        return []

    all_questions = []

    for module in modules:

        if isinstance(module, dict):
            module_name = module.get("module", "General")
        else:
            module_name = str(module)

        # If only one major module, use every requirement
        if len(modules) == 1:

            module_requirements = requirements

        else:

            keyword = module_name.split()[0].lower() if module_name.strip() else ""

            module_requirements = [
                r for r in requirements
                if keyword and keyword in r.get("module", "").lower()
            ]

        requirement_text = "\n".join(
            f"- {r.get('requirement', '')}"
            for r in module_requirements
        )

        prompt = f"""
{SYSTEM_PROMPT}

Business Module

{module_name}

Requirements

{requirement_text}

Generate EXACTLY 5 clarification questions.

Return ONLY JSON.
"""

        try:
            response = ask_llm(prompt)
        except Exception as e:
            print(e)
            continue

        if response is None:
            continue

        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:
            questions = json.loads(response)

            for q in questions:
                q["module"] = module_name

            all_questions.extend(questions)

        except Exception as e:
            print(e)

    # Remove duplicate questions
    unique_questions = []
    seen = set()

    for q in all_questions:

        question = q.get("question", "").strip().lower()

        if not question or question in seen:
            continue

        seen.add(question)
        unique_questions.append(q)

    # Decide maximum questions based on number of modules
    if len(modules) <= 3:
        max_questions = 5
    else:
        max_questions = 10

    return unique_questions[:max_questions]