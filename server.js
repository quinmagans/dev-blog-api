const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//import dotenv
const dotenv = require("dotenv");

//Import all routes
const blogs = require("./routes/postRoutes");
const users = require("./routes/userRoutes");

//Use to parse incoming requests with JSON payload and is based on body-parser
app.use(express.json());
app.use(cookieParser());
//to have access in the image
app.use("/uploads", express.static("uploads"));

//Main URL
app.use("/api", blogs);
app.use("/api/user", users);

//Setting up config path file
dotenv.config({ path: "./config.env" });

//Set up database connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.once("open", () => console.log("Connected to database..."));

//Server
app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
