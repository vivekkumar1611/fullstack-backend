const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Health API
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "backend" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
