type Props = {
    requirements: any[];
  };
  
  export default function RequirementTable({
    requirements,
  }: Props) {
    return (
      <div className="bg-white rounded-xl border p-6">
  
        <h2 className="text-xl font-bold mb-5">
          Requirements
        </h2>
  
        <table className="w-full text-sm">
  
          <thead>
  
            <tr className="border-b">
  
              <th className="text-left py-2">ID</th>
              <th className="text-left">Module</th>
              <th className="text-left">Priority</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {requirements.slice(0,10).map((r) => (
  
              <tr
                key={r.requirement_id}
                className="border-b hover:bg-slate-50"
              >
  
                <td className="py-2">
                  {r.requirement_id}
                </td>
  
                <td>
                  {r.module}
                </td>
  
                <td>
                  {r.priority}
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }