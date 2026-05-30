import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// INFO: Route for adding a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields: name, description, price, category, subCategory" 
      });
    }

    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    const productImages = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    if (productImages.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload at least one image" });
    }

    let imageUrls = await Promise.all(
      productImages.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.log("Error while adding product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching all products
const listProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await productModel
      .find({})
      .limit(limit)
      .skip(skip)
      .lean();

    const totalProducts = await productModel.countDocuments({});
    const totalPages = Math.ceil(totalProducts / limit);

    console.log(`Fetching products - Page: ${page}, Limit: ${limit}, Total Products: ${totalProducts}, Products Found: ${products.length}`);

    if (products.length === 0) {
      console.warn("No products found in database");
    }

    res.status(200).json({ 
      success: true, 
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit
      }
    });
  } catch (error) {
    console.log("Error while fetching all products: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("Error while removing product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching a single product
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error while fetching single product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for updating a product
const updateProduct = async (req, res) => {
  try {
    const { productId, name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    // Find existing product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Prepare image updates
    let imageUrls = [...product.image]; // Keep existing images by default
    const newImages = [image1, image2, image3, image4].filter((image) => image !== undefined);

    // Upload new images to Cloudinary
    if (newImages.length > 0) {
      const uploadedUrls = await Promise.all(
        newImages.map(async (image) => {
          let result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
      
      // Replace images starting from index 0
      imageUrls = uploadedUrls.concat(imageUrls.slice(uploadedUrls.length));
      if (imageUrls.length > 4) {
        imageUrls = imageUrls.slice(0, 4); // Keep only 4 images max
      }
    }

    // Update product with new data
    const updateData = {
      name: name || product.name,
      description: description || product.description,
      price: price ? Number(price) : product.price,
      category: category || product.category,
      subCategory: subCategory || product.subCategory,
      sizes: sizes ? JSON.parse(sizes) : product.sizes,
      bestSeller: bestSeller !== undefined ? (bestSeller === "true" ? true : false) : product.bestSeller,
      image: imageUrls,
    };

    await productModel.findByIdAndUpdate(productId, updateData, { new: true });
    res.status(200).json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log("Error while updating product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct, updateProduct };
