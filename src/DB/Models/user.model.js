import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  age: Number,
  gender:{
    type:String,
    enum:['male', 'female'],
    default:'male'
  },
  phone: Number,
  confirmemail:{
    type:Boolean,
    default:false
  },
},{timestamps:true})
const modelUser = model('User', userSchema );


export default modelUser;