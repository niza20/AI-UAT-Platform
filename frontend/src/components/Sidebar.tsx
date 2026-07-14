import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "🏠",
  },
  {
    title: "Upload BRD",
    path: "/",
    icon: "📤",
  },
  {
    title: "Requirements",
    path: "/requirements",
    icon: "📑",
  },
  {
    title: "Clarifications",
    path: "/clarifications",
    icon: "❓",
  },
  {
    title: "Test Cases",
    path: "/testcases",
    icon: "🧪",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 text-white flex flex-col justify-between">

      <div>

        <div className="px-8 py-8 border-b border-slate-800">

          <h1 className="text-2xl font-bold tracking-wide">

            AI UAT

          </h1>

          <p className="text-slate-400 text-sm mt-2">

            Enterprise Test Intelligence

          </p>

        </div>

        <nav className="mt-8">

          {menu.map((item) => (

            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `mx-4 mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`
              }
            >

              <span className="text-xl">

                {item.icon}

              </span>

              <span className="font-medium">

                {item.title}

              </span>

            </NavLink>

          ))}

        </nav>

      </div>

      <div className="p-6 border-t border-slate-800">

        <div className="rounded-xl bg-slate-900 p-4">

          <div className="text-sm text-slate-400">

            Logged in as

          </div>

          <div className="mt-2 font-semibold">

            Niza

          </div>

          <div className="text-blue-400 text-sm">

            AI Product Builder

          </div>

        </div>

      </div>

    </aside>
  );
}