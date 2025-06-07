import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch("/api/v1/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const result = await res.json();
                localStorage.setItem("token", result.jwtToken);
                navigate("/dashboard");

            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="form">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
            />
            <button type="submit" className="button">Login</button>
        </form>
    );
}

export default Login;
