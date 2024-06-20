import React from 'react'
import './Product.css'
import { useDispatch } from 'react-redux';
import { additemtocart } from '../features/Cart/CartSlice';

const Product = ({product}) => {
  const dispatch = useDispatch();
  return (
    <>
    <div class="product-card">
        <img src={`http://localhost:5000/uploads/${product.image}`} alt="Product Image"/>
        <div class="product-title">{product.title}</div>
        <div class="product-description">{product.description}</div>
        <div class="product-price">${product.price}</div>
        <div className="product-category">Category: {product.category}</div>
        <a href="#" class="add-to-cart" onClick={() => dispatch(additemtocart(product))}>Add to Cart</a>
    </div>
    </>
  )
}

export default Product

