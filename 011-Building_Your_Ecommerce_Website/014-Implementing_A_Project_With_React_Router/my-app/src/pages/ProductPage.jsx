import React, { useState } from "react";
import ProductList from "../components/ProductList";
import StoreNavBar from "../components/StoreNavBar";
import CartModal from "../components/CartModal";
import CartProvider from "../store/CartProvider";
import FooterContent from '../components/Footer/FooterContent';

const products = [
    {
        id: 1,
        title: 'Colors',
        price: 100,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
        description: 'A beautiful collection of vibrant colors to brighten up your day.',
        images: [
            'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
            'https://prasadyash2411.github.io/ecom-website/img/Album%202.png'
        ]
    },
    {
        id: 2,
        title: 'Black and white Colors',
        price: 50,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
        description: 'Classic black and white shades for a timeless appeal.',
        images: [
            'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
            'https://prasadyash2411.github.io/ecom-website/img/Album%203.png'
        ]
    },
    {
        id: 3,
        title: 'Yellow and Black Colors',
        price: 70,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
        description: 'Dynamic yellow and black tones for a bold statement.',
        images: [
            'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
            'https://prasadyash2411.github.io/ecom-website/img/Album%204.png'
        ]
    },
    {
        id: 4,
        title: 'Blue Color',
        price: 100,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
        description: 'Cool blue hues for a calming and serene effect.',
        images: [
            'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
            'https://prasadyash2411.github.io/ecom-website/img/Album%201.png'
        ]
    }
];

function ProductPage() {

    const [showCartModal, setShowCartModal] = useState(false);

    const handleCartClose = () => setShowCartModal(false);
    const handleCartShow = () => setShowCartModal(true);

    return (
        <>
            <StoreNavBar handleCartShow={handleCartShow} />
            <ProductList products={products} />
            <CartModal handleCartClose={handleCartClose} showCartModal={showCartModal} />
            <FooterContent />
        </>

    );
}

export default ProductPage;

