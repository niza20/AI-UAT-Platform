from app.llm.gemini import ask_llm
from app.rag.retriever import retrieve_context


def ask_copilot(question):

    context = retrieve_context(question)

    prompt = f"""
You are an Enterprise QA Assistant.

Answer ONLY using the context below.

If the answer is not present in the context, say:

"I couldn't find this information in the uploaded BRD."

Context

{context}

Question

{question}
"""

    return ask_llm(prompt)