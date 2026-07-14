import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Layout from "../components/Layout";
import UploadCard from "../components/UploadCard";
import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";
import RecentProjectCard from "../components/RecentProjectCard";

export default function UploadPage() {

    console.log("✅ UploadPage rendered");
    console.log("🔥 UploadPage rendered");

    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const [stage, setStage] = useState("");

    const [projects, setProjects] = useState<any[]>([]);

    const [loadingProjects, setLoadingProjects] = useState(true);

    useEffect(() => {
        console.log("✅ useEffect running");
        console.log("🔥 useEffect running");
        loadProjects();
    }, []);

    async function loadProjects() {

        console.log("✅ loadProjects called");
        console.log("🔥 loadProjects called");

        try {

            console.log("📡 Calling /projects...");

            const res = await api.get("/projects");

            console.log("📦 Response:", res.data);

            setProjects(res.data);

        } catch (err) {

            console.error("❌ Error:", err);

        } finally {

            console.log("🏁 Finished");

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

        }

        catch (err) {

            console.error(err);

            alert("Unable to open project.");

        }

    }

    async function uploadBRD() {

        if (!file) {

            alert("Please select a BRD");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        setLoading(true);

        setStage("Uploading BRD");

        try {

            setTimeout(() => setStage("Parsing Document"), 600);

            setTimeout(() => setStage("Extracting Requirements"), 1500);

            setTimeout(() => setStage("Generating Questions"), 2500);

            setTimeout(() => setStage("Generating Test Cases"), 3800);

            setTimeout(() => setStage("Preparing Dashboard"), 5200);

            const uploadResponse = await api.post(
                "/upload",
                formData
            );

            // Get project ID returned by upload
            const projectId = uploadResponse.data.project_id;

            // Fetch complete project data
            const projectResponse = await api.get(
                `/projects/${projectId}`
            );

            // Save complete workflow result
            localStorage.setItem(
                "uat_result",
                JSON.stringify(projectResponse.data)
            );

            // Open dashboard
            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            alert("Upload failed.");

        }

        finally {

            setLoading(false);

            setStage("");

            loadProjects();

        }

    }    
    return (

      <Layout
          title="AI UAT Platform"
          subtitle="Enterprise AI Powered User Acceptance Testing"
      >

          {/* Top Statistics */}

          <div className="grid grid-cols-4 gap-6 mb-8">

              <StatCard
                  title="Projects"
                  value={projects.length}
              />

              <StatCard
                  title="Requirements"
                  value="AI"
                  color="text-purple-600"
              />

              <StatCard
                  title="Test Cases"
                  value="Auto"
                  color="text-green-600"
              />

              <StatCard
                  title="Coverage"
                  value="100%"
                  color="text-orange-600"
              />

          </div>

          {/* Main Section */}

          <div className="grid grid-cols-3 gap-8">

              {/* Left Side */}

              <div className="col-span-2">

                  <UploadCard
                      file={file}
                      loading={loading}
                      stage={stage}
                      onSelect={setFile}
                      onUpload={uploadBRD}
                  />

              </div>

              {/* Right Side */}

              <div>

                  <ProgressCard
                      loading={loading}
                      stage={stage}
                  />

              </div>

          </div>

          {/* Recent Projects */}

          <div className="mt-12">

              <div className="flex justify-between items-center mb-6">

                  <div>

                      <h2 className="text-2xl font-bold">

                          Recent Projects

                      </h2>

                      <p className="text-slate-500">

                          Open previous AI UAT analyses

                      </p>

                  </div>

                  <span className="text-sm text-slate-500">

                      {projects.length} Project(s)

                  </span>

              </div>
              {loadingProjects ? (

<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

    <div className="text-5xl mb-4">
        ⏳
    </div>

    <h3 className="text-xl font-semibold">
        Loading Projects...
    </h3>

</div>

) : projects.length === 0 ? (

<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

    <div className="text-6xl mb-4">
        📂
    </div>

    <h3 className="text-2xl font-bold">

        No Projects Yet

    </h3>

    <p className="text-slate-500 mt-3">

        Upload your first BRD to start generating AI-powered UAT documentation.

    </p>

</div>

) : (

<div className="grid grid-cols-3 gap-6">

    {projects.map((project) => (

        <RecentProjectCard
            key={project.project_id}
            project={project}
            onOpen={openProject}
        />

    ))}

</div>

)}

</div>

</Layout>

);

}