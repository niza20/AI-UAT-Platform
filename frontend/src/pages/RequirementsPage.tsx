import { useNavigate } from "react-router-dom";

function RequirementsPage() {
  const navigate = useNavigate();

  const data = JSON.parse(
    localStorage.getItem("uat_result") || "{}"
  );

  const requirements = data.requirements || [];

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* Page Title */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Extracted Requirements
            </h1>

            <p className="text-gray-500 mt-2">
              AI extracted business requirements from uploaded BRD
            </p>

          </div>

          <div className="bg-white shadow rounded-xl px-6 py-4">

            <div className="text-3xl font-bold text-blue-600">
              {requirements.length}
            </div>

            <div className="text-gray-500">
              Requirements
            </div>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="text-left p-4">ID</th>

                <th className="text-left p-4">Module</th>

                <th className="text-left p-4">Priority</th>

                <th className="text-left p-4">Requirement</th>

              </tr>

            </thead>

            <tbody>

              {requirements.map((req: any) => (

                <tr
                  key={req.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold">
                    {req.id}
                  </td>

                  <td className="p-4">
                    {req.module}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        req.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : req.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {req.priority}
                    </span>

                  </td>

                  <td className="p-4">
                    {req.requirement}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Next Button */}

        <div className="flex justify-end mt-8">

          <button
            onClick={() => navigate("/clarifications")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow"
          >
            Next →
          </button>

        </div>

      </div>

    </div>
  );
}

export default RequirementsPage;