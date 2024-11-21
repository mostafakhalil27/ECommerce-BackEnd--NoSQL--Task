import userModel from '../../../DB/Models/user.model.js';
import productModel from '../../../DB/Models/product.model.js'
import bcrypt from 'bcryptjs';
import Jwt  from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, gender } = req.body;
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.json({ Message: "Email Already Exists" });
    };
    const hash = bcrypt.hashSync(password, 8);
    const newUser = await userModel.create({ name, email, password: hash, gender });
    return res.json({ Message: "Done", user: newUser });
  } catch (error) {
    return res.json({ Message: "Catch Error", error });
  };
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const emailExist = await userModel.findOne({ email });
  if (!emailExist) {
    return res.json({Message:"Invalid Email Or Password"})
  };
  const match = bcrypt.compareSync(password, emailExist.password);
  if (!match) {
    return res.json({Message:"Invalid Email Or Password"})  
  };
  const token = Jwt.sign({_id: emailExist._id, email: emailExist.email}, 'black', {expiresIn:60*60});
  return res.json({Message:"Done", token});
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, age, gender, phone } = req.body;
    const updatedUser = await userModel.findOneAndUpdate({ _id: id}, req.body, {new:true});
      return updatedUser? res.json({Message: "Done", updatedUser}): res.json({Message: "Invalid Id"}); 
  } catch (error) {
    return res.json({Message:"Catch Error" ,error, stack: error.stack});
  };
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findOneAndDelete({ _id: id}, {new:true});
      return deletedUser? res.json({Message: "Done", deletedUser}): res.json({Message: "Invalid Id"}); 
  } catch (error) {
    return res.json({Message:"Catch Error" ,error, stack: error.stack});
  };
};

export const searchUsers = async (req, res, next) => {
  try {
    const { name, maxAge } = req.query;
    const query = {};
    if (name) {
      query.name = { $regex: new RegExp(`^${name}`, 'i') };
    }
    if (maxAge) {
      const parsedMaxAge = parseInt(maxAge);
      if (!isNaN(parsedMaxAge)) {
        query.age = { $lt: parsedMaxAge };
      } else {
        return res.json({ message: 'Invalid maxAge value' });
      }
    }
    const users = await userModel.find(query);
    return res.json({ Message: "Done", users });
  } catch (error) {
    return res.json({ message: 'Catch error', error , stack:error.stack});
  }
};

export const searchWithAgeRange = async (req, res, next) => {
  try {
    const { minAge, maxAge } = req.query;
    const query = {};
    if (minAge !== undefined && maxAge !== undefined) {
      const parsedMinAge = parseInt(minAge);
      const parsedMaxAge = parseInt(maxAge);
      if (!isNaN(parsedMinAge) && !isNaN(parsedMaxAge)) {
        query.age = { $gte: parsedMinAge, $lte: parsedMaxAge };
      } else {
        return res.json({ message: 'Invalid maxAge value' });
      }
    }
    const users = await userModel.find(query);
    return res.json({ Message: 'Done', users });
  } catch (error) {
    return res.json({ message: 'Catch error', error , stack:error.stack});
  }
};

export const getAllUsers = async (req, res, next) => {
  const users = await userModel.find();
  return res.json({Message:"Done", users}); 
};

export const getUserProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({_id: id});
    if (!user) {
      return res.json({ Message: "User not found" });
    }
    const userProducts = await productModel.find({ userId: id});
    return res.json({ Message: "Done", products: userProducts });
  } catch (error) {
    return res.json({ Message: "Error", error });
  }
};





