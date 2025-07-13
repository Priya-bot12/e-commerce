import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { 
    navigate, 
    cartItems, 
    products, 
    getCartAmount, 
    setCartItems, 
    delivery_fee 
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      // Prepare order items from cart
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const productInfo = structuredClone(products.find(product => product._id === productId));
            if (productInfo) {
              productInfo.size = size;
              productInfo.quantity = cartItems[productId][size];
              orderItems.push(productInfo);
            }
          }
        }
      }

      // Final order object
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      let endpoint = '';
      switch (method) {
        case 'cod':
          endpoint = `${backendUrl}/api/order/place`;
          break;
        case 'razorpay':
          endpoint = `${backendUrl}/api/order/place-razorpay`;
          break;
        case 'stripe':
          endpoint = `${backendUrl}/api/order/place-stripe`;
          break;
        default:
          alert('Invalid payment method');
          return;
      }

      const response = await axios.post(endpoint, orderData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        alert('Order failed. Please try again.');
      }

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>

      {/* ------------ Left Side ------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className='input' type='text' placeholder='First name' name='firstName' value={formData.firstName} onChange={onChangeHandler} />
          <input className='input' type='text' placeholder='Last name' name='lastName' value={formData.lastName} onChange={onChangeHandler} />
        </div>

        <input className='input' type='email' placeholder='Email' name='email' value={formData.email} onChange={onChangeHandler} />
        <input className='input' type='text' placeholder='Street' name='street' value={formData.street} onChange={onChangeHandler} />

        <div className='flex gap-3'>
          <input className='input' type='text' placeholder='City' name='city' value={formData.city} onChange={onChangeHandler} />
          <input className='input' type='text' placeholder='State' name='state' value={formData.state} onChange={onChangeHandler} />
        </div>

        <div className='flex gap-3'>
          <input className='input' type='number' placeholder='Zip Code' name='zipcode' value={formData.zipcode} onChange={onChangeHandler} />
          <input className='input' type='text' placeholder='Country' name='country' value={formData.country} onChange={onChangeHandler} />
        </div>

        <input className='input' type='number' placeholder='Phone' name='phone' value={formData.phone} onChange={onChangeHandler} />
      </div>

      {/* ------------ Right Side ------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* ------------ Payment Method Selection ------------ */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='payment-option'>
              <p className={`circle ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>

            <div onClick={() => setMethod('razorpay')} className='payment-option'>
              <p className={`circle ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            <div onClick={() => setMethod('cod')} className='payment-option'>
              <p className={`circle ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
