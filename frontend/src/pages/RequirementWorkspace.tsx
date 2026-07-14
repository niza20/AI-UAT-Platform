import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

import AIExplanation from "../components/requirement/AIExplanation";
import RequirementMetrics from "../components/requirement/RequirementMetrics";
import AICopilot from "../components/requirement/AICopilot";
import ImpactAnalysis from "../components/requirement/ImpactAnalysis";

export default function RequirementWorkspace() {

    const { id } = useParams();

    const data = JSON.parse(
        localStorage.getItem("uat_result") || "{}"
    );

    const requirement = (data.requirements || []).find(
        (r: any) => r.requirement_id === id
    );

    const traceability = (data.traceability || []).find(
        (t: any) => t.requirement_id === id
    );

    const quality = (data.quality || []).find(
        (q: any) => q.requirement_id === id
    );

    const scenarios = (data.scenarios || []).filter(
        (s: any) => s.requirement_id === id
    );

    const testcases = (data.testcases || []).filter(
        (t: any) => t.requirement_id === id
    );

    const questions = (data.questions || []).filter(

        (q:any)=>
    
            q.module===requirement?.module
    
    );

    return (

        <Layout
            title={id || "Requirement"}
            subtitle="Requirement Workspace"
        >

            <div className="grid grid-cols-3 gap-6">

                {/* LEFT */}

                <div className="col-span-2 space-y-6">

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="text-2xl font-bold">

                            Requirement

                        </h2>

                        <p className="mt-4 text-slate-700 leading-7">

                            {requirement?.requirement}

                        </p>

                    </div>
                    <AIExplanation
    requirement={requirement}
/>
<RequirementMetrics
    quality={quality}
    scenarios={scenarios}
    testcases={testcases}
/>

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Business Scenarios

                        </h2>

                        {scenarios.map((s: any, index: number) => (

                            <div
                                key={s.scenario_id ?? `${s.scenario}-${index}`}
                                className="border-b py-3"
                            >

                                {s.scenario}

                            </div>

                        ))}

                    </div>

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Generated Test Cases

                        </h2>

                        {testcases.map((tc: any) => (

                            <div
                                key={tc.testcase_id}
                                className="border-b py-3"
                            >

                                <div className="font-semibold">

                                    {tc.testcase_id}

                                </div>

                                <div className="text-slate-500">

                                    {tc.scenario}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-6">

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="font-bold">

                            Module

                        </h2>

                        <p className="mt-2">

                            {requirement?.module}

                        </p>

                        <h2 className="font-bold mt-6">

                            Priority

                        </h2>

                        <p className="mt-2">

                            {requirement?.priority}

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="font-bold">

                            Traceability

                        </h2>

                        <p className="mt-4 text-green-600">

                            {traceability?.coverage}

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="font-bold">

                            Quality Score
                            <ImpactAnalysis

    requirement={requirement}

    traceability={traceability}

    scenarios={scenarios}

    testcases={testcases}

/>

                        </h2>

                        <div className="text-5xl font-bold mt-5 text-blue-600">

                            {quality?.quality_score || 0}

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="font-bold mb-4">

                            Clarification Questions

                        </h2>

                        {questions.slice(0,5).map((q:any,index:number)=>(

                            <div
                                key={q.question_id ?? index}
                                className="text-sm border-b py-3"
                            >

                                {q.question}

                            </div>
                            

                        ))}

                    </div>
                    <AICopilot
                          requirement={requirement}
                /> 

                </div>

            </div>

        </Layout>

    );

}