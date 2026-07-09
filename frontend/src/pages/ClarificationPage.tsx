import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClarificationPage() {
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("uat_result") || "{}");

  const questions = data.questions || [];

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleSelect = (id: string, option: string) => {
    setAnswers({
      ...answers,
      [id]: option,
    });
  };

  const saveAnswers = () => {
    localStorage.setItem(
      "clarification_answers",
      JSON.stringify(answers)
    );

    navigate("/testcases");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Clarification Questions
            </h1>

            <p className="text-gray-500 mt-2">
              Review AI-generated clarification questions before generating test cases.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow px-6 py-4">

            <div className="text-3xl font-bold text-blue-600">
              {questions.length}
            </div>

            <div className="text-gray-500">
              Questions
            </div>

          </div>

        </div>

        {questions.map((q: any) => (

          <div
            key={q.id}
            className="bg-white rounded-xl shadow mb-8 overflow-hidden"
          >

            <div className="bg-blue-600 text-white px-6 py-4">

              <h2 className="font-semibold text-lg">
                {q.id} — {q.question}
              </h2>

            </div>

            <div className="p-6">

              <div className="mb-5">

                <p className="font-semibold text-gray-700">
                  Why is this required?
                </p>

                <p className="text-gray-600 mt-2">
                  {q.reason}
                </p>

              </div>

              <div>

                <p className="font-semibold mb-4">
                  Select the most appropriate answer
                </p>

                {q.options?.map((option: string, index: number) => (

                  <label
                    key={index}
                    className="flex items-start gap-3 border rounded-lg p-4 mb-3 hover:bg-slate-50 cursor-pointer"
                  >

                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === option}
                      onChange={() => handleSelect(q.id, option)}
                    />

                    <span>{option}</span>

                  </label>

                ))}

              </div>

            </div>

          </div>

        ))}

        <div className="flex justify-end">

          <button
            onClick={saveAnswers}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow"
          >
            Generate Test Cases →
          </button>

        </div>

      </div>

    </div>
  );
}

export default ClarificationPage;