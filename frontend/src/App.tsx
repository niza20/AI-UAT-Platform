import { BrowserRouter, Routes, Route } from "react-router-dom";


import UploadPage from "./pages/UploadPage";
import RequirementsPage from "./pages/RequirementsPage";
import ClarificationPage from "./pages/ClarificationPage";
import TestcasePage from "./pages/TestcasePage";
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<UploadPage />} />

        <Route
          path="/requirements"
          element={<RequirementsPage />}
        />

        <Route
          path="/clarifications"
          element={<ClarificationPage />}
        />

        <Route
          path="/testcases"
          element={<TestcasePage />}
        />
        
        <Route
          path="/dashboard"
          element={<DashboardPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;