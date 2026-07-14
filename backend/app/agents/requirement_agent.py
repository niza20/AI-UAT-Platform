import json
import uuid
from difflib import get_close_matches

from app.llm.gemini import ask_llm
from app.prompts.requirement_prompt import SYSTEM_PROMPT
from app.utils.text_chunker import chunk_text
from app.rag.embedding_service import create_embedding
from app.rag.chroma_service import collection


def extract_requirements_ai(text, modules, project_id=None):
    print("\n============================")
    print("Modules received by Requirement Agent:")
    print(modules)
    print("============================\n")

    print("\n========== REQUIREMENT EXTRACTION ==========\n")

    if project_id is None:
        project_id = f"proj_{uuid.uuid4().hex[:8]}"

    modules_list = modules or []

    modules_str = "\n".join(
        f"- {m}" for m in modules_list
    )

    all_requirements = []

    chunks = chunk_text(text)

    print(f"Created {len(chunks)} chunks")

    # ---------------------------------------
    # Store BRD chunks in Chroma
    # ---------------------------------------

    for i, chunk in enumerate(chunks):

        embedding = create_embedding(chunk)

        collection.add(
            ids=[f"{project_id}_{i}"],
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[{"project": project_id, "chunk": i}]
        )

    # ---------------------------------------
    # Extract Requirements
    # ---------------------------------------

    for i, chunk in enumerate(chunks):

        print(f"\n------ Processing Chunk {i+1}/{len(chunks)} ------")

        prompt = f"""
{SYSTEM_PROMPT}

==================================================
DETECTED BUSINESS MODULES
==================================================

{modules_str}

==================================================
IMPORTANT INSTRUCTIONS
==================================================

For every requirement:

1. The value of "module" MUST exactly match one of the detected business modules.

2. Copy the module name EXACTLY.

3. Never abbreviate module names.

4. Never shorten module names.

5. Never create new module names.

6. Never return:

"P"
"SIM"
"Sourcing Management"
"Strategic Sourcing"
"Operational Sourcing"

7. The module value must be copied exactly as shown.

Example

Detected Business Modules

- Supplier Information Management (SIM)
- Sourcing
- Procurement

Correct

{{
    "module":"Supplier Information Management (SIM)"
}}

{{
    "module":"Sourcing"
}}

{{
    "module":"Procurement"
}}

Wrong

{{
    "module":"SIM"
}}

{{
    "module":"P"
}}

{{
    "module":"Strategic Sourcing"
}}

Never return:

- Supplier Registration
- Supplier Approval
- Supplier Onboarding
- Supplier Qualification
- Supplier Profile
- Strategic Sourcing
- Operational Sourcing
- Sourcing Management
- Approval Workflow
- Integrations

The value of "module" MUST be one of the detected
business modules above.

Return ONLY JSON.

Business Requirement Document

{chunk}
"""

        response = ask_llm(prompt)
        print("\n========== REQUIREMENT RAW ==========")
        print(response)
        print("=====================================\n")

        if response is None:
            continue

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
            print("JSON Error:", e)
            print(response)

    # ---------------------------------------
    # Remove Duplicate Requirements
    # ---------------------------------------

    seen = set()
    unique = []

    for req in all_requirements:

        if not isinstance(req, dict):
            continue

        requirement = req.get("requirement", "").strip()

        if requirement not in seen:
            seen.add(requirement)
            unique.append(req)

    # ---------------------------------------
    # Standardize IDs & Normalize Modules
    # ---------------------------------------

    for i, req in enumerate(unique, start=1):

        req["requirement_id"] = f"REQ-{i:03}"

        module = req.get("module", "").strip()

        # If LLM didn't return module
        if not module:
            req["module"] = modules_list[0] if modules_list else "Unknown"
            continue

        # Exact match
        if module in modules_list:
            req["module"] = module
            continue

        # Case-insensitive match
        found = next(
            (m for m in modules_list if m.lower() == module.lower()),
            None
        )

        if found:
            req["module"] = found
            continue

        # Fuzzy match
        match = get_close_matches( 
            module,
            modules_list,
            n=1,
            cutoff=0.20
        )

        if match:
            req["module"] = match[0]
        else:
            print(f"\nUnknown module returned by LLM: {module}")
            print(f"Using default module: {modules_list[0]}\n")
            req["module"] = modules_list[0] if modules_list else "Unknown"

    print(f"Total unique requirements: {len(unique)}")

    return unique