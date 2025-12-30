import React, { useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-hot-toast';
import { useT } from '../hooks/useT';
import axios from 'axios';

const PlaceOrder = () => {
  const t = useT();
  const [paymentMethod, setPaymentMethod] = useState('whatsapp'); // whatsapp, stripe, cod
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const hasCheckedCart = useRef(false);

  const {
    navigate,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    currency,
    backendUrl,
    token
  } = useContext(ShopContext);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('placeOrderFormData');
    return saved
      ? JSON.parse(saved)
      : {
          firstName: '',
          lastName: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          phone: '',
        };
  });

  // Save form to localStorage (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('placeOrderFormData', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

    if (!formData.firstName.trim()) errors.firstName = t('placeorder_validation_required');
    if (!formData.lastName.trim()) errors.lastName = t('placeorder_validation_required');
    if (!formData.email.trim()) errors.email = t('placeorder_validation_required');
    else if (!emailRegex.test(formData.email)) errors.email = t('placeorder_validation_email');
    if (!formData.street.trim()) errors.street = t('placeorder_validation_required');
    if (!formData.city.trim()) errors.city = t('placeorder_validation_required');
    if (!formData.state.trim()) errors.state = t('placeorder_validation_required');
    if (!formData.zipcode.trim()) errors.zipcode = t('placeorder_validation_required');
    if (!formData.country.trim()) errors.country = t('placeorder_validation_required');
    if (!formData.phone.trim()) errors.phone = t('placeorder_validation_required');
    else if (!phoneRegex.test(formData.phone)) errors.phone = t('placeorder_validation_phone');

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, t]);

  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formErrors]);

  // Order items memoized
  const orderItems = useMemo(() => {
    const items = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          const product = products.find(p => p._id === productId);
          if (product) {
            items.push({
              name: product.name,
              price: product.price,
              size,
              quantity: qty,
              image: product.image?.[0]
            });
          }
        }
      }
    }
    return items;
  }, [cartItems, products]);

  const isCartEmpty = orderItems.length === 0;

  // Prevent multiple empty cart toasts
  useEffect(() => {
    if (isCartEmpty && !hasCheckedCart.current) {
      hasCheckedCart.current = true;
      toast.error(t('placeorder_empty_cart'));
      navigate('/cart');
    }
  }, [isCartEmpty, navigate, t]);

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const total = getCartAmount() + delivery_fee;

    let msg = `*New Order - ${paymentMethod.toUpperCase()}*%0A%0A`;
    msg += `*Customer:* ${formData.firstName} ${formData.lastName}%0A`;
    msg += `Email: ${formData.email}%0A`;
    msg += `Phone: ${formData.phone}%0A%0A`;

    msg += `*Address:*%0A${formData.street}, ${formData.city}%0A${formData.state}, ${formData.zipcode}%0A${formData.country}%0A%0A`;

    msg += `*Items:*%0A`;
    orderItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} (Size: ${item.size}) × ${item.quantity} = ${currency}${item.price * item.quantity}%0A`;
    });

    msg += `%0A*Subtotal:* ${currency}${getCartAmount()}%0A`;
    msg += `*Delivery:* ${currency}${delivery_fee}%0A`;
    msg += `*Total:* ${currency}${total}%0A%0A`;

    msg += `Payment: *${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'stripe' ? 'Paid Online (Stripe)' : 'Confirm via WhatsApp'}*`;

    return msg;
  };

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (isCartEmpty || isSubmitting) return;

      if (!validateForm()) {
        toast.error(t('placeorder_fix_errors'));
        return;
      }

      setIsSubmitting(true);

      try {
        const totalAmount = getCartAmount() + delivery_fee;

        if (paymentMethod === 'whatsapp') {
          const message = generateWhatsAppMessage();
          const whatsappUrl = `https://wa.me/919946466499?text=${message}`; // CHANGE THIS NUMBER

          setCartItems({});
          localStorage.removeItem('placeOrderFormData');
          toast.success(t('placeorder_success_whatsapp'));
          window.open(whatsappUrl, '_blank');
          navigate('/orders');
        }

        else if (paymentMethod === 'cod') {
          const orderData = {
            address: formData,
            items: orderItems,
            amount: totalAmount,
            paymentMethod: 'cod',
            payment: false // Not paid yet
          };

          const response = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: { token }
          });

          if (response.data.success) {
            setCartItems({});
            localStorage.removeItem('placeOrderFormData');
            toast.success(t('placeorder_cod_success'));
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
        }

        else if (paymentMethod === 'stripe') {
          const orderData = {
            address: formData,
            items: orderItems,
            amount: totalAmount
          };

          const response = await axios.post(backendUrl + '/api/order/stripe', orderData, {
            headers: { token }
          });

          if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url); // Redirect to Stripe Checkout
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error(t('placeorder_error_generic'));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, paymentMethod, orderItems, getCartAmount, delivery_fee, currency, isCartEmpty, isSubmitting, validateForm, setCartItems, navigate, backendUrl, token, t]
  );

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t" noValidate>
      {/* Delivery Form */}
      <div className="flex flex-col gap-5 w-full sm:max-w-[500px]">
        <div className="text-2xl">
          <Title text1={t('placeorder_delivery')} text2={t('placeorder_information')} />
        </div>

        {/* Form fields same as before - kept clean */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder={t('placeorder_first_name')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`} required />
            {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
          </div>
          <div>
            <input name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder={t('placeorder_last_name')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`} required />
            {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
          </div>
        </div>

        <input name="email" type="email" value={formData.email} onChange={onChangeHandler} placeholder={t('placeorder_email')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} required />
        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}

        <input name="street" value={formData.street} onChange={onChangeHandler} placeholder={t('placeorder_street')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.street ? 'border-red-500' : 'border-gray-300'}`} required />
        {formErrors.street && <p className="text-red-500 text-xs mt-1">{formErrors.street}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input name="city" value={formData.city} onChange={onChangeHandler} placeholder={t('placeorder_city')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`} required />
            {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
          </div>
          <div>
            <input name="state" value={formData.state} onChange={onChangeHandler} placeholder={t('placeorder_state')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.state ? 'border-red-500' : 'border-gray-300'}`} required />
            {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input name="zipcode" value={formData.zipcode} onChange={onChangeHandler} placeholder={t('placeorder_zipcode')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.zipcode ? 'border-red-500' : 'border-gray-300'}`} required />
            {formErrors.zipcode && <p className="text-red-500 text-xs mt-1">{formErrors.zipcode}</p>}
          </div>
          <div>
            <input name="country" value={formData.country} onChange={onChangeHandler} placeholder={t('placeorder_country')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.country ? 'border-red-500' : 'border-gray-300'}`} required />
            {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
          </div>
        </div>

        <input name="phone" type="tel" value={formData.phone} onChange={onChangeHandler} placeholder={t('placeorder_phone')} className={`w-full px-4 py-2 border rounded-md focus:border-black ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`} required />
        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
      </div>

      {/* Right Side: Summary + Payment Options */}
      <div className="mt-8 w-full">
        <div className="min-w-full sm:min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={t('placeorder_payment')} text2={t('placeorder_method')} />

          <div className="mt-6 space-y-4">
            {/* WhatsApp */}
            <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'whatsapp' ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
              <input type="radio" name="payment" value="whatsapp" checked={paymentMethod === 'whatsapp'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">{t('placeorder_whatsapp_title')}</p>
                <p className="text-sm text-gray-600">{t('placeorder_whatsapp_desc')}</p>
              </div>
            </label>

            {/* Stripe */}
            <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
              <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">{t('placeorder_stripe_title')}</p>
                <p className="text-sm text-gray-600">{t('placeorder_stripe_desc')}</p>
              </div>
              <img src={assets.stripe_logo} alt="Stripe" className="h-8" />
            </label>

            {/* COD */}
            <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-orange-600 bg-orange-50' : 'border-gray-300 hover:border-gray-400'}`}>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-medium">{t('placeorder_cod_title')}</p>
                <p className="text-sm text-gray-600">{t('placeorder_cod_desc')}</p>
              </div>
            </label>
          </div>

          <div className="mt-8 text-end">
            <p className="text-sm text-gray-600 mb-6">
              {t('placeorder_agree_terms')}{' '}
              <a href="/terms" className="text-blue-600 hover:underline">{t('placeorder_terms')}</a>{' '}
              {t('placeorder_and')}{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">{t('placeorder_privacy')}</a>.
            </p>

            <button
              type="submit"
              disabled={isSubmitting || isCartEmpty}
              className={`px-16 py-4 text-white font-medium rounded-md min-w-[220px] transition-all ${
                isSubmitting || isCartEmpty
                  ? 'bg-gray-400 cursor-not-allowed'
                  : paymentMethod === 'whatsapp' ? 'bg-green-600 hover:bg-green-700'
                  : paymentMethod === 'stripe' ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {isSubmitting ? t('placeorder_processing') : t(`placeorder_button_${paymentMethod}`)}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;