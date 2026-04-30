import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    // TODO 13: Dispatch updateQuantity to increase by 1
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    // TODO 14: Dispatch updateQuantity to decrease by 1
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = () => {
    // TODO 15: Dispatch removeItem with the item's id
    dispatch(removeItem(item.id));
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <p className="mb-0 fw-semibold">{item.name}</p>
        <small className="text-muted">${(item.price * item.quantity).toFixed(2)}</small>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-sm btn-secondary" onClick={handleDecrease}>−</button>
        <span>{item.quantity}</span>
        <button className="btn btn-sm btn-secondary" onClick={handleIncrease}>+</button>
        <button className="btn btn-sm btn-danger" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;