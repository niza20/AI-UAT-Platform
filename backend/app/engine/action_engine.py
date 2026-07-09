import re

# Generic business actions
ACTIONS = {
    "create": [
        "Open {object}",
        "Click Create",
        "Enter {object} details",
        "Submit",
        "Verify {object} created"
    ],

    "update": [
        "Open {object}",
        "Search {object}",
        "Edit details",
        "Save",
        "Verify changes"
    ],

    "delete": [
        "Open {object}",
        "Search {object}",
        "Delete {object}",
        "Confirm deletion",
        "Verify deleted"
    ],

    "approve": [
        "Open {object}",
        "Review details",
        "Click Approve",
        "Confirm approval",
        "Verify Approved"
    ],

    "reject": [
        "Open {object}",
        "Review details",
        "Click Reject",
        "Enter rejection reason",
        "Verify Rejected"
    ],

    "submit": [
        "Open {object}",
        "Enter details",
        "Submit",
        "Verify Submitted"
    ],

    "upload": [
        "Open {object}",
        "Click Upload",
        "Select file",
        "Upload",
        "Verify uploaded"
    ],

    "search": [
        "Open {object}",
        "Search record",
        "Verify search results"
    ],

    "view": [
        "Open {object}",
        "View details",
        "Verify information"
    ]
}


def detect_action(scenario: str):

    scenario = scenario.lower()

    for action in ACTIONS.keys():

        if re.search(rf"\b{action}\b", scenario):
            return action

    return "view"