import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { backendUrl } from '../App';

const Add = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    price: '',
    sizes: [],
    bestseller: false,
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'sizes') {
      const updatedSizes = checked
        ? [...product.sizes, value]
        : product.sizes.filter((size) => size !== value);
      setProduct({ ...product, sizes: updatedSizes });
    } else if (type === 'checkbox' && name === 'bestseller') {
      setProduct({ ...product, bestseller: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && product.images.length < 4) {
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, file]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('subCategory', product.subCategory);
    formData.append('price', product.price);
    formData.append('bestseller', product.bestseller);
    product.sizes.forEach((size) => formData.append('sizes[]', size));
    product.images.forEach((image) => formData.append('images', image));

    try {
      const token = localStorage.getItem('token'); // Update based on your auth logic
      const response = await axios.post(`${backendUrl}api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      });
      alert('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        price: '',
        sizes: [],
        bestseller: false,
        images: [],
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>

      {/* Upload Images */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">Upload Images (Max 4)</p>
        <div className="flex gap-4 flex-wrap">
          {[1, 2, 3, 4].map((n, index) => (
            <label key={n} htmlFor={`image${n}`} className="cursor-pointer relative">
              <img
                className="w-24 h-24 border rounded object-cover"
                src={product.images[index] ? URL.createObjectURL(product.images[index]) : assets.upload_area}
                alt="upload"
              />
              <input type="file" id={`image${n}`} hidden onChange={handleImageChange} />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Category */}
      <select
        name="category"
        value={product.category}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Category</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>

      {/* Sub-category */}
      <select
        name="subCategory"
        value={product.subCategory}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Sub-category</option>
        <option value="topwear">Topwear</option>
        <option value="bottomwear">Bottomwear</option>
        <option value="winterwear">Winterwear</option>
      </select>

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={product.price}
        onChange={handleInputChange}
        className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Sizes */}
      <div className="flex flex-wrap gap-4">
        {['S', 'L', 'XL', 'XXL'].map((size) => (
          <label key={size} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sizes"
              value={size}
              checked={product.sizes.includes(size)}
              onChange={handleInputChange}
              className="accent-blue-600"
            />
            {size}
          </label>
        ))}
      </div>

      {/* Best Seller */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="bestseller"
          checked={product.bestseller}
          onChange={handleInputChange}
          className="accent-green-600"
        />
        Mark as Best Seller
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
