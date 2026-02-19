import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { ORDER_URL } from "@/const";

const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
const selectCartItems = (state) => state.cart.cartItems
const selectGoodsList = (state) => state.goods.goodsList

export const sendOrder = createAsyncThunk(
    'cart/sendOrder',
    async (data) => {
        const url = new URL(ORDER_URL)
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return await response.json()
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems,
        countItems: cartItems.length,
        orderStatus: 'idle',
        order: {},
        error: null
    },
    reducers: {
        addToCart(state, action) {
            const { id, color, size, count } = action.payload
            const item = state.cartItems.find(
                item => item.id === id && item.color === color && item.size === size
            )
            if (item) {
                item.count = count
            } else {
                state.cartItems.push({ id, color, size, count })
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
            state.countItems = state.cartItems.length
        },
        removeFromCart(state, action) {
            const { id, color, size } = action.payload
            const itemIndex = state.cartItems.findIndex(
                item => item.id === id && item.color === color && item.size === size
            )
            if (itemIndex !== -1) {
                state.cartItems.splice(itemIndex, 1)
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
            state.countItems = state.cartItems.length
        },
        clearCart(state) {
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
            state.countItems = state.cartItems.length
            state.orderStatus = 'idle'
            state.order = {}
        },
        resetOrderStatus(state) {
            state.orderStatus = 'idle';
            state.order = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrder.pending, (state) => {
                state.orderStatus = 'loading'
                state.order = {}
                state.error = null
            })
            .addCase(sendOrder.fulfilled, (state, action) => {
                state.orderStatus = 'succeeded'
                state.order = action.payload
                state.error = null
                state.cartItems = []
                state.countItems = 0
                localStorage.removeItem('cart')
            })
            .addCase(sendOrder.rejected, (state, action) => {
                state.orderStatus = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectCartIds = createSelector(
    [selectCartItems],
    (items) => items.map(item => item.id)
)
export const selectTotalPrice = createSelector(
    [selectCartItems, selectGoodsList],
    (cartItems, goodsList) => {
        return cartItems.reduce((sum, item) => {
            const product = goodsList?.find(p => p.id === item.id);
            return product ? sum + product.price * item.count : sum;
        }, 0);
    }
)

export const { addToCart, removeFromCart, clearCart, resetOrderStatus } = cartSlice.actions
export default cartSlice.reducer