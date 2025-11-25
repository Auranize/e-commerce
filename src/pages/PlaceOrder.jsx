import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { load } from "@cashfreepayments/cashfree-js"

const PlaceOrder = () => {
  const [method, setMethod] = useState('cashfree'); // Set default to cashfree
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
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
  })
  const [cashfree, setCashfree] = useState(null);

  // Initialize Cashfree SDK on component mount
  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({
          mode: 'production', // TEST or PROD
        });
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("Failed to initialize Cashfree SDK:", error);
        toast.error("Failed to initialize payment gateway");
      }
    };

    initializeCashfree();
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          console.log('Data : ', data)
          if (data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

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

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          // Not implemented as it's disabled
          toast.error("Stripe payments are currently unavailable");
          break;

        case 'razorpay':
          // Not implemented as it's disabled
          toast.error("Razorpay payments are currently unavailable");
          break;

        case 'cashfree':
          if (!cashfree) {
            toast.error("Payment gateway not initialized. Please try again.");
            return;
          }

          const responseCashfree = await axios.post(backendUrl + '/api/order/cashfree', orderData, { headers: { token } });
          if (responseCashfree.data.success) {
            console.log("Cashfree response:", responseCashfree.data);
            let checkoutOptions = {
              paymentSessionId: responseCashfree.data.order.payment_session_id,
              redirectTarget: "_modal"
            }
            try {
              const result = await cashfree.checkout(checkoutOptions);
              toast.success("Payment successful! Verifying...");
              console.log("Cashfree result:", result.paymentDetails.paymentMessage);

              // If payment was successful, verify with backend and navigate
              const verifyResponse = await axios.post(
                backendUrl + '/api/order/verifyCashfree',
                { orderId: responseCashfree.data.order.order_id },
                { headers: { token } }
              );

              if (verifyResponse.data.success) {
                toast.success("Payment verified successfully!");
                setCartItems({});
                navigate('/orders');
              } else {
                toast.error("Payment verification failed. Please contact support.");
              }

            } catch (error) {
              console.error("Cashfree checkout error:", error);
              toast.error(error.message || "Payment failed. Please try again.");
            }
          } else {
            toast.error(responseCashfree.data.message);
          }
          break;

        default:
          toast.error("Please select a valid payment method");
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' type="text" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last name' type="text" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' type="email" />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip code' type="number" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' type="number" />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* Stripe - Disabled */}
            <div className='flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50'>
              <p className='min-w-3.5 h-3.5 border rounded-full'></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Cashfree - Active */}
            <div onClick={() => setMethod('cashfree')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cashfree' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASHFREE</p>
            </div>

            {/* Razorpay - Disabled */}
            <div className='flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50'>
              <p className='min-w-3.5 h-3.5 border rounded-full'></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            {/* COD - Commented out as in original code
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div> */}
          </div>

          <div className='w-full text-end mt-8'>
            <p className="text-xs text-yellow-600 mb-2">
              Note: If Google Pay doesn’t work, try using PhonePe, Paytm, or UPI.
            </p>

            <p className="text-sm text-gray-500 mb-4">
              By placing your order, you agree to our{' '}
              <a href="/terms-and-conditions" className="text-blue-500 hover:underline">Terms & Conditions</a> and{' '}
              <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
            </p>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder