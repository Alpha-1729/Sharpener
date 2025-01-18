import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCT = [
  { id: 'p1', title: 'Product 1', price: 19.99, description: 'The first book I ever read' },
  { id: 'p2', title: 'Product 2', price: 29.99, description: 'The second book I ever read' },
  { id: 'p3', title: 'Product 3', price: 39.99, description: 'The third book I ever read' },

];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}

      </ul>
    </section>
  );
};

export default Products;
