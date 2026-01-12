import express from "express";
const app = express(); // asigning express in app.
app.use(express.json()); // Enables Express to automatically parse JSON payloads in HTTP requests
import userRouter from "./view/user.routes.js";

import dotenv from "dotenv";
dotenv.config();



import mongoose from "mongoose";

const uri = process.env.MONGO_ATLAS;


mongoose
  .connect(uri, { dbName: "newestDB" })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.error(err.message);
  });



app.get("/", (req, res) => {
  res.send("Welcome to the user management api");
});

//this is used for api versioning
// API versioning means managing changes in an API without breaking existing clients.
// When your API evolves, older apps can keep working while newer apps use the updated version.

app.use("/v1", userRouter);

app.listen(3000, () => {
  console.log(`Server is live on http://localost:3000`);
});
