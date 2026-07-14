type Props = {
    requirements: any[];
};

export default function RiskRequirements({
    requirements,
}: Props) {

    const high = requirements.filter(
        (r) => r.priority === "High"
    );

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-bold mb-5">

                🚨 High Priority Requirements

            </h2>

            <div className="space-y-4">

                {high.slice(0, 6).map((r) => (

                    <div
                        key={r.requirement_id}
                        className="border-b pb-3"
                    >

                        <div className="font-semibold">

                            {r.requirement_id}

                        </div>

                        <div className="text-sm text-slate-500">

                            {r.requirement}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}