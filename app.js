const express = require("express");

const app = express();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

app.use("/students", studentRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});