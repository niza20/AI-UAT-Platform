from pydantic import BaseModel
from typing import List


class Step(BaseModel):
    step_number: int
    actor: str
    navigation: str
    action: str
    expected_result: str


class TestCase(BaseModel):
    testcase_id: str
    requirement_id: str
    module: str
    scenario: str
    priority: str
    type: str
    preconditions: List[str]
    steps: List[Step]
    overall_expected_result: str