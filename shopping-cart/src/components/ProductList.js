import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import products from '../data/products';

function ProductList() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // TODO 6: Dispatch addItem action with the product
    dispatch(addItem(product));
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-3">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted mt-auto mb-3">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;