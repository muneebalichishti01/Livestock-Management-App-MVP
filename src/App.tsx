import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import UserProfilePage from "./components/settings/UserProfilePage";
import FarmSettingsPage from "./components/settings/FarmSettingsPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/farm-settings" element={<FarmSettingsPage />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
