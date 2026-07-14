class RequirementQualityService:
    
    @staticmethod
    def analyze(requirements):

        report = []

        for req in requirements:

            score = 100

            issues = []

            text = req["requirement"]

            if len(text) < 40:

                score -= 20

                issues.append(

                    "Requirement is too short."

                )

            if "shall" not in text.lower():

                score -= 10

                issues.append(

                    "Requirement may not be measurable."

                )

            report.append({

                "requirement_id":

                    req["requirement_id"],

                "quality_score": score,

                "issues": issues

            })

        return report