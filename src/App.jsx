// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ConsumptionChart from "./pages/dashboard/ConsumptionChart.jsx";

function App() {
    return (
        <>
            <div>
                <h1 className="title">Energy Consumptions</h1>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
