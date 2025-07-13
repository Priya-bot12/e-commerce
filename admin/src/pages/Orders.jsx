import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const statusHandler = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/api/order/update-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Update the local orders state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert('Status update failed');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='p-6'>
      <h3 className='text-2xl font-semibold mb-6'>Order Page</h3>

      <div className='space-y-6'>
        {orders.map((order, index) => (
          <div key={index} className='border rounded-lg p-4 shadow-md bg-white'>
            <div className='flex items-center gap-4 mb-3'>
              <img src={assets.parcel_icon} alt="parcel" className='h-10 w-10' />
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className='text-gray-700'>
                    {item.name} x {item.quantity}{' '}
                    <span className='text-sm text-gray-500'>(Size: {item.size})</span>
                  </p>
                ))}
              </div>
            </div>

            <p className='text-gray-800 font-medium'>
              {order.address.firstName} {order.address.lastName}
            </p>

            <div className='text-sm text-gray-600 leading-tight'>
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}</p>
              <p>Phone: {order.address.phone}</p>
            </div>

            <div className='flex flex-wrap gap-6 mt-4 text-sm text-gray-700'>
              <p><strong>Items:</strong> {order.items.length}</p>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment:</strong> {order.status === 'Paid' ? 'Done' : 'Pending'}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ₹{order.amount}</p>
            </div>

            <div className='mt-4'>
              <label className='text-sm text-gray-600 font-medium block mb-1'>Order Status</label>
              <select
                value={order.status}
                onChange={(e) => statusHandler(order._id, e.target.value)}
                className='border rounded px-3 py-1 text-sm w-full sm:w-auto'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
