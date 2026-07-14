import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import AnalyticsCard from "../components/AnalyticsCard";

export default function TraceabilityPage() {
  const data = JSON.parse(localStorage.getItem("uat_result") || "{}");

  const traceability = data.traceability || [];
  const analytics = data.analytics || {};

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return traceability.filter((row: any) => {
      const matchesSearch =
        row.requirement_id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        row.requirement
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        row.module
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : row.coverage === filter;

      return matchesSearch && matchesFilter;
    });
  }, [traceability, search, filter]);

  return (
    <Layout
      title="Requirement Traceability Matrix"
      subtitle="Requirement ↔ Test Case Mapping"
    >
      <div className="grid grid-cols-4 gap-6">

        <AnalyticsCard
          title="Requirements"
          value={traceability.length}
        />

        <AnalyticsCard
          title="Covered"
          value={analytics.covered_requirements || 0}
          color="text-green-600"
        />

        <AnalyticsCard
          title="Missing"
          value={analytics.missing_requirements || 0}
          color="text-red-600"
        />

        <AnalyticsCard
          title="Coverage"
          value={`${analytics.coverage || 0}%`}
        />

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 p-6">

        <div className="flex justify-between items-center">

          <input
            placeholder="Search Requirement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl p-3 w-96"
          />

          <div className="flex gap-3">

            {["All", "Covered", "Missing"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Requirement</th>
              <th className="text-left p-4">Module</th>
              <th className="text-left p-4">Coverage</th>
              <th className="text-left p-4">Linked Test Cases</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((row: any) => (

              <tr
                key={row.requirement_id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">

                  <div className="font-semibold">

                    {row.requirement_id}

                  </div>

                  <div className="text-sm text-slate-500 mt-1">

                    {row.requirement}

                  </div>

                </td>

                <td className="p-4">

                  {row.module}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      row.coverage === "Covered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.coverage}
                  </span>

                </td>

                <td className="p-4">

                  {row.linked_testcases.length ? (

                    <div className="flex flex-wrap gap-2">

                      {row.linked_testcases.map((tc: string) => (

                        <span
                          key={tc}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm"
                        >
                          {tc}
                        </span>

                      ))}

                    </div>

                  ) : (

                    <span className="text-red-600 font-medium">

                      No Test Cases

                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}