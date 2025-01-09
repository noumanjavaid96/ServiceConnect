import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ServiceProviderDashboard from "./components/dashboard/ServiceProviderDashboard";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<ServiceProviderDashboard />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
