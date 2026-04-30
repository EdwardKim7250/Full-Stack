import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import CartItem from './CartItem';

function Cart() {
  const dispatch = useDispatch();
  
  // TODO 8: Use useSelector to get items from the cart state
  const items = useSelector((state) => state.cart.items);
  // TODO 9: Use useSelector to get totalQuantity from the cart state
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleClearCart = () => {
    // TODO 10: Dispatch clearCart action
    dispatch(clearCart());
  };

  // TODO 11: Calculate total price (price * quantity for each item)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Cart ({totalQuantity} items)</h2>
      </div>
      <div className="card-body">
        {items.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li key={item.id} className="list-group-item">
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
              <button className="btn btn-danger" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;