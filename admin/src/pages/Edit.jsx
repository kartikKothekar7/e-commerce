import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const Edit = ({ token }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [existingImage1, setExistingImage1] = useState("");
  const [existingImage2, setExistingImage2] = useState("");
  const [existingImage3, setExistingImage3] = useState("");
  const [existingImage4, setExistingImage4] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.post(backendUrl + "/api/product/single", {
          productId,
        });

        if (response.data.success) {
          const product = response.data.product;
          setName(product.name);
          setDescription(product.description);
          setCategory(product.category);
          setSubCategory(product.subCategory);
          setPrice(product.price);
          setSizes(product.sizes);
          setBestSeller(product.bestseller || false);

          // Set existing images
          setExistingImage1(product.image[0] || "");
          setExistingImage2(product.image[1] || "");
          setExistingImage3(product.image[2] || "");
          setExistingImage4(product.image[3] || "");

          setLoading(false);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product data");
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Only append new images if they exist
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("productId", productId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller ? "true" : "false");

      const response = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        { 
          headers: { token }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Full Error:", error);
      console.error("Error Response:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading product details...</div>;
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      <div>
        <p className="mb-2 text-lg font-semibold">Update Product Image(s)</p>
        <p className="mb-3 text-sm text-gray-600">
          Click on an image to replace it. Leave empty to keep existing images.
        </p>
        <div className="flex gap-2">
          {/* Image 1 */}
          <label htmlFor="image1">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={
                image1
                  ? URL.createObjectURL(image1)
                  : existingImage1 || assets.upload_area
              }
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
              accept="image/*"
            />
          </label>

          {/* Image 2 */}
          <label htmlFor="image2">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={
                image2
                  ? URL.createObjectURL(image2)
                  : existingImage2 || assets.upload_area
              }
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
              accept="image/*"
            />
          </label>

          {/* Image 3 */}
          <label htmlFor="image3">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={
                image3
                  ? URL.createObjectURL(image3)
                  : existingImage3 || assets.upload_area
              }
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
              accept="image/*"
            />
          </label>

          {/* Image 4 */}
          <label htmlFor="image4">
            <img
              className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
              src={
                image4
                  ? URL.createObjectURL(image4)
                  : existingImage4 || assets.upload_area
              }
              alt="Upload Images"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
          type="text"
          placeholder="Enter Product Name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
          type="text"
          placeholder="Enter Product Description"
          required
        />
      </div>

      {/* Category, SubCategory, Price */}
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2 text-lg font-semibold">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 text-lg font-semibold">Product Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
            required
          >
            <option value="">Select Sub Category</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2 text-lg font-semibold">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border-gray-500 max-w-[500px]"
            type="number"
            placeholder="Enter Product Price"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 text-lg font-semibold">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-gray-500 text-white rounded-md"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Seller */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestSeller" className="ml-2 cursor-pointer">
          Add to Best Seller
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <button
          type="submit"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700"
        >
          Update Product
        </button>
        <button
          type="button"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-red-600 hover:bg-red-700"
          onClick={() => navigate("/list")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Edit;
