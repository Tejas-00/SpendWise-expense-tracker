require("dotenv").config()
const cors = require("cors")
const path = require("path")

const express = require("express")
const app = express()

const connectDB = require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js")
const incomeRoutes = require("./routes/incomeRoutes.js")
const expenseRoutes = require("./routes/expenseRoutes.js")
const dashboardRoutes = require("./routes/dashboardRoutes.js")


// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        // This line tells your server who is allowed to make requests to it (like sending or getting data).
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"],
    })
)

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})