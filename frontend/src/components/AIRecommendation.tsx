type Props = {
    analytics: any;
};

export default function AIRecommendation({
    analytics,
}: Props) {

    const summary = analytics.summary || {};

    const recommendation =
        summary.coverage === 100
            ? "Project is ready for User Acceptance Testing."
            : "Generate more test cases for uncovered requirements before execution.";

    return (

        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl text-white shadow-lg p-6">

            <h2 className="text-2xl font-bold">

                🤖 AI Recommendation

            </h2>

            <p className="mt-5 text-blue-100 leading-7">

                {recommendation}

            </p>

        </div>

    );

}