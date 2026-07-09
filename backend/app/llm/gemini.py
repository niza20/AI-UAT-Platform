import os
import time
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

MODEL = "llama-3.1-8b-instant"


def ask_llm(prompt: str, retries: int = 3):

    for attempt in range(retries):

        try:

            response = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.2
            )

            content = response.choices[0].message.content

            print("\n================= RAW LLM OUTPUT =================")
            print(content)
            print("==================================================\n")

            return content

        except Exception as e:

            print(f"LLM ERROR (Attempt {attempt+1}/{retries})")
            print(e)

            if attempt < retries - 1:

                wait = 2 ** attempt
                print(f"Retrying in {wait} seconds...")
                time.sleep(wait)

            else:

                print("LLM failed after all retries.")
                return None