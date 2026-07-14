from fastapi import APIRouter
from pydantic import BaseModel

from app.llm.gemini import ask_llm
from app.rag.retrieval_service import search

router = APIRouter()


class CopilotRequest(BaseModel):
    project_id: str
    requirement: str
    question: str


@router.post("/copilot")
def copilot(req: CopilotRequest):

    # Retrieve relevant BRD chunks
    context = search(
    req.project_id,
    req.question
)

    if not context or context.strip() == "":

        return {
        "answer": "I couldn't find any relevant information in the uploaded BRD."
    }

    prompt = f"""
You are a Senior QA Engineer.

You are a Senior QA Engineer.

Answer ONLY using the BRD context.

Do not use your own knowledge.

If the answer cannot be found in the BRD context,
respond exactly:

"The uploaded BRD does not contain this information."

Do not guess.
Do not assume.
Do not fabricate.

==========================
BRD CONTEXT
==========================

{context}

==========================
CURRENT REQUIREMENT
==========================

{req.requirement}

==========================
USER QUESTION
==========================

{req.question}

Instructions

1. Explain clearly.
2. Mention business rules.
3. Mention QA validation.
4. Mention edge cases.
5. Mention risks.
6. If the answer is NOT present in the BRD, say:

"The uploaded BRD does not contain this information."

Keep the answer concise.
"""

    answer = ask_llm(prompt)

    return {
    "answer": answer,
    "sources": [
        "Chunk 4",
        "Chunk 7"
    ]
}