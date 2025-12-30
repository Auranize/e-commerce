import React, { useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-hot-toast';
import { useT } from '../hooks/useT';

const PlaceOrder = () => {
  const t = useT();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const hasCheckedCart = useRef(false); // Prevent multiple cart checks/toasts

  const {
    navigate,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    currency
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

  // Save form data to localStorage (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('placeOrderFormData', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  // Validate form
  const validateForm = useCallback(() => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    const zipRegex = /^[\w\s\-]+$/;

    if (!formData.firstName.trim()) errors.firstName = t('placeorder_validation_required');
    if (!formData.lastName.trim()) errors.lastName = t('placeorder_validation_required');
    if (!formData.email.trim()) errors.email = t('placeorder_validation_required');
    else if (!emailRegex.test(formData.email)) errors.email = t('placeorder_validation_email');
    if (!formData.street.trim()) errors.street = t('placeorder_validation_required');
    if (!formData.city.trim()) errors.city = t('placeorder_validation_required');
    if (!formData.state.trim()) errors.state = t('placeorder_validation_required');
    if (!formData.zipcode.trim()) errors.zipcode = t('placeorder_validation_required');
    else if (!zipRegex.test(formData.zipcode)) errors.zipcode = t('placeorder_validation_zipcode');
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

  // Calculate order items once
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

  // Handle empty cart - only once
  useEffect(() => {
    if (isCartEmpty && !hasCheckedCart.current) {
      hasCheckedCart.current = true;
      toast.error(t('placeorder_empty_cart'));
      navigate('/cart');
    }
  }, [isCartEmpty, navigate, t]);

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const totalAmount = getCartAmount() + delivery_fee;

    let message = `*New Order Received*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.firstName} ${formData.lastName}%0A`;
    message += `Email: ${formData.email}%0A`;
    message += `Phone: ${formData.phone}%0A%0A`;

    message += `*Delivery Address:*%0A`;
    message += `${formData.street}, ${formData.city}%0A`;
    message += `${formData.state}, ${formData.zipcode}%0A`;
    message += `${formData.country}%0A%0A`;

    message += `*Order Items:*%0A`;
    orderItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}%0A`;
      message += `   Size: ${item.size} | Qty: ${item.quantity} | Price: ${currency}${item.price}%0A%0A`;
    });

    message += `*Order Summary:*%0A`;
    message += `Subtotal: ${currency}${getCartAmount()}%0A`;
    message += `Delivery Fee: ${currency}${delivery_fee}%0A`;
    message += `*Total: ${currency}${totalAmount}*%0A%0A`;

    message += `Thank you for the order!`;

    return message;
  };

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (isCartEmpty) return;
      if (isSubmitting) return;

      if (!validateForm()) {
        toast.error(t('placeorder_fix_errors'));
        return;
      }

      setIsSubmitting(true);

      try {
        const whatsappMessage = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/9744676504?text=${whatsappMessage}`; // Replace with your admin number

        // Clear cart & saved form
        setCartItems({});
        localStorage.removeItem('placeOrderFormData');

        toast.success(t('placeorder_success_whatsapp'));
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        // Redirect to orders page
        navigate('/orders');
      } catch (error) {
        console.error(error);
        toast.error(t('placeorder_error_generic'));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, orderItems, getCartAmount, delivery_fee, currency, isCartEmpty, isSubmitting, validateForm, setCartItems, navigate, t]
  );

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t"
      noValidate
    >
      {/* Left: Delivery Form */}
      <div className="flex flex-col gap-5 w-full sm:max-w-[500px]">
        <div className="text-2xl">
          <Title text1={t('placeorder_delivery')} text2={t('placeorder_information')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder={t('placeorder_first_name')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
                formErrors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
          </div>

          <div>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder={t('placeorder_last_name')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
                formErrors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
          </div>
        </div>

        <div>
          <input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder={t('placeorder_email')}
            type="email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>

        <div>
          <input
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder={t('placeorder_street')}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
              formErrors.street ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {formErrors.street && <p className="text-red-500 text-xs mt-1">{formErrors.street}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder={t('placeorder_city')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
                formErrors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
          </div>

          <div>
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder={t('placeorder_state')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
                formErrors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              placeholder={t('placeorder_zipcode')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
                formErrors.zipcode ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formErrors.zipcode && <p className="text-red-500 text-xs mt-1">{formErrors.zipcode}</p>}
          </div>

          <div>
            <input
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder={t('placeorder_country')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
                formErrors.country ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
          </div>
        </div>

        <div>
          <input
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder={t('placeorder_phone')}
            type="tel"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black transition ${
              formErrors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="mt-8 w-full">
        <div className="min-w-full sm:min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={t('placeorder_payment')} text2={t('placeorder_method')} />

          <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <p className="font-medium text-green-800">{t('placeorder_whatsapp_title')}</p>
                <p className="text-sm text-green-700">{t('placeorder_whatsapp_desc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-end">
            <p className="text-sm text-gray-600 mb-6">
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
              type="submit"
              disabled={isSubmitting || isCartEmpty}
              className={`px-16 py-4 text-white font-medium rounded-md transition-all min-w-[200px] ${
                isSubmitting || isCartEmpty
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              }`}
            >
              {isSubmitting ? t('placeorder_processing') : t('placeorder_send_whatsapp')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;