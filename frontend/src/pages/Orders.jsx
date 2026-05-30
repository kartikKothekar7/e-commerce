import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { toast } from 'react-toastify'

const Orders = () => {

  const {products, currency, user, navigate} = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/order/userorders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders || []);
        } else {
          toast.error(data.message || 'Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className='pt-16 border-t'>
        <div className='text-2xl'>
          <Title text1={'YOUR'} text2={'ORDERS'} />
        </div>
        <p className='py-8 text-center text-gray-500'>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'YOUR'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orders && orders.length > 0 ? orders.map((order, index) => (
            <div key={index} className='flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between'>
              <div className='flex items-start gap-6 text-sm'>
                <div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className='flex items-start gap-6'>
                      <img className='w-16 sm:w-20' src={item.image[0]} alt="Photo" />
                      <div>
                        <p className='font-medium sm:text-base'>{item.name}</p>
                        <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                          <p className='text-lg'>{currency}&nbsp;{item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                          <p>Quantity:&nbsp;{item.quantity}</p>
                          <p>Size:&nbsp;{item.size}</p>
                        </div>
                        <p className='mt-2'>Date:&nbsp;<span className='text-gray-400'>{new Date(order.date).toDateString()}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-between md:w-1/2'>
                <div className='flex items-center gap-2'>
                  <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
                  <p className='text-sm md:text-base'>{order.status}</p>
                </div>
                <button className='px-4 py-2 text-sm font-medium border rounded-sm'>TRACK ORDER</button>
              </div>
            </div>
          )) : (
            <p>No orders found.</p>
          )
        }
      </div>
    </div>
  )
}

export default Orders
