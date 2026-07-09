import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadPage() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("");

  // NEW
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProjects(false);
    }
  }

  async function openProject(projectId: string) {
    try {
      const res = await api.get(`/projects/${projectId}`);

      localStorage.setItem(
        "uat_result",
        JSON.stringify(res.data)
      );

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Unable to open project.");
    }
  }

  const uploadBRD = async () => {

    if (!file) {
      alert("Please select a BRD");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStage("Uploading BRD...");

    try {

      setTimeout(
        () => setStage("Parsing Document..."),
        500
      );

      setTimeout(
        () => setStage("Extracting Requirements..."),
        1200
      );

      setTimeout(
        () => setStage("Generating Questions..."),
        2200
      );

      setTimeout(
        () => setStage("Generating Test Cases..."),
        3400
      );

      setTimeout(
        () => setStage("Preparing Dashboard..."),
        4700
      );

      const response = await api.post(
        "/upload",
        formData
      );

      localStorage.setItem(
        "uat_result",
        JSON.stringify(response.data)
      );

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      alert("Upload failed.");

    } finally {

      setLoading(false);
      setStage("");

      // refresh project list
      loadProjects();

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center">

          <div className="text-6xl">
            🤖
          </div>

          <h1 className="text-5xl font-bold mt-3">
            AI UAT Platform
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Enterprise AI Powered Test Case Generator
          </p>

        </div>

        {/* Upload Box */}

        <div className="bg-white rounded-3xl shadow-xl mt-10 p-10">

          <div className="border-2 border-dashed border-blue-400 rounded-2xl bg-blue-50 p-10 text-center">

            <div className="text-6xl">
              📄
            </div>

            <h2 className="text-2xl font-bold mt-4">
              Upload Business Requirement Document
            </h2>

            <p className="text-gray-500 mt-2">
              PDF / DOC / DOCX
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="mt-8 block w-full border rounded-lg p-3 bg-white"
              onChange={(e) => {

                if (
                  e.target.files &&
                  e.target.files.length > 0
                ) {

                  setFile(e.target.files[0]);

                }

              }}
            />

            {file && (

              <div className="bg-green-50 rounded-xl mt-6 p-4">

                <div className="font-semibold text-green-700">

                  ✅ {file.name}

                </div>

                <div className="text-gray-500 text-sm">

                  Ready for AI Processing

                </div>

              </div>

            )}

            {loading && (

              <div className="mt-8">

                <div className="flex justify-between">

                  <span>{stage}</span>

                  <span>AI Working...</span>

                </div>

                <div className="bg-gray-200 h-3 rounded-full mt-3 overflow-hidden">

                  <div className="bg-blue-600 h-3 w-full animate-pulse"></div>

                </div>

              </div>

            )}

            <button
              onClick={uploadBRD}
              disabled={loading}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-4 text-lg font-bold"
            >
              {loading
                ? "AI Processing..."
                : "🚀 Generate AI Test Cases"}
            </button>

          </div>

        </div>

        {/* Recent Projects */}
        <div className="mt-10">

<div className="flex justify-between items-center mb-6">

  <h2 className="text-3xl font-bold">
    📂 Recent Projects
  </h2>

  <span className="text-gray-500">
    {projects.length} Project(s)
  </span>

</div>

{loadingProjects ? (

  <div className="bg-white rounded-2xl shadow p-10 text-center">

    <div className="text-5xl mb-4">
      ⏳
    </div>

    <h3 className="text-xl font-semibold">
      Loading Projects...
    </h3>

  </div>

) : projects.length === 0 ? (

  <div className="bg-white rounded-2xl shadow p-10 text-center">

    <div className="text-6xl mb-4">
      📄
    </div>

    <h3 className="text-2xl font-bold">
      No Projects Yet
    </h3>

    <p className="text-gray-500 mt-3">
      Upload your first BRD to start generating AI test cases.
    </p>

  </div>

) : (

  <div className="grid grid-cols-2 gap-6">

    {projects.map((project) => (

      <div
        key={project.project_id}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
      >

        <div className="flex justify-between items-start">

          <div>

            <div className="text-2xl font-bold text-blue-700">

              {project.project_id}

            </div>

            <div className="mt-2 text-lg font-semibold">

              {project.file_name}

            </div>

          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

            {project.status}

          </span>

        </div>

        <div className="mt-5 text-gray-500">

          Created

          <div className="font-medium text-gray-700 mt-1">

            {new Date(
              project.created_at
            ).toLocaleString()}

          </div>

        </div>

        <button

          onClick={() =>
            openProject(project.project_id)
          }

          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"

        >

          📂 Open Project

        </button>

      </div>

    ))}

  </div>

)}

</div>

</div>

</div>

);

}

export default UploadPage;