import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';
import { useT } from '../hooks/useT'; // Import the translation hook

const Cart = () => {
  const t = useT(); // Translation function
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='border-t pt-14 px-4 sm:px-8'>
      <div className="text-3xl font-semibold mb-6">
        <Title text1={t('cart_your')} text2={t('cart_cart')} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">{t('cart_empty')}</p>
          <button
            onClick={() => navigate('/collection')}
            className="mt-6 bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
          >
            {t('cart_continue_shopping')}
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartData.map((item, index) => {
              const productData = products.find(product => product._id === item._id);
              if (!productData) return null;

              const displayName = productData.name.length > 40
                ? productData.name.slice(0, 40) + '...'
                : productData.name;

              const productImage = productData.image?.[0] || assets.placeholder_img;

              return (
                <div
                  key={index}
                  className='bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4'
                >
                  <Link
                    to={`/product/${item._id}`}
                    className='flex items-center gap-4 sm:gap-6 w-full sm:w-[60%] hover:opacity-90 transition-all'
                  >
                    <img className='w-20 h-20 object-cover rounded-md' src={productImage} alt={productData.name} />
                    <div className='flex flex-col'>
                      <p className='text-sm sm:text-lg font-medium text-gray-800'>{displayName}</p>
                      <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 py-1 border border-gray-300 rounded bg-gray-100 text-xs sm:text-sm'>
                          {t('cart_size')}: {item.size}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className='flex items-center gap-4'>
                    <input
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!val || val < 1) return;
                        updateQuantity(item._id, item.size, val);
                      }}
                      className='border rounded w-14 sm:w-20 px-2 py-1 text-center text-sm'
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />
                    <img
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className='w-5 cursor-pointer hover:scale-110 transition-transform'
                      src={assets.bin_icon}
                      alt={t('cart_remove_item')}
                      title={t('cart_remove_item')}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className='flex justify-end my-16'>
            <div className="w-full sm:w-[400px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate('/place-order')}
                  className='bg-black text-white text-sm font-medium tracking-wide mt-6 px-8 py-3 rounded hover:bg-gray-900 transition-colors'
                >
                  {t('cart_proceed_to_checkout')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;