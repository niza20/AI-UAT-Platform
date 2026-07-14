import re

# Keyword weights
MODULE_KEYWORDS = {

    "Supplier Information Management (SIM)": {
        "supplier onboarding": 5,
        "supplier registration": 5,
        "supplier qualification": 4,
        "supplier approval": 4,
        "supplier profile": 4,
        "supplier information": 4,
        "supplier master": 4,
        "supplier portal": 4,
        "coupa supplier portal": 5,
        "csp": 5,
        "vendor onboarding": 5,
        "vendor registration": 5,
        "vendor": 1,
        "supplier": 1,
        "due diligence": 4,
    },

    "Sourcing": {
        "rfi": 5,
        "rfq": 5,
        "rfp": 5,
        "reverse auction": 5,
        "auction": 4,
        "competitive bidding": 5,
        "supplier evaluation": 4,
        "bid": 2,
        "bidding": 2,
        "sourcing event": 5,
        "event": 1,
    },

    "Contract Management": {
        "contract": 3,
        "contract authoring": 5,
        "contract renewal": 5,
        "agreement": 3,
        "clause": 3,
        "contract repository": 4,
        "milestone": 2,
    },

    "Risk Aware": {
        "supplier risk": 5,
        "risk aware": 5,
        "risk score": 4,
        "third party risk": 5,
        "risk assessment": 4,
    },

    "Procurement": {
        "purchase requisition": 5,
        "purchase request": 5,
        "purchase order": 5,
        "guided buying": 5,
        "shopping cart": 4,
        "catalog": 3,
        "procurement": 3,
        "buyer": 1,
    },

    "Invoicing": {
        "invoice": 3,
        "invoice approval": 5,
        "invoice matching": 5,
        "credit memo": 4,
        "3-way match": 5,
        "three way match": 5,
    },

    "Receiving": {
        "goods receipt": 5,
        "receiving": 3,
        "receipt": 2,
        "grn": 4,
    },

    "Payments (Coupa Pay)": {
        "payment": 3,
        "coupa pay": 5,
        "virtual card": 5,
        "ach": 4,
        "transfermate": 5,
    },

    "Expenses": {
        "expense": 3,
        "expense report": 5,
        "employee expense": 5,
        "travel expense": 4,
    },

    "Inventory": {
        "inventory": 4,
        "warehouse": 3,
        "stock": 2,
        "on hand": 3,
    },

    "Spend Analytics": {
        "spend analytics": 5,
        "spend analysis": 5,
        "spend visibility": 4,
    },

    "Community AI": {
        "community ai": 5,
        "benchmark": 3,
        "benchmarking": 3,
    },

    "Savings Management": {
        "cost saving": 5,
        "savings": 3,
        "cost avoidance": 5,
        "negotiated savings": 5,
    },

    "Contingent Workforce": {
        "contract worker": 5,
        "temporary worker": 5,
        "contractor": 4,
        "staffing agency": 5,
    },

    "ESG & Compliance": {
        "esg": 5,
        "environmental": 3,
        "social": 3,
        "governance": 3,
        "compliance": 2,
        "regulatory": 2,
    },

    "Fraud Detection": {
        "fraud": 5,
        "duplicate invoice": 5,
        "fraud detection": 5,
    }

}


def detect_modules(text: str):
    print("=" * 60)
    print("USING KEYWORD MODULE DETECTOR")
    print("=" * 60)

    print("\n========== MODULE DETECTION ==========\n")

    text = text.lower()

    scores = {}

    for module, keywords in MODULE_KEYWORDS.items():

        score = 0

        for keyword, weight in keywords.items():

            occurrences = len(
                re.findall(r"\b" + re.escape(keyword.lower()) + r"\b", text)
            )

            score += occurrences * weight

        scores[module] = score

    # Keep only modules with meaningful evidence
    detected = [
        module
        for module, score in scores.items()
        if score >= 8
    ]

    # Sort by strongest evidence
    detected.sort(
        key=lambda m: scores[m],
        reverse=True
    )

    print("\nModule Scores")
    print("----------------------------")

    for module, score in sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True
    ):

        if score > 0:
            print(f"{module:<40} {score}")

    print("\nDetected Modules")
    print(detected)

    return detected