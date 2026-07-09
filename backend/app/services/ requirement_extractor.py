import re

KEYWORDS = [
    "shall",
    "must",
    "should",
    "required",
    "mandatory",
    "cannot",
    "only if",
    "validation",
    "system will",
    "system shall"
]


def extract_requirements(text: str):

    requirements = []

    sentences = re.split(r'(?<=[.!?])\s+', text)

    req_no = 1

    for sentence in sentences:

        s = sentence.strip()

        if len(s) < 20:
            continue

        lower = s.lower()

        if any(k in lower for k in KEYWORDS):

            requirements.append({
                "id": f"REQ-{req_no:03}",
                "requirement": s,
                "type": classify_requirement(lower)
            })

            req_no += 1

    return requirements


def classify_requirement(text):

    if "must" in text or "required" in text:
        return "Business Rule"

    if "validation" in text or "cannot" in text:
        return "Validation"

    if "email" in text or "notification" in text:
        return "Notification"

    if "approval" in text or "workflow" in text:
        return "Workflow"

    return "Functional"