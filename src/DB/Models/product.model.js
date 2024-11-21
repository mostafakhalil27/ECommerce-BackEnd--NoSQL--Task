import { Schema, model, Types } from "mongoose";

const productSchema = new Schema ({
  name:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:true,
  },
  price:{
    type:Number,
    require:true,
  },
  userId:{
    type:Types.ObjectId,
    require:true,
    ref:'User'
  },
},{timestamps:true});

const productModel = model('Product', productSchema);

export default productModel;