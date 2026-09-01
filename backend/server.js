const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully",
    project: "DevOps CI/CD Pipeline"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

module.exports = app;