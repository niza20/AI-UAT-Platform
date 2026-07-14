from collections import defaultdict


class TraceabilityService:

    @staticmethod
    def build(requirements, testcases):

        mapping = defaultdict(list)

        for tc in testcases:

            mapping[tc["requirement_id"]].append(tc)

        matrix = []

        for req in requirements:

            linked = mapping.get(req["requirement_id"], [])

            matrix.append({

                "requirement_id": req["requirement_id"],

                "module": req.get("module", "General"),

                "requirement": req["requirement"],

                "coverage": "Covered" if linked else "Missing",

                "linked_testcases": [

                    tc["testcase_id"]

                    for tc in linked

                ],

                "testcase_count": len(linked)

            })

        return matrix