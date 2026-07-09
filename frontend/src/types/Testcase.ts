export interface Testcase {

    testcase_id: string;

    module: string;

    requirement_id: string;

    scenario: string;

    precondition: string;

    steps: string[];

    expected_result: string;

    priority: string;

    type: string;

}