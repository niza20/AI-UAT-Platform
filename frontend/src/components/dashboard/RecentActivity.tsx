type Props = {

    requirements:any[];

    questions:any[];

    testcases:any[];

};

export default function RecentActivity({

    requirements,

    questions,

    testcases,

}:Props){

    return(

<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

<h2 className="text-xl font-bold mb-6">

🕒 Recent Activity

</h2>

<div className="space-y-5">

<Activity
title={`${requirements.length} Requirements Extracted`}
color="bg-blue-500"
/>

<Activity
title={`${questions.length} Clarifications Generated`}
color="bg-purple-500"
/>

<Activity
title={`${testcases.length} Test Cases Created`}
color="bg-green-500"
/>

<Activity
title="Analytics Generated"
color="bg-orange-500"
/>

<Activity
title="Project Saved"
color="bg-slate-700"
/>

</div>

</div>

    )

}

function Activity({

title,

color,

}:{

title:string;

color:string;

}){

return(

<div className="flex items-center gap-4">

<div className={`w-3 h-3 rounded-full ${color}`} />

<p>

{title}

</p>

</div>

)

}