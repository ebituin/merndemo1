const express = require("express");
const cors = require("cors");
const passport = require("passport");
const classroomRoutes = require("./routes/api/classrooms");

require("dotenv").config();
const authRoutes = require("./routes/auth");

const app = express();


app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.use("/api/classrooms", classroomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
