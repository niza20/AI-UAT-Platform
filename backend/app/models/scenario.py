from pydantic import BaseModel


class Scenario(BaseModel):
    scenario_id: str
    requirement_id: str
    module: str
    scenario: str
    priority: str
    type: str