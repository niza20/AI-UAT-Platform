import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function DashboardPage() {
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("uat_result") || "{}");

  const requirements = data.requirements || [];
  const questions = data.questions || [];
  const testcases = data.testcases || [];
  const modules = data.modules || [];

  const high = testcases.filter((t: any) => t.priority === "High").length;
  const medium = testcases.filter((t: any) => t.priority === "Medium").length;
  const low = testcases.filter((t: any) => t.priority === "Low").length;

  const coverage =
    requirements.length > 0
      ? Math.min(100, Math.round((testcases.length / requirements.length) * 100))
      : 0;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow">
          <div className="max-w-7xl mx-auto px-10 py-8">
            <h1 className="text-4xl font-bold">🤖 AI UAT Platform</h1>
            <p className="mt-2 text-blue-100">
              Enterprise AI Powered UAT Test Case Generator
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-10">
          {/* Statistics */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Requirements"
              value={requirements.length}
              color="text-blue-600"
            />

            <StatCard
              title="Clarifications"
              value={questions.length}
              color="text-purple-600"
            />

            <StatCard
              title="Modules"
              value={modules.length}
              color="text-green-600"
            />

            <StatCard
              title="Test Cases"
              value={testcases.length}
              color="text-red-600"
            />
          </div>

          {/* Main Section */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {/* Modules */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-5">📦 Detected Modules</h2>

              <div className="flex flex-wrap gap-3">
                {modules.map((m: string) => (
                  <span
                    key={m}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-5">
                🔥 Test Case Priority
              </h2>

              <PriorityRow title="High" value={high} color="bg-red-500" />

              <PriorityRow
                title="Medium"
                value={medium}
                color="bg-yellow-500"
              />

              <PriorityRow title="Low" value={low} color="bg-green-500" />
            </div>

            {/* Coverage */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-5">📈 Coverage</h2>

              <div className="text-6xl font-bold text-green-600">
                {coverage}%
              </div>

              <p className="text-gray-500 mt-3">AI Generated Coverage</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow mt-8 p-8">
            <h2 className="text-2xl font-bold mb-6">🚀 Workflow Summary</h2>

            <div className="space-y-4">
              <Activity text="BRD Uploaded Successfully" />

              <Activity text={`${requirements.length} Requirements Extracted`} />

              <Activity
                text={`${questions.length} Clarification Questions Generated`}
              />

              <Activity text={`${testcases.length} Test Cases Generated`} />

              <Activity text="Excel Ready for Export" />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-5 mt-8">
            <button
              onClick={() => navigate("/requirements")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 text-lg font-semibold"
            >
              📋 Requirements
            </button>

            <button
              onClick={() => navigate("/testcases")}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 text-lg font-semibold"
            >
              🧪 Test Cases
            </button>

            <button
              onClick={() =>
                window.open("http://127.0.0.1:8001/export-excel", "_blank")
              }
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 text-lg font-semibold"
            >
              📊 Export Excel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="text-gray-500">{title}</div>

      <div className={`text-5xl font-bold mt-4 ${color}`}>{value}</div>
    </div>
  );
}

function PriorityRow({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span>{title}</span>

        <span>{value}</span>
      </div>

      <div className="h-3 bg-gray-200 rounded-full">
        <div
          className={`${color} h-3 rounded-full`}
          style={{
            width: `${Math.min(value * 10, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

function Activity({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-green-500" />

      <span>{text}</span>
    </div>
  );
}

export default DashboardPage;