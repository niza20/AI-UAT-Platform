type Props = {
    modules: string[];
};

export default function DetectedModules({ modules }: Props) {

    return (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <h2 className="text-4xl font-bold mb-8">

                🧩 Detected Business Modules

            </h2>

            {modules.length === 0 ? (

                <p className="text-slate-500 text-xl">
                    No modules detected
                </p>

            ) : (

                <div className="space-y-5">

                    {modules.map((module, index) => (

                        <div
                            key={index}
                            className="flex justify-between items-center bg-slate-50 rounded-xl p-4 border"
                        >

                            <span className="font-semibold text-lg">

                                {module}

                            </span>

                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full">

                                #{index + 1}

                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}