import { useState } from "react";

type Step = {
  step_number: number;
  actor: string;
  navigation: string;
  action: string;
  expected_result: string;
};

type Props = {
  testcase: any;
};

export default function TestcaseCard({ testcase }: Props) {
  const [open, setOpen] = useState(false);

  const priorityColor =
    testcase.priority === "High"
      ? "bg-red-100 text-red-700"
      : testcase.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* Header */}

      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer p-6 flex justify-between items-center hover:bg-slate-50"
      >
        <div>

          <div className="font-bold text-lg">

            {testcase.testcase_id}

          </div>

          <div className="text-slate-500 mt-1">

            {testcase.scenario}

          </div>

        </div>

        <div className="flex gap-3 items-center">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">

            {testcase.module}

          </span>

          <span className={`rounded-full px-3 py-1 ${priorityColor}`}>

            {testcase.priority}

          </span>

          <span className="text-2xl">

            {open ? "▲" : "▼"}

          </span>

        </div>

      </div>

      {open && (

        <div className="border-t p-6">

          <h3 className="font-semibold mb-4">

            Preconditions

          </h3>

          <ul className="list-disc ml-5 mb-6">

            {testcase.preconditions.map((p: string) => (

              <li key={p}>{p}</li>

            ))}

          </ul>

          <h3 className="font-semibold mb-4">

            Test Steps

          </h3>

          <div className="space-y-3">

            {testcase.steps.map((step: Step) => (

              <div
                key={step.step_number}
                className="rounded-xl bg-slate-50 p-4"
              >

                <div className="font-semibold">

                  Step {step.step_number}

                </div>

                <div className="text-slate-600 mt-2">

                  {step.action}

                </div>

                <div className="text-sm text-slate-500 mt-2">

                  Expected: {step.expected_result}

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}