import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// fetch cart items
export const fetchcartitems = createAsyncThunk("fetchcartitems", async () => {
  const response = await fetch(`http://localhost:5000/cart/fetchcartitems`);
  return response.json();
});

// add cart items
export const additemtocart = createAsyncThunk(
  "additemtocart",
  async (product) => {
    const response = await fetch(
      `http://localhost:5000/cart/additemtocart/${product._id}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return response.json();
  }
);

// delete item form cart
export const deletecartitem = createAsyncThunk(
  "deletecartitem",
  async (itemId) => {
    const response = await fetch(
      `http://localhost:5000/cart/removecartitem/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    // const data = await response.json();
    return response.json();
  }
);

//update cart items by quantity increase
export const updatecartitemquantityincrease = createAsyncThunk(
  "updatecartitemquantityincrease",
  async (cartItem) => {
    const response = await fetch(
      `http://localhost:5000/cart/updateitembyquantityincrease/${cartItem._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      }
    );
    // const data = await response.json();
    return response.json();
  }
);

//update cart items by quantity decrease
export const updatecartitemquantitydecrease = createAsyncThunk(
  "updatecartitemquantitydecrease",
  async (cartItem) => {
    const response = await fetch(
      `http://localhost:5000/cart/updateitembyquantitydecrease/${cartItem._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      }
    );
    return response.json();
  }
);

//update cart items by size
export const updateCartItemSize = createAsyncThunk("updateCartItemSize", async (updatedCartItem) => {
  const response = await fetch(`http://localhost:5000/cart/updateitembysize/${updatedCartItem._id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(updatedCartItem)
  });
  return response.json();
});

const initialState = {
  cartItems: [],
  loading: false,
  isError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchcartitems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchcartitems.fulfilled, (state, action) => {
      state.loading = false;
      // state.entities.push(action.payload)
      state.cartItems = action.payload;
    });
    builder.addCase(fetchcartitems.rejected, (state, action) => {
      state.isError = true;
    });

    builder.addCase(additemtocart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(additemtocart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems.push(action.payload);
    });
    builder.addCase(additemtocart.rejected, (state, action) => {
      state.isError = true;
    });

    builder.addCase(updatecartitemquantityincrease.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      updatecartitemquantityincrease.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems.forEach((element) => {
          if (element._id === action.payload._id) {
            element.quantity = action.payload.quantity;
            element.subtotal = action.payload.subtotal;
          }
        });
      }
    );
    builder.addCase(
      updatecartitemquantityincrease.rejected,
      (state, action) => {
        state.isError = true;
      }
    );


    builder.addCase(updatecartitemquantitydecrease.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      updatecartitemquantitydecrease.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems.forEach((element) => {
          if (element._id === action.payload._id) {
            element.quantity = action.payload.quantity;
            element.subtotal = action.payload.subtotal;
          }
        });
      }
    );
    builder.addCase(
      updatecartitemquantitydecrease.rejected,
      (state, action) => {
        state.isError = true;
      }
    );


    builder.addCase(deletecartitem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletecartitem.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
    });
    builder.addCase(deletecartitem.rejected, (state, action) => {
      state.isError = true;
    });


    builder.addCase(updateCartItemSize.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCartItemSize.fulfilled, (state, action) => {
      state.loading = false;
      
      state.cartItems = state.cartItems.filter(( cartItem ) => 
         !(cartItem.productId._id === action.payload.productId._id && cartItem.size === action.payload.size) 
      )

      for( var item of state.cartItems) {
        if(item._id === action.payload._id){
          item.size = action.payload.size;
          break;
        }
      }
    });
    builder.addCase(updateCartItemSize.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default cartSlice.reducer;
