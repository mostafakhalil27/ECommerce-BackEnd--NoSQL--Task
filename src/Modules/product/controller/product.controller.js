import productModel from "../../../DB/Models/product.model.js";


export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, userId } = req.body;
  const product = await productModel.create({ name, description, price, userId });
  return res.json({Message:"Done", product });
  } catch (error) {
    return res.json({Message:"Catch Error", error, stack: error.stack});
  };
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const deleteProduct = await productModel.findOneAndDelete({ _id: id, userId}, {new:true});
      return deleteProduct? res.json({Message: "Done", deleteProduct}): res.json({Message: "Invalid Id"}); 
  } catch (error) {
    return res.json({Message:"Catch Error" ,error, stack: error.stack});
  };
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, userId } = req.body;
    const updateProduct = await productModel.findOneAndUpdate({ _id: id}, req.body, {new:true});
      return updateProduct? res.json({Message: "Done", updateProduct}): res.json({Message: "Invalid Id"}); 
  } catch (error) {
    return res.json({Message:"Catch Error" ,error, stack: error.stack});
  };
};

export const getAllProducts = async (req, res, next) => {
  const products = await productModel.find();
  return res.json({Message:"Done", products}); 
};

export const getProducts = async (req, res, next) => {
  const products = await productModel.find().select('name description price userId -_id').populate(
    [
      {
        path:'userId',
        select:'name email'
      }
    ]
  );
  return res.json({Message:"Done", products}); 
};

export const sortProducts = async (req, res, next) => {
  const products = await productModel.find().sort({ name: -1 });
  return res.json({Message:"Done", products}); 
};



