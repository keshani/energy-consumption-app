import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Month: ${label}`}</p>
                <p className="label">{`Total Consumption: ${payload[0].value} kWh`}</p>
                <p className="label">{`Total Cost(With Vat) : ${payload[0].payload.totalCostInCentsWithVat} ${payload[0].payload.currencyCode} `}</p>
            </div>
        );
    }
    return null;
};

function ConsumptionChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConsumption = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch(
                    "/api/v1/consumption/monthlyConsumption?year=2025",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await res.json();
                const monthlyData = result.userMonthlyConsumptions;

                if (Array.isArray(monthlyData)) {
                    setData(monthlyData);
                } else {
                    throw new Error("Invalid data format from server");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load consumption data.");
                setData([]); // fallback
            } finally {
                setLoading(false);
            }
        };

        fetchConsumption();
    }, []);

    return (
        <div style={{ width: "100%", height: "400px" }}>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && data.length === 0 && (
                <p>No consumption data available.</p>
            )}

            {!loading && !error && data.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis
                            label={{
                                value: "kWh",
                                angle: -90,
                                position: "insideLeft",
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="totalConsumptionInKwh" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default ConsumptionChart;
