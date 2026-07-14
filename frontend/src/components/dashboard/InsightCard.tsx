type Props = {
    analytics: any;
};

export default function InsightCard({ analytics }: Props) {

    const s = analytics.summary || {};

    return (
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 shadow-lg">

            <h2 className="text-2xl font-bold">
                🧠 AI Insights
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-6">

                <div>
                    <p className="text-blue-100">
                        Coverage
                    </p>

                    <h3 className="text-3xl font-bold">
                        {s.coverage || 0}%
                    </h3>
                </div>

                <div>
                    <p className="text-blue-100">
                        Test Cases
                    </p>

                    <h3 className="text-3xl font-bold">
                        {s.testcases || 0}
                    </h3>
                </div>

                <div>
                    <p className="text-blue-100">
                        Covered
                    </p>

                    <h3 className="text-3xl font-bold">
                        {s.covered || 0}
                    </h3>
                </div>

                <div>
                    <p className="text-blue-100">
                        Missing
                    </p>

                    <h3 className="text-3xl font-bold">
                        {s.missing || 0}
                    </h3>
                </div>

            </div>

            <div className="mt-8 border-t border-blue-400 pt-5">

                <p>✅ AI workflow completed successfully</p>

                <p>📊 Analytics generated</p>

                <p>🧪 Test cases ready for export</p>

            </div>

        </div>
    );
}