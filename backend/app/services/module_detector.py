MODULE_KEYWORDS = {
    "Supplier Management": [
        "supplier",
        "registration",
        "onboarding",
        "vendor"
    ],

    "P2O": [
        "purchase order",
        "po",
        "requisition",
        "buyer"
    ],

    "GRN": [
        "goods receipt",
        "grn",
        "receipt"
    ],

    "Invoice": [
        "invoice",
        "payment",
        "matching"
    ],

    "Sourcing": [
        "rfq",
        "rfx",
        "auction",
        "bid"
    ]
}


def detect_modules(text: str):

    detected = []

    lower_text = text.lower()

    for module, keywords in MODULE_KEYWORDS.items():

        for keyword in keywords:

            if keyword in lower_text:
                detected.append(module)
                break

    return list(set(detected))