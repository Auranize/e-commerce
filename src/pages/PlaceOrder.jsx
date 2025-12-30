import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { load } from "@cashfreepayments/cashfree-js";
import { useT } from '../hooks/useT'; // Import translation hook

const PlaceOrder = () => {
  const t = useT(); // Translation function
  const [method, setMethod] = useState('cashfree');
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
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
    phone: '',
  });

  const [cashfree, setCashfree] = useState(null);

  // Initialize Cashfree SDK
  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({
          mode: 'production', // Change to 'sandbox' for testing
        });
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("Failed to initialize Cashfree SDK:", error);
        toast.error(t('placeorder_payment_init_error'));
      }
    };

    initializeCashfree();
  }, [t]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      if (method === 'cashfree') {
        if (!cashfree) {
          toast.error(t('placeorder_payment_init_error'));
          return;
        }

        const response = await axios.post(backendUrl + '/api/order/cashfree', orderData, {
          headers: { token }
        });

        if (response.data.success) {
          const checkoutOptions = {
            paymentSessionId: response.data.order.payment_session_id,
            redirectTarget: "_modal"
          };

          try {
            await cashfree.checkout(checkoutOptions);
            toast.success(t('placeorder_payment_success'));

            // Verify payment
            const verifyResponse = await axios.post(
              backendUrl + '/api/order/verifyCashfree',
              { orderId: response.data.order.order_id },
              { headers: { token } }
            );

            if (verifyResponse.data.success) {
              toast.success(t('placeorder_payment_verified'));
              setCartItems({});
              navigate('/orders');
            } else {
              toast.error(t('placeorder_verification_failed'));
            }
          } catch (error) {
            console.error("Cashfree checkout error:", error);
            toast.error(error.message || t('placeorder_payment_failed'));
          }
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error(t('placeorder_select_method'));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || t('placeorder_error_generic'));
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'
    >
      {/* Left Side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={t('placeorder_delivery')} text2={t('placeorder_information')} />
        </div>

        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder={t('placeorder_first_name')}
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder={t('placeorder_last_name')}
            type="text"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder={t('placeorder_email')}
          type="email"
        />

        <input
          required
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder={t('placeorder_street')}
          type="text"
        />

        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder={t('placeorder_city')}
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder={t('placeorder_state')}
            type="text"
          />
        </div>

        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder={t('placeorder_zipcode')}
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder={t('placeorder_country')}
            type="text"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder={t('placeorder_phone')}
          type="tel"
        />
      </div>

      {/* Right Side - Cart Summary & Payment */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={t('placeorder_payment')} text2={t('placeorder_method')} />

          <div className='flex gap-3 flex-col lg:flex-row mt-6'>
            {/* Cashfree - Active */}
            <div
              onClick={() => setMethod('cashfree')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-black transition'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cashfree' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4'>CASHFREE</p>
            </div>

            {/* Others disabled - kept for design consistency */}
            <div className='flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50'>
              <p className='min-w-3.5 h-3.5 border rounded-full'></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>

            <div className='flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50'>
              <p className='min-w-3.5 h-3.5 border rounded-full'></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <p className="text-xs text-yellow-600 mb-2">
              {t('placeorder_gpay_note')}
            </p>

            <p className="text-sm text-gray-500 mb-6">
              {t('placeorder_agree_terms')}{' '}
              <a href="/terms-and-conditions" className="text-blue-600 hover:underline">
                {t('placeorder_terms')}
              </a>{' '}
              {t('placeorder_and')}{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                {t('placeorder_privacy')}
              </a>.
            </p>

            <button
              type='submit'
              className='bg-black text-white px-16 py-3 text-sm font-medium hover:bg-gray-800 transition'
            >
              {t('placeorder_place_order')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;