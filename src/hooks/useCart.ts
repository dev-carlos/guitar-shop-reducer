import { useState, useEffect, useMemo } from "react";
import { CartItem, Guitar, GuitarId } from "../guitars.types";

export function useCart() {

    const memoryCart = localStorage.getItem('cart');
    const [cart, setCart] = useState<CartItem[]>(memoryCart ? JSON.parse(memoryCart) : []);
    const MIN_ITEMS = 1;

    const handleAddToCart = (guitar: Guitar) => {
        const indexExist = cart.findIndex(item => guitar.id === item.id);
        if (indexExist >= 0) {
            const newCart = [...cart];
            newCart[indexExist].quantity++
            setCart(newCart);
        }
        else {
            const newItem: CartItem = { ...guitar, quantity: 1 }
            setCart(prevCart => [...prevCart, newItem])
        }

    }

    const handleDeleteProduct = (id: GuitarId) => {
        const newCart = cart.filter(product => product.id !== id);
        setCart(newCart);
    }

    const handleIncrement = (id: GuitarId) => {
        const newCart = [...cart];
        newCart.map(product => {
            if (product.id === id) {
                product.quantity++;
            }
            return product;
        })
        setCart(newCart);
    }

    const handleDecrement = (id: GuitarId) => {
        const newCart = [...cart];
        newCart.map(product => {
            if (product.id === id && product.quantity > MIN_ITEMS) {
                product.quantity--;
            }
            return product
        })
        setCart(newCart)
    }

    const handleClearCart = () => {
        setCart([]);
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const total = useMemo(() => cart.reduce((acc, current) => acc + (current.price * current.quantity), 0), [cart]);
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    return {
        cart,
        handleAddToCart,
        handleClearCart,
        handleDecrement,
        handleIncrement,
        handleDeleteProduct,
        total,
        isEmpty
    }
}