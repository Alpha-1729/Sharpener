import React, { Fragment, useState } from "react";
import ProductList from "./components/ProductList";
import StoreNavBar from "./components/StoreNavBar";
import CartModal from "./components/CartModal";

const products = [
  { title: 'Colors', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png' },
  { title: 'Black and white Colors', price: 50, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png' },
  { title: 'Yellow and Black Colors', price: 70, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png' },
  { title: 'Blue Color', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png' }
]

function App() {
  const [showCartModal, setShowCartModal] = useState(false);

  const handleCartClose = () => setShowCartModal(false);
  const handleCartShow = () => setShowCartModal(true);

  return (
    <Fragment>
      <StoreNavBar handleCartShow={handleCartShow} />
      <ProductList products={products} />
      <CartModal handleCartClose={handleCartClose} showCartModal={showCartModal} />
    </Fragment>
  );
}

export default App;
