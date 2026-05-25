const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dynamicRoutes = require("./routes/dynamicRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", dynamicRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend Running Successfully"
    });
});

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected");

        app.listen(5000, () => {
            console.log("Server Running On Port 5000");
        });

    })
    .catch((err) => {
        console.log(err);
    });