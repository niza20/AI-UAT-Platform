import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import AnalyticsCard from "../components/analyticscard";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ProjectsPage() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState<any[]>([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

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

            setLoading(false);

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

        } catch {

            alert("Unable to open project");

        }

    }

    const filtered = useMemo(() => {

        return projects.filter((p: any) =>
            p.project_id
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            p.file_name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [projects, search]);

    return (

        <Layout
            title="Projects Workspace"
            subtitle="Manage AI UAT Projects"
        >

            <div className="grid grid-cols-3 gap-6">

                <AnalyticsCard
                    title="Projects"
                    value={projects.length}
                />

                <AnalyticsCard
                    title="Completed"
                    value={projects.length}
                    color="text-green-600"
                />

                <AnalyticsCard
                    title="Storage"
                    value={`${projects.length} Files`}
                />

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 p-6">

                <input
                    placeholder="Search Project..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="border rounded-xl p-3 w-96"
                />

            </div>

            {loading ? (

                <div className="text-center py-16">

                    Loading...

                </div>

            ) : (

                <div className="grid grid-cols-3 gap-6 mt-8">

                    {filtered.map((project: any) => (

                        <div
                            key={project.project_id}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <h2 className="font-bold text-lg">

                                        {project.project_id}

                                    </h2>

                                    <p className="text-slate-500 mt-2">

                                        {project.file_name}

                                    </p>

                                </div>

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full h-fit">

                                    Completed

                                </span>

                            </div>

                            <div className="mt-6 text-sm text-slate-500">

                                Created

                            </div>

                            <div className="font-medium">

                                {new Date(
                                    project.created_at
                                ).toLocaleString()}

                            </div>

                            <button

                                onClick={() =>
                                    openProject(project.project_id)
                                }

                                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"

                            >

                                Open Project

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </Layout>

    );

}