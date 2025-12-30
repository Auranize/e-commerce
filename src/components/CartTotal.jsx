import { useContext, memo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useT } from '../hooks/useT'

const CartTotal = memo(() => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
    const t = useT()

  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={t('cart_cart')} text2={t('cart_totals_title')} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className='flex justify-between'>
                <p>{t('cart_subtotal')}</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>{t('cart_shipping_fee')}</p>
                <p>{t('cart_free_shipping')}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>{t('cart_total')}</b>
                <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
    </div>
  )
})

CartTotal.displayName = 'CartTotal'

export default CartTotal