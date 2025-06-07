import { useNavigate } from "react-router-dom";
import ConsumptionChart from "./ConsumptionChart.jsx";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard-wrapper">
            <div className="logout-container">
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>

            <div className="dashboard-container">
                <h1 className="dashboard-title">Monthly Consumption</h1>
                <div className="chart-wrapper">
                    <ConsumptionChart />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
