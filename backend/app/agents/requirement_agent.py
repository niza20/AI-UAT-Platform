import json

from app.llm.gemini import ask_llm
from app.prompts.requirement_prompt import SYSTEM_PROMPT
from app.utils.text_chunker import chunk_text


def extract_requirements_ai(brd_text: str):

    print("Starting requirement extraction...")

    all_requirements = []

    chunks = chunk_text(brd_text)
    # DEBUG: only process first 20 chunks
    chunks = chunks[:20]

    print(f"Processing {len(chunks)} chunks")

# DEBUG - process only first 10 chunks
    chunks = chunks[:10]

    print(f"Processing only {len(chunks)} chunks")

    print(f"Created {len(chunks)} chunks")

    for i, chunk in enumerate(chunks):

        print(f"\n------ Chunk {i+1}/{len(chunks)} ------")
        print(f"Chunk size: {len(chunk)} characters")

        prompt = f"""
{SYSTEM_PROMPT}

Business Requirement Document:

{chunk}
"""

        print("Calling LLM...")
        response = ask_llm(prompt)

        if response is None:
            print(f"Chunk {i+1} failed")
            continue

        print("LLM responded")

        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:
            reqs = json.loads(response)

            if isinstance(reqs, list):
                print(f"Parsed {len(reqs)} requirements")
                all_requirements.extend(reqs)

        except Exception as e:
            print(f"Chunk {i+1} JSON error:", e)

    # Remove duplicate requirements
    seen = set()
    unique = []

    for req in all_requirements:

        if not isinstance(req, dict):
            continue

        requirement = req.get("requirement", "").strip()

        if requirement and requirement not in seen:
            seen.add(requirement)
            unique.append(req)

    print(f"Total unique requirements: {len(unique)}")

    return unique