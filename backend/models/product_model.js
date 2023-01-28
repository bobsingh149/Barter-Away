import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title:{type:String,required:true},
  des:String,
  price:Number,
  loc:String,
  cat:String,
  img:String,
  creator: {type:mongoose.Types.ObjectId,ref:'User'},
});


export default mongoose.model('Product',productSchema);