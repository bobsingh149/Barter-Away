import express from "express";
import userRouter from "./routes/user_routes.js";
import productRouter from "./routes/product_routes.js";
import mongoose from "mongoose";

const mongoConnectUrl =
  "mongodb+srv://bobsingh149:dushyant14@cluster0.nji8ccn.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// app.use((req,res,next)=>{

//     Do something ...

//     next();
// });

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something went wrong" });
});

app.use((req, res, next) => {
  res.status(404).send("<h1>PAGE NOT FOUND</h1>");
});

mongoose
  .connect(mongoConnectUrl)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
