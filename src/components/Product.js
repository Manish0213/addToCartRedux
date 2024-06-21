import React, {useState} from 'react'
import './Product.css'
import { useDispatch } from 'react-redux';
import { additemtocart } from '../features/Cart/CartSlice';

const Product = ({product}) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const productWithSize = { ...product, size:selectedSize };
      dispatch(additemtocart(productWithSize));
    } else {
      alert('Please select a size.');
    }
  };

  return (
    <>
    <div class="product-card">
        <img src={`http://localhost:5000/uploads/${product.image}`} alt="Product Image"/>
        <div class="product-title">{product.title}</div>
        <div class="product-description">{product.description}</div>
        <div class="product-price">${product.price}</div>
        <div className="product-category">Category: {product.category}</div>

        <div className="size-selector">
          <div className="size-chart">
            <span>SELECT SIZE</span>
            <a href="#">SIZE CHART</a>
          </div>
          <div className="sizes" onChange={handleSizeSelect}>
          {product.sizes.map((size) => (
              <React.Fragment key={size}>
                <input
                  type="radio"
                  id={`size${size}-${product._id}`}
                  name={`size-${product._id}`}
                  value={size}
                />
                <label htmlFor={`size${size}-${product._id}`}>{size}</label>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <a href="#" class="add-to-cart" onClick={handleAddToCart}>Add to Cart</a>
    </div>
    </>
  )
}

export default Product




{/* <input type="radio" id={`sizeS-${product._id}`} name={`size-${product._id}`} value="S" />
            <label htmlFor={`sizeS-${product._id}`}>S</label>

            <input type="radio" id={`sizeM-${product._id}`} name={`size-${product._id}`} value="M" />
            <label htmlFor={`sizeM-${product._id}`}>M</label>

            <input type="radio" id={`sizeL-${product._id}`} name={`size-${product._id}`} value="L" />
            <label htmlFor={`sizeL-${product._id}`}>L</label>

            <input type="radio" id={`sizeXL-${product._id}`} name={`size-${product._id}`} value="XL" />
            <label htmlFor={`sizeXL-${product._id}`}>XL</label>

            <input type="radio" id={`sizeXXL-${product._id}`} name={`size-${product._id}`} value="XXL" />
            <label htmlFor={`sizeXXL-${product._id}`}>XXL</label>

            <input type="radio" id={`size3XL-${product._id}`} name={`size-${product._id}`} value="3XL" />
            <label htmlFor={`size3XL-${product._id}`}>3XL</label> */}

