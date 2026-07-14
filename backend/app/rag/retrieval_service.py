from app.rag.embedding_service import create_embedding
from app.rag.chroma_service import collection


def search(
    project_id: str,
    question: str,
    top_k: int = 5
):

    embedding = create_embedding(question)

    result = collection.query(
        query_embeddings=[embedding],
        n_results=top_k,
        where={
            "project": project_id
        }
    )

    documents = result.get("documents", [[]])[0]

    return "\n\n".join(documents)