from typing import List

CHUNK_SIZE = 5000

def chunk_text(text: str) -> List[str]:

    chunks = []

    for i in range(0, len(text), CHUNK_SIZE):
        chunks.append(text[i:i + CHUNK_SIZE])

    print(f"Chunks created: {len(chunks)}")

    return chunks