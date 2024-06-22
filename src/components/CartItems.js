import React, { useEffect, useMemo,useState } from "react";
import "../components/CartItems.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchcartitems } from "../features/Cart/CartSlice";
import { updatecartitemquantityincrease, updatecartitemquantitydecrease, deletecartitem, updateCartItemSize } from "../features/Cart/CartSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    dispatch(fetchcartitems());
  }, []);

  useEffect(() => {
    if (selectedCartItem) {
      setSelectedSize(selectedCartItem.size);
    }
  }, [selectedCartItem]);

  const grandTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  }, [cartItems]);

  const handleSizeSelect = (event) => {
    setSelectedSize(event.target.value);

    // const newSize = e.target.value;
    // if (newSize !== selectedSize) {
    //   setSelectedSize(newSize);
    //   onSizeChange(newSize); // Notify parent component of the size change
    // }
  };

  const handleSizeUpdate = () => {
    if (selectedSize) {
        const updatedCartItem = {
          ...selectedCartItem,
          size: selectedSize,
        };
        setSelectedSize(null);
        // Dispatch action to update the cart item size if needed
        dispatch(updateCartItemSize(updatedCartItem));
      }
  }
  
  return (
    <>
      <div class="cart-items">
        {cartItems &&
          cartItems.map((cartItem) => (
            <div class="cart-item">
              <img
                src={`http://localhost:5000/uploads/${cartItem.productId.image}`}
                alt="Product Image"
              />
              <div class="cart-item-info">
                <div class="cart-item-title">{cartItem.productId.title}</div>
                <div class="cart-item-size">
                  Size: {cartItem.size}
                  <span 
                    className="dropdown-sign"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setSelectedCartItem(cartItem)}
                  >
                    ▼
                </span>
                </div>
                <div class="cart-item-price">${cartItem.productId.price}</div>
                <div class="cart-item-quantity">
                  <button
                    class="quantity-modify"
                    data-action="decrement"
                    onClick={() =>
                      dispatch(updatecartitemquantitydecrease(cartItem))
                    }
                    disabled={cartItem.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    class="quantity-input"
                    type="number"
                    value={cartItem.quantity}
                    min="1"
                  />
                  <button
                    class="quantity-modify"
                    data-action="increment"
                    onClick={() =>
                      dispatch(updatecartitemquantityincrease(cartItem))
                    }
                  >
                    +
                  </button>
                </div>
                <div class="cart-item-subtotal">
                  Subtotal: ${cartItem.subtotal}
                </div>
              </div>
              <div
                class="cart-item-remove"
                onClick={() => dispatch(deletecartitem(cartItem._id))}
              >
                Remove
              </div>
            </div>
          ))}
        <div className="cart-grand-total">Grand Total: ${grandTotal}</div>
      </div>



    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div className="size-selector">
          <div className="size-chart">
            <span>SELECT SIZE</span>
            <a href="#">SIZE CHART</a>
          </div>
          <div className="sizes">
          {selectedCartItem && selectedCartItem.productId.sizes.map((size) => (
              <React.Fragment key={size}>
                <input
                  type="radio"
                  id={`size${size}-${selectedCartItem.productId._id}`}
                  name={`size-${selectedCartItem.productId._id}`}
                  value={size}
                  checked={selectedSize === size}
                  onChange={handleSizeSelect}
                />
                <label htmlFor={`size${size}-${selectedCartItem.productId._id}`}>{size}</label>
              </React.Fragment>
            ))}
          </div>
        </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" onClick={handleSizeUpdate} data-bs-dismiss="modal">Update Size</button>
        </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default CartItems;
