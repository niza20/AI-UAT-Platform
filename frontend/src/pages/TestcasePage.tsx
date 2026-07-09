import React, { useMemo, useState } from "react";

function TestcasePage() {
  const data = JSON.parse(localStorage.getItem("uat_result") || "{}");

  const testcases = data.testcases || [];

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState("");

  const exportExcel = () => {
    window.open("http://127.0.0.1:8001/export-excel", "_blank");
  };

  const filtered = useMemo(() => {
    return testcases.filter((tc: any) =>
      (
        tc.scenario +
        tc.module +
        tc.testcase_id +
        tc.requirement_id
      )
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, testcases]);

  const total = testcases.length;
  const high = testcases.filter((t: any) => t.priority === "High").length;
  const medium = testcases.filter((t: any) => t.priority === "Medium").length;
  const low = testcases.filter((t: any) => t.priority === "Low").length;

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Generated Test Cases</h1>
            <p className="text-gray-500 mt-2">
              AI Generated Functional Test Cases
            </p>
          </div>

          <button
            onClick={exportExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            📊 Export Excel
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-8">
          <Card title="Total" value={total} />
          <Card title="High" value={high} />
          <Card title="Medium" value={medium} />
          <Card title="Low" value={low} />
        </div>

        <input
          className="w-full p-3 rounded-lg border mb-8"
          placeholder="Search Test Cases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="text-left">Scenario</th>
                <th className="text-left">Requirement</th>
                <th className="text-left">Priority</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((tc: any) => (
                <React.Fragment key={tc.testcase_id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">{tc.testcase_id}</td>
                    <td>{tc.scenario}</td>
                    <td>{tc.requirement_id}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          tc.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : tc.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {tc.priority}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() =>
                          setExpanded(
                            expanded === tc.testcase_id ? "" : tc.testcase_id
                          )
                        }
                      >
                        {expanded === tc.testcase_id ? "Hide" : "Details"}
                      </button>
                    </td>
                  </tr>

                  {expanded === tc.testcase_id && (
                    <tr>
                      <td colSpan={5} className="bg-slate-50 p-6">
                        <div className="space-y-5">
                          <div>
                            <b>Module</b>
                            <p>{tc.module}</p>
                          </div>

                          <div>
                            <b>Preconditions</b>
                            <ul className="list-disc ml-6">
                              {tc.preconditions?.map(
                                (p: string, i: number) => (
                                  <li key={i}>{p}</li>
                                )
                              )}
                            </ul>
                          </div>

                          <div>
                            <b>Test Steps</b>
                            <table className="w-full mt-3 border">
                              <thead className="bg-gray-200">
                                <tr>
                                  <th className="border p-2">#</th>
                                  <th className="border p-2">Navigation</th>
                                  <th className="border p-2">Action</th>
                                  <th className="border p-2">Actor</th>
                                  <th className="border p-2">
                                    Expected Result
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {tc.steps?.map((step: any) => (
                                  <tr key={step.step_number}>
                                    <td className="border p-2">
                                      {step.step_number}
                                    </td>
                                    <td className="border p-2">
                                      {step.navigation}
                                    </td>
                                    <td className="border p-2">
                                      {step.action}
                                    </td>
                                    <td className="border p-2">
                                      {step.actor}
                                    </td>
                                    <td className="border p-2">
                                      {step.expected_result}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div>
                            <b>Overall Expected Result</b>
                            <p>{tc.overall_expected_result}</p>
                          </div>

                          <div>
                            <b>Type</b>
                            <p>{tc.type}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="text-gray-500">{title}</div>
      <div className="text-3xl font-bold text-blue-600 mt-2">{value}</div>
    </div>
  );
}

export default TestcasePage;