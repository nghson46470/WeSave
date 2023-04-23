import { AsyncThunkAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cartApi } from '~/api'

const initialState = { id: null, total: 0, subTotal: 0, products: [], loading: false }

interface IProductItem {
    thumbnail_url?: string
    name?: string
    price?: number
    id: number
    amount: number
}

interface IProduct {
    id: any
    products: object
}

export const getUnpaidCart = createAsyncThunk('cart/getUnpaidCart', async (body, { rejectWithValue }) => {
    try {
        const res = await cartApi.getUnpaidCart()
        return res?.data
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const updateUnpaidCart = createAsyncThunk(
    'cart/updateUnpaidCart',
    async ({ id, products }: IProduct, { rejectWithValue }) => {
        try {
            const res = await cartApi.update(id, products)
            return res?.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        deleteProduct: (state, action) => {
            const id = action.payload
            state.products = state.products.filter((product: { id: number | string }) => product.id !== id)
        },
        increment: (state: { products: Array<IProductItem> }, action) => {
            const id = action.payload
            state.products = state.products.map((product: IProductItem) => {
                let amount = product.amount
                if (product.id === id) {
                    if (amount === 20) {
                        amount = 19
                    }
                    return {
                        ...product,
                        amount: amount + 1,
                    }
                } else {
                    return product
                }
            })
        },
        changeValue: (state: { products: Array<IProductItem> }, action) => {
            const id = action.payload.id
            const value = action.payload.value
            state.products = state.products.map((product: IProductItem) => {
                if (product.id === id) {
                    return {
                        ...product,
                        amount: value,
                    }
                } else {
                    return product
                }
            })
        },
        decrement: (state: { products: Array<IProductItem> }, action) => {
            const id = action.payload
            state.products = state.products.map((product: IProductItem) => {
                let amount = product.amount
                if (product.id === id) {
                    if (amount <= 1) {
                        amount = 2
                    }
                    return {
                        ...product,
                        amount: amount - 1,
                    }
                } else {
                    return product
                }
            })
        },
        clearCart: (state) => {
            state.id = null
            state.products = []
            state.subTotal = 0
            state.total = 0
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUnpaidCart.pending, (state, action) => {
            state.loading = true
            // state.products = []
            state.total = 0
            state.subTotal = 0
            state.id = null
        })
        builder.addCase(getUnpaidCart.fulfilled, (state, action) => {
            const payload = action.payload
            state.products = payload.products
            state.total = payload.total
            state.subTotal = payload.sub_total
            state.loading = false
            state.id = payload.id
        })
        builder.addCase(getUnpaidCart.rejected, (state) => {
            state.id = null
            state.total = 0
            state.subTotal = 0
            state.products = []
            state.loading = false
        })
        builder.addCase(updateUnpaidCart.pending, (state, action) => {
            // state.loading = true;
        })
        builder.addCase(updateUnpaidCart.fulfilled, (state, action) => {
            const payload = action.payload
            state.id = payload.id
            state.total = payload.total
            state.subTotal = payload.sub_total
            // state.loading = false;
        })
        builder.addCase(updateUnpaidCart.rejected, (state, action) => {
            // state.loading = false;
        })
    },
})

const { deleteProduct, increment, decrement, clearCart, changeValue } = cartSlice.actions
export default cartSlice.reducer
export { deleteProduct, increment, clearCart, decrement, changeValue }
