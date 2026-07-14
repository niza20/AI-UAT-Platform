type Props = {
    requirement: any;
};

export default function AIExplanation({
    requirement,
}: Props) {

    if (!requirement) return null;

    return (

        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow">

            <h2 className="text-xl font-bold">

                🤖 AI Explanation

            </h2>

            <p className="mt-5 leading-8">

                This requirement belongs to the

                <span className="font-bold">

                    {" "}{requirement.module}

                </span>

                module.

                It has

                <span className="font-bold">

                    {" "}{requirement.priority}

                </span>

                priority and should be validated thoroughly
                during User Acceptance Testing.

                AI recommends validating positive,
                negative,
                boundary,
                authorization
                and exception scenarios.

            </p>

        </div>

    );

}