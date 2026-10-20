import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
    try {
        const item = localStorage.getItem('cartItems');
        const parsed = item ? JSON.parse(item) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
};

const initialState = {
    cartItems: getInitialCart(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            if (!item) return;
            const itemId = item._id || item.id || item.productId;
            if (!itemId) return;
            const qty = item.quantity || item.qty || 1;
            const existingItem = state.cartItems.find((x) => (x._id || x.id || x.productId) === itemId);
            if (existingItem) {
                const currentQty = existingItem.quantity || existingItem.qty || 1;
                existingItem.quantity = currentQty + qty;
                existingItem.qty = existingItem.quantity;
            } else {
                state.cartItems.push({
                    ...item,
                    _id: itemId,
                    id: itemId,
                    productId: itemId,
                    quantity: qty,
                    qty: qty
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload || {};
            if (!id) return;
            const itemIndex = state.cartItems.findIndex((x) => (x._id || x.id || x.productId) === id);
            if (itemIndex !== -1) {
                if (quantity <= 0) {
                    state.cartItems.splice(itemIndex, 1);
                } else {
                    state.cartItems[itemIndex].quantity = quantity;
                    state.cartItems[itemIndex].qty = quantity;
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((x) => (x._id || x.id || x.productId) !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        }
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


