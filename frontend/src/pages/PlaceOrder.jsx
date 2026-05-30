import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const { navigate, placeOrder, getCartAmount, delivery_fee, cartItems, products, user } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validation
    const { firstName, lastName, email, street, city, state, zipCode, country, phone } = formData;
    if (!firstName || !lastName || !email || !street || !city || !state || !zipCode || !country || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = products.find((product) => product._id === items);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    placeOrder(orderData);
  };
  
  return (
    <div className='flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side Content */}
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full gap-4 sm:max-w-[480px]'>
        <div className='my-3 text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="email" 
          placeholder='Email Address'
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
        />
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="text" 
          placeholder='Street'
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
        />
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='City'
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='State'
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
          />
        </div>
        <div className='flex gap-3'>
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="number" 
            placeholder='Zip Code'
            name='zipCode'
            value={formData.zipCode}
            onChange={onChangeHandler}
          />
          <input 
            className='w-full px-4 py-2 border border-gray-300 rounded' 
            type="text" 
            placeholder='Country'
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
          />
        </div>
        <input 
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          type="number" 
          placeholder='Mobile' 
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
        />
     
      {/* Right Side Content */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        {/* Payment Methods Selection */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full bg-green-600`}></p>
              <p className='mx-4 text-sm font-medium text-gray-500'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full mt-8 text-end'>
            <button type="submit" className='px-16 py-3 text-sm text-white bg-black active:bg-gray-800'>PLACE ORDER</button>
          </div>
        </div>
      </div>
       </form>
    </div>
  )
}

export default PlaceOrder
