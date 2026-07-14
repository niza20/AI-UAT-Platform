import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import InsightCard from "../components/dashboard/InsightCard";
import DetectedModules from "../components/dashboard/DetectedModules";
import RecentActivity from "../components/dashboard/RecentActivity";
import ProjectHealth from "../components/ProjectHealth";
import AIRecommendation from "../components/AIRecommendation";
import RiskRequirements from "../components/RiskRequirements";
import api from "../services/api";

export default function DashboardPage() {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const projects = await api.get("/projects");

            if (projects.data.length === 0) {
                const saved = localStorage.getItem("uat_result");
                if (saved) {
                    setData(JSON.parse(saved));
                }
                return;
            }

            const latest = [...projects.data]
                .reverse()
                .find(
                    (project: any) =>
                        project.versions &&
                        project.versions.length > 0
                );

            if (!latest) {
                console.log("No processed projects found");
                return;
            }

            const res = await api.get(`/projects/${latest.project_id}`);
            console.log("Dashboard Project:", res.data);

            localStorage.setItem("uat_result", JSON.stringify(res.data));
            console.log("Projects:", projects.data);
            console.log("Latest Project Response:", res.data);

            setData(res.data);
            console.log("API Response:", res.data);
            console.log("Modules:", res.data.modules);

        } catch (err) {
            console.error(err);
        }
    }

    if (!data) {
        return (
            <Layout title="AI UAT Dashboard" subtitle="Loading...">
                <div className="text-center py-20">
                    Loading Dashboard...
                </div>
            </Layout>
        );
    }

    const analytics = data.analytics || {};
    console.log(data);

    const requirements = data.requirements || [];
    const questions = data.questions || [];
    const testcases = data.testcases || [];
    const modules = data.modules || [];
    console.log("Modules in state:", modules);

    const moduleData = modules.map((module: string) => ({
        module,
        count: requirements.filter((r: any) => r.module === module).length
    }));

    const traceability = data.traceability || [];
    const quality = data.quality || [];
    console.log("Modules:", modules);

    return (
        <Layout
            title="AI UAT Dashboard"
            subtitle="Enterprise AI Powered Test Intelligence"
        >
            <div className="space-y-8">

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-6">
                    <StatCard
                        title="Requirements"
                        value={requirements.length}
                        subtitle="Business Requirements"
                    />
                    <StatCard
                        title="Questions"
                        value={questions.length}
                        subtitle="AI Clarifications"
                        color="text-purple-600"
                    />
                    {/* FIX: was Object.keys(analytics.modules || {}).length
                            backend returns `modules` array, not analytics.modules */}
                    <StatCard
                        title="Modules"
                        value={modules.length}
                        subtitle="Detected Modules"
                        color="text-green-600"
                    />
                    <StatCard
                        title="Test Cases"
                        value={testcases.length}
                        subtitle="Generated Test Cases"
                        color="text-red-600"
                    />
                </div>

                {/* AI Insights */}
                <div className="mt-8">
                    <InsightCard analytics={analytics} />
                </div>

                {/* Module Coverage & Recent Activity */}
                {/* FIX: removed duplicate <DetectedModules> that was rendering
                         a second card in the standalone rounded-2xl div below */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                    <DetectedModules modules={modules} />
                    <RecentActivity
                        requirements={requirements}
                        questions={questions}
                        testcases={testcases}
                    />
                </div>

                {/* Workflow Summary */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                    <ProjectHealth
                        analytics={analytics}
                        quality={quality}
                    />
                    <RiskRequirements requirements={requirements} />
                    <AIRecommendation analytics={analytics} />
                </div>

            </div>
        </Layout>
    );
}