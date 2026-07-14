type Props = {
    project: any;
    onOpen: (id: string) => void;
  };
  
  export default function RecentProjectCard({
    project,
    onOpen,
  }: Props) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
  
        <div className="p-6">
  
          <div className="flex justify-between items-start">
  
            <div>
  
              <h3 className="text-xl font-bold text-slate-900">
  
                {project.project_id}
  
              </h3>
  
              <p className="text-slate-500 mt-1">
  
                {project.file_name}
  
              </p>
  
            </div>
  
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
  
              {project.status}
  
            </span>
  
          </div>
  
          <div className="mt-6 text-sm text-slate-500">
  
            Created
  
            <div className="font-medium text-slate-700 mt-1">
  
              {new Date(project.created_at).toLocaleString()}
  
            </div>
  
          </div>
  
          <button
            onClick={() => onOpen(project.project_id)}
            className="mt-6 w-full rounded-xl bg-slate-900 hover:bg-blue-600 text-white py-3 font-semibold transition"
          >
  
            Open Project →
  
          </button>
  
        </div>
  
      </div>
    );
  }