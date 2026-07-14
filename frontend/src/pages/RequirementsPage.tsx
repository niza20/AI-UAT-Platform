import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import AnalyticsCard from "../components/analyticscard";
import RequirementCard from "../components/RequirementCard";

export default function RequirementsPage() {
    const navigate = useNavigate();

    const data = JSON.parse(
        localStorage.getItem("uat_result") || "{}"
    );

    const requirements = data.requirements || [];

    const traceability = data.traceability || [];

    const analytics = data.analytics || {};
    const summary = analytics.summary || {};
    console.log("Analytics:", analytics);
    console.log("Summary:", summary);
    console.log("Coverage:", summary.coverage);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    const filtered = useMemo(() => {

        return requirements.filter((req: any) => {

            const trace = traceability.find(
                (t: any) =>
                    t.requirement_id === req.requirement_id
            );

            const matchesSearch =
                req.requirement
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                req.requirement_id
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "All"
                    ? true
                    : trace?.coverage === filter;

            return matchesSearch && matchesFilter;

        });

    }, [
        requirements,
        traceability,
        search,
        filter,
    ]);

    return (

        <Layout
            title="Requirements Workspace"
            subtitle="AI Requirement Analysis"
        >

            <div className="grid grid-cols-4 gap-6">

                <AnalyticsCard
                    title="Requirements"
                    value={requirements.length}
                />

                <AnalyticsCard
                    title="Covered"
                    value={summary.covered || 0}
                    color="text-green-600"
                />

                <AnalyticsCard
                    title="Missing"
                    value={summary.missing || 0}
                    color="text-red-600"
                />

               <AnalyticsCard
    title="Coverage"
    value={`${summary.coverage || 0}%`}
    color="text-blue-600"
/>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 p-6">

                <div className="flex justify-between items-center">

                    <input
                        placeholder="Search Requirement..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="border rounded-xl p-3 w-96"
                    />

                    <div className="flex gap-3">

                        {[
                            "All",
                            "Covered",
                            "Missing",
                        ].map((f) => (

                            <button
                                key={f}
                                onClick={() =>
                                    setFilter(f)
                                }
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

            <div className="mt-8 space-y-5">

                {filtered.map((req: any) => (

<div
key={req.requirement_id}
onClick={() =>
    navigate(`/requirement/${req.requirement_id}`)
}
className="cursor-pointer hover:scale-[1.01] transition-all duration-200"
>

<RequirementCard
    requirement={req}
    traceability={traceability.find(
        (t: any) =>
            t.requirement_id ===
            req.requirement_id
    )}
/>

</div>

                ))}

            </div>

        </Layout>

    );

}