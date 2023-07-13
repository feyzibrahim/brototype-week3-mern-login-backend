require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Get all data" });
// });

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on PORT: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
