import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.status);
      })
      .catch(() => {
        setBackendStatus("Unavailable");
      });
  }, []);

  return (
    <div className="container">
      <h1>DevOps CI/CD Pipeline</h1>

      <p>
        Full-Stack application deployed using an automated CI/CD pipeline.
      </p>

      <div className="card">
        <h2>Application Status</h2>

        <p>Frontend: Running </p>

        <p>
          Backend:{" "}
          {backendStatus === "healthy"
            ? "Healthy"
            : backendStatus}
        </p>
      </div>

      <div className="card">
        <h2>Technologies</h2>

        <p>
          React • Node.js • Docker • Jenkins • AWS EC2
        </p>
      </div>
    </div>
  );
}

export default App;