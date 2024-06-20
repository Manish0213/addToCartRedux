import React, { useEffect, useMemo } from 'react'
import '../components/CartItems.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchcartitems } from '../features/Cart/CartSlice';
import { updatecartitemquantityincrease } from '../features/Cart/CartSlice';
import { updatecartitemquantitydecrease } from '../features/Cart/CartSlice';
import { deletecartitem } from '../features/Cart/CartSlice';

const CartItems = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);

    useEffect( () => {
        dispatch(fetchcartitems());
    },[])

    const grandTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.subtotal, 0);
    }, [cartItems]);
   
  return (
    <div class="cart-items">
        {
            cartItems && cartItems.map((cartItem) => (
                <div class="cart-item">
                <img src={`http://localhost:5000/uploads/${cartItem.productId.image}`} alt="Product Image"/>
                <div class="cart-item-info">
                    <div class="cart-item-title">{cartItem.productId.title}</div>
                    <div class="cart-item-price">${cartItem.productId.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-modify" data-action="decrement" onClick={() => dispatch(updatecartitemquantitydecrease(cartItem))} disabled={cartItem.quantity <= 1}>-</button>
                        <input class="quantity-input" type="number" value={cartItem.quantity} min="1"/>
                        <button class="quantity-modify" data-action="increment" onClick={() => dispatch(updatecartitemquantityincrease(cartItem))}>+</button>
                    </div>
                    <div class="cart-item-subtotal">Subtotal: ${cartItem.subtotal}</div>
                </div>
                <div class="cart-item-remove" onClick={() => dispatch(deletecartitem(cartItem._id))}>Remove</div>
            </div>
            ))
        }
        <div className="cart-grand-total">Grand Total: ${grandTotal}</div>
        </div>
  )
}

export default CartItems
