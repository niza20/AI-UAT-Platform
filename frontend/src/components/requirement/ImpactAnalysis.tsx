type Props = {
    requirement: any;
    traceability: any;
    scenarios: any[];
    testcases: any[];
};

export default function ImpactAnalysis({

    requirement,

    traceability,

    scenarios,

    testcases

}: Props) {

    const risk =
        testcases.length > 10
            ? "HIGH"
            : testcases.length > 5
            ? "MEDIUM"
            : "LOW";

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-bold mb-5">

                Impact Analysis

            </h2>

            <div className="space-y-3">

                <div className="flex justify-between">

                    <span>Affected Test Cases</span>

                    <span className="font-semibold">

                        {testcases.length}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Business Scenarios</span>

                    <span className="font-semibold">

                        {scenarios.length}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Coverage</span>

                    <span>

                        {traceability?.coverage}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Risk</span>

                    <span
                        className={
                            risk === "HIGH"
                                ? "text-red-600 font-bold"
                                : risk === "MEDIUM"
                                ? "text-yellow-600 font-bold"
                                : "text-green-600 font-bold"
                        }
                    >

                        {risk}

                    </span>

                </div>

            </div>

        </div>

    );

}