import { CartItem, Guitar, GuitarId } from "../guitars.types"
import { db } from '../db-guitars'

export type CartActions =
    {
        type: 'add-to-cart',
        payload: { item: Guitar }
    } |
    {
        type: 'remove-from-cart',
        payload: { id: GuitarId }
    } |
    {
        type: 'decrease-quantity',
        payload: { id: GuitarId }
    } |
    {
        type: 'increase-quantity',
        payload: { id: GuitarId }
    } |
    {
        type: 'clear-cart'
    }

export type CartState = {
    data: Guitar[],
    cart: CartItem[]
}
const initialCart = () => {
    const localData = localStorage.getItem('cart')
    return localData ? JSON.parse(localData) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

const MIN_ITEMS = 1;

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === 'add-to-cart') {
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updatedCart: CartItem[] = []
        if (itemExists) { // item exists in the cart
            updatedCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {

                    return { ...item, quantity: item.quantity + 1 }

                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updatedCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'remove-from-cart') {
        const newCart = state.cart.filter(product => product.id !== action.payload.id);
        return {
            ...state,
            cart: newCart
        }
    }
    if (action.type === 'increase-quantity') {
        const newCart =
            state.cart.map(product => {
                if (product.id === action.payload.id) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            })
        return {
            ...state,
            cart: newCart
        }
    }
    if (action.type === 'decrease-quantity') {
        const newCart =
            state.cart.map(product => {
                if (product.id === action.payload.id && product.quantity > MIN_ITEMS) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            })
        return {
            ...state,
            cart: newCart
        }
    }
    if (action.type === 'clear-cart') {

        return {
            ...state,
            cart: []
        }
    }
    return state;
}