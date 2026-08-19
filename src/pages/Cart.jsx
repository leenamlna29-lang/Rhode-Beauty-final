import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal, cartCount } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const shippingFee = cartTotal >= 50 ? 0 : 5.99;
  const orderTotal = cartTotal + shippingFee;

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <>
      <style>{`
        .cart-page { min-height: 100vh; background: #fafafa; }
        .cart-inner { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }
        .cart-title { font-size: clamp(28px, 4vw, 42px); font-weight: 900; letter-spacing: -1.5px; margin-bottom: 8px; }
        .cart-subtitle { color: #888; font-size: 14px; margin-bottom: 40px; }
        .cart-grid { display: grid; grid-template-columns: 1fr 340px; gap: 32px; }
        .cart-items { display: flex; flex-direction: column; gap: 16px; }
        .cart-item { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 20px; display: flex; gap: 16px; align-items: center; transition: box-shadow 0.2s; }
        .cart-item:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
        .cart-item-img { width: 90px; height: 90px; border-radius: 10px; object-fit: cover; flex-shrink: 0; background: #f5f0eb; }
        .cart-item-info { flex: 1; }
        .cart-item-name { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
        .cart-item-desc { font-size: 12px; color: #aaa; margin-bottom: 10px; }
        .cart-item-price { font-size: 16px; font-weight: 800; color: #1a1a1a; }
        .qty-control { display: flex; align-items: center; gap: 0; border: 1.5px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .qty-btn { width: 32px; height: 32px; background: none; border: none; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #1a1a1a; transition: background 0.15s; }
        .qty-btn:hover { background: #f5f5f5; }
        .qty-num { width: 36px; text-align: center; font-size: 14px; font-weight: 700; border-left: 1.5px solid #e5e7eb; border-right: 1.5px solid #e5e7eb; height: 32px; line-height: 32px; }
        .remove-btn { background: none; border: none; cursor: pointer; color: #ccc; font-size: 18px; padding: 4px 8px; transition: color 0.2s; }
        .remove-btn:hover { color: #e11d48; }
        .order-summary { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 28px; height: fit-content; position: sticky; top: 80px; }
        .summary-title { font-size: 18px; font-weight: 800; margin-bottom: 24px; }
        .summary-row { display: flex; justify-content: space-between; font-size: 14px; color: #666; margin-bottom: 12px; }
        .summary-row.total { font-size: 17px; font-weight: 800; color: #1a1a1a; border-top: 1.5px solid #f0f0f0; padding-top: 14px; margin-top: 6px; }
        .free-ship { color: #059669; font-size: 12px; font-weight: 600; }
        .checkout-btn { width: 100%; background: #1a1a1a; color: #fff; border: none; padding: 15px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; border-radius: 10px; margin-top: 20px; transition: background 0.2s; }
        .checkout-btn:hover { background: #ec4899; }
        .empty-cart { text-align: center; padding: 80px 20px; }
        .empty-icon { font-size: 64px; margin-bottom: 20px; }
        .empty-title { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
        .empty-sub { color: #888; margin-bottom: 32px; }
        .shop-link { display: inline-block; background: #1a1a1a; color: #fff; padding: 13px 32px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: background 0.2s; }
        .shop-link:hover { background: #ec4899; }
        .free-ship-banner { background: linear-gradient(90deg,#fce7f3,#fdf6f0); border-radius: 10px; padding: 12px 16px; font-size: 12px; font-weight: 600; color: #be185d; margin-bottom: 20px; text-align: center; }
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr; }
          .order-summary { position: static; }
        }
      `}</style>

      <Header />
      <div className="cart-page">
        <div className="cart-inner">
          <h1 className="cart-title">Your Bag</h1>
          <p className="cart-subtitle">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛍️</div>
              <h2 className="empty-title">Your bag is empty</h2>
              <p className="empty-sub">Add your favourite Rhode products to get started.</p>
              <Link to="/skincare" className="shop-link">Start Shopping</Link>
            </div>
          ) : (
            <div className="cart-grid">
              {/* Items */}
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-desc">{item.desc}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <div className="qty-control">
                          <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                          <span className="qty-num">{item.qty}</span>
                          <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                        </div>
                        <span className="cart-item-price">
                          ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Remove">✕</button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-title">Order Summary</div>

                {cartTotal < 50 && (
                  <div className="free-ship-banner">
                    💅 Add ${(50 - cartTotal).toFixed(2)} more for FREE shipping!
                  </div>
                )}

                <div className="summary-row">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  {shippingFee === 0
                    ? <span className="free-ship">FREE ✓</span>
                    : <span>${shippingFee.toFixed(2)}</span>}
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  {currentUser ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>

                <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#aaa' }}>
                  🔒 Secure checkout · Free returns
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
