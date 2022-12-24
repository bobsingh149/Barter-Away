import express from "express";
import mongoose from "mongoose";
import HttpError from "../models/http_error.js";

import Product from "../models/product_model.js";
import User from "../models/user_model.js";

const productRouter = express.Router();

productRouter.post("/add", async (req, res, next) => {
  const prodInfo = req.body;

  const creator = prodInfo.creator;

  try {
    let user = await User.findById(creator);

    if (!user) {
      throw new HttpError(433, "The creator of porduct is not a valid user");
    }

    let product = new Product(prodInfo);

    const sess = await mongoose.startSession();

    sess.startTransaction();

    await product.save({ session: sess });

    user.products.push(product._id); //user.products.push(product);

    await user.save({ session: sess });

    sess.commitTransaction();

    res.json({
      product: product.toObject({ getters: true }),
      user: user.toObject({ getters: true }),
    });
  } catch (err) {
    return next(new HttpError(412, err.message));
  }

  //res.json(prodInfo);
});

productRouter.get("/all", async (req, res, next) => {
  let prods = [];

  try {
    prods = await Product.find().limit(1000).sort({ price: 1 });
  } catch (err) {
    return next(new HttpError(err.statusCode || 404, err.message));
  }

  res.json({ product: prods.map((prod) => prod.toObject({ getters: true })) });
});



productRouter.get('/equalquery', async(req,res,next)=>{

  const filter = req.query;

  
  if(!filter)
    filter=req.body;

  let products;

  try
  {
    products = await Product.find(filter);

    products = products.map(prod => prod.toObject({getters:true}));

  }

  catch(err)
  {
      return next(new HttpError(err.statusCode || 500,err.message));
  }


  res.json({product:products});
});


productRouter.get('/query', async(req,res,next)=>{

  const filter = req.body;

  if(!filter)
    filter=req.query;

  let products;

  try
  {
    products = await Product.find(filter);

    products = products.map(prod => prod.toObject({getters:true}));

  }

  catch(err)
  {
      return next(new HttpError(err.statusCode || 500,err.message));
  }


  res.json({product:products});
});

productRouter.get('/bestfit',async (req,res,next)=>{

      const price = req.query.price;
      
      if(!price)
        price=req.body.price;

      let bestfitProd;


        try
        {
          const justGreater = await Product.find({price:{$gt:price}}).sort(1).limit(1);

          if(justGreater)
          justGreater = justGreater[0];
         

          const justLessEq = await Product.find({price:{$lte:price}}).sort(-1).limit(1);

          if(justLessEq)
          justLessEq=justLessEq[0];

          
          if(!justGreater && !justLessEq)
            throw new HttpError(404,'No products exist');

          else if(justGreater && !justLessEq)
              bestfitProd=justGreater;

          else if(justLessEq && !justGreater)
              bestfitProd=justLessEq;

          else 
            bestfitProd = Math.abs(justGreater.price-price) < Math.abs(justLessEq.price-price) ?justGreater :justLessEq;
          


          

        }

        catch(err)
        {
          return next(new HttpError(err.statusCode || 500,err.message));
        }


        return res.json({product:bestfitProd.toObject({getters:true})});

});

productRouter.get("/:pid", async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  try {
    product = await Product.findById(pid);

    if (!product) {
      throw new HttpError(404, "Product not found");
    }
  } catch (err) {
    return next(new HttpError(err.statusCode || 500, err.message));
  }

  res.json({ product: product.toObject({ getters: true }) });
});

productRouter.patch("/:pid", async (req, res, next) => {
  const pid = req.params.pid;
  const prodInfo = req.body;

  let product;

  try {
    product = await Product.findByIdAndUpdate(pid, prodInfo, { new: true });

    // if (!product) {
    //   throw new HttpError(404, "Product not found");
    // }

    // for(const [key,val] of Object.entries(prodInfo))
    //     product[key]=val;

    // product = await product.save();
  } catch (err) {
    return next(new HttpError(err.statusCode || 500, err.message));
  }

  res.json({ product: product.toObject({ getters: true }) });
});

productRouter.delete("/:pid", async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  try {
    product = await Product.findById(pid).populate("creator");

    product.creator.products.pull(product);
    //product.creator.products.pull(product._id);

    const sess = await mongoose.startSession();

    sess.startTransaction();

    await product.creator.save({ session: sess });

    await product.remove({ session: sess });

    sess.commitTransaction();
  } catch (err) {
    return next(new HttpError(err.statusCode || 500, err.message));
  }

  res.json({ product: product.toObject({ getters: true }) });
});



export default productRouter;
