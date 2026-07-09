import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-white text-blue-700 shadow"
        : "text-white hover:bg-blue-600"
    }`;

  return (
    <nav className="bg-blue-700 shadow">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="text-3xl">
            🤖
          </div>

          <div>

            <div className="text-white font-bold text-xl">
              AI UAT Platform
            </div>

            <div className="text-blue-200 text-sm">
              Enterprise Test Automation
            </div>

          </div>

        </div>

        <div className="flex gap-2">

          <NavLink
            to="/"
            className={linkClass}
          >
            Upload
          </NavLink>

          <NavLink
            to="/dashboard"
            className={linkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/requirements"
            className={linkClass}
          >
            Requirements
          </NavLink>

          <NavLink
            to="/clarifications"
            className={linkClass}
          >
            Questions
          </NavLink>

          <NavLink
            to="/testcases"
            className={linkClass}
          >
            Test Cases
          </NavLink>

          

        </div>

      </div>

    </nav>
  );
}

export default Navbar;