import React, { useEffect } from 'react'
import Product from './Product'
import './ProductList.css'
import { useSelector,useDispatch } from 'react-redux';
import { fetchproducts } from '../features/Product/ProductSlice';

const ProductList = () => {
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchproducts());
    }, []);

  return (
    <div className='product-list'>
        {
            products.map((product) => (
                <Product product={product}/>
            ))
        }
    </div>
  )
}

export default ProductList
