import { useState } from "react";

type Props = {
    requirement: any;
    traceability?: any;
};

export default function RequirementCard({
    requirement,
    traceability,
}: Props) {

    const [open, setOpen] = useState(false);

    const covered =
        traceability?.coverage === "Covered";

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

            <div
                className="p-6 cursor-pointer"
                onClick={() => setOpen(!open)}
            >

                <div className="flex justify-between">

                    <div>

                        <div className="text-lg font-bold">

                            {requirement.requirement_id}

                        </div>

                        <div className="text-slate-500 mt-2">

                            {requirement.module}

                        </div>

                    </div>

                    <div className="flex gap-3">

                        <span
                            className={`px-3 py-1 rounded-full text-sm ${
                                covered
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >

                            {covered
                                ? "Covered"
                                : "Missing"}

                        </span>

                    </div>

                </div>

                <div className="mt-5 font-medium">

                    {requirement.requirement}

                </div>

            </div>

            {open && (

                <div className="border-t p-6">

                    <h3 className="font-semibold mb-4">

                        Linked Test Cases

                    </h3>

                    {traceability?.linked_testcases?.length ? (

                        <div className="flex flex-wrap gap-3">

                            {traceability.linked_testcases.map(

                                (tc: string) => (

                                    <span
                                        key={tc}
                                        className="bg-blue-100 text-blue-700 rounded-full px-3 py-1"
                                    >

                                        {tc}

                                    </span>

                                )

                            )}

                        </div>

                    ) : (

                        <p className="text-red-600">

                            No Test Cases Generated

                        </p>

                    )}

                </div>

            )}

        </div>

    );

}