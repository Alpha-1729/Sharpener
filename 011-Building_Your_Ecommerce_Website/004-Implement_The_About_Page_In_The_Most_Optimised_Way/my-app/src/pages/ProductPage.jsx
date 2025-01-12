import React, { useState } from "react";
import ProductList from "../components/ProductList";
import StoreNavBar from "../components/StoreNavBar";
import CartModal from "../components/CartModal";
import CartProvider from "../store/CartProvider";

const products = [
    { id: 1, title: 'Colors', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png' },
    { id: 2, title: 'Black and white Colors', price: 50, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png' },
    { id: 3, title: 'Yellow and Black Colors', price: 70, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png' },
    { id: 4, title: 'Blue Color', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png' }
];

function ProductPage() {

    const [showCartModal, setShowCartModal] = useState(false);

    const handleCartClose = () => setShowCartModal(false);
    const handleCartShow = () => setShowCartModal(true);

    return (
        <CartProvider>
            <StoreNavBar handleCartShow={handleCartShow} />
            <ProductList products={products} />
            <CartModal handleCartClose={handleCartClose} showCartModal={showCartModal} />
        </CartProvider>
    );
}

export default ProductPage;

