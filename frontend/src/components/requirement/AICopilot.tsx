import { useState } from "react";
import api from "../../services/api";

type Props = {
    requirement: any;
};

export default function AICopilot({
    requirement,
}: Props) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const data = JSON.parse(
        localStorage.getItem("uat_result") || "{}"
    );

    async function askAI() {

        if (!question.trim()) {
            return;
        }

        setLoading(true);
        setAnswer("");

        try {

            const response = await api.post("/copilot", {

                project_id: data.project_id,

                requirement: requirement?.requirement,

                question: question,

            });

            setAnswer(response.data.answer);

        } catch (err) {

            console.error(err);

            setAnswer("Unable to generate AI response.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-bold mb-4">

                🤖 AI Copilot

            </h2>

            <textarea

                rows={4}

                value={question}

                onChange={(e) => setQuestion(e.target.value)}

                placeholder="Ask anything about this requirement..."

                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

            <button

                onClick={askAI}

                disabled={loading}

                className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-xl font-semibold transition"

            >

                {loading ? "Thinking..." : "Ask AI"}

            </button>

            {answer && (

                <div className="mt-6">

                    <h3 className="font-bold mb-3">

                        AI Response

                    </h3>

                    <div className="bg-slate-50 rounded-xl border p-4 whitespace-pre-wrap leading-7">

                        {answer}

                    </div>

                </div>

            )}

        </div>

    );

}