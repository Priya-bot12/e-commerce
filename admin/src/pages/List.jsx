import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const currency = (price) => `₹${Number(price).toFixed(2)}`;

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="text-xl font-semibold mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center text-sm font-bold text-gray-700 border-b pb-2">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 md:gap-4 text-sm md:text-base border-b py-2"
          >
            <img
              className="w-12 h-12 object-cover rounded"
              src={item.image[0]}
              alt={item.name}
            />
            <p className="truncate">{item.name}</p>
            <p>{item.category}</p>
            <p>{currency(item.price)}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-red-600 cursor-pointer text-right md:text-center hover:underline"
            >
              Delete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
