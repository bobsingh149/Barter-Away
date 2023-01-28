import express from "express";
import User from "../models/user_model.js";
import Product from "../models/product_model.js";
import HttpError from "../models/http_error.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  const userinfo = req.body;
  let user;
  try {
    user = new User(userinfo);
    user = await user.save();
  } catch (e) {
    return next(new HttpError(404, e.message));
  }

  res.json({ user: user.toObject({ getters: true }) });
});

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  let user;
  try {
    user = await User.findOne({ username: username });

    if (!user || user.password !== password) {
      throw new HttpError(404, "INVALID USERNAME OR PASSWORD");
    }
  } catch (err) {
    return next(new HttpError(404, err.message));
  }

  res.json({ user: user.toObject({ getters: true }) });
});

// userRouter.get("/:uid",async(req,res,next)=>{

//   const uid=req.params.uid;

//   let prods=[];

//   try
//   {
//       const user = await User.findById(uid);

//       if(!user)
//       {
//           throw new HttpError(400,"User doesn't exist");
//       }
//       prods = await Product.find({creator:uid});
//   }

//   catch(err)
//   {
//       return next(new HttpError(err.statusCode || 404,err.message));
//   }

//   res.json(prods);
// });

userRouter.get("/:uid", async (req, res, next) => {
  const uid = req.params.uid;

  let products = [];

  try {
    const userwithProd = await User.findById(uid).populate("products");

    if (!userwithProd) {
      throw new HttpError(400, "User doesn't exist");
    }

    products = userwithProd.products.map((prod) => {
      return prod.toObject({ getters: true });
    });
  } catch (err) {
    return next(new HttpError(err.statusCode || 404, err.message));
  }

  res.json({ product: products });
});

export default userRouter;
