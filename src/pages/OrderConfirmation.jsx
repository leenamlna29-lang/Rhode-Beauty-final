import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.orderId) {
    navigate('/');
    return null;
  }

  const { orderId, orderData } = state;

  return (
    <>
      <style>{`
        .confirm-page { min-height: 100vh; background: linear-gradient(135deg,#fdf6f0 0%,#fce8e8 50%,#f5eaf8 100%); display: flex; align-items: center; justify-content: center; padding: 40px 24px; }
        .confirm-card { background: #fff; border-radius: 24px; padding: 48px 40px; max-width: 600px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.10); text-align: center; }
        .confirm-icon { font-size: 64px; margin-bottom: 16px; animation: pop 0.5s ease; }
        @keyframes pop { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .confirm-title { font-size: 32px; font-weight: 900; letter-spacing: -1px; color: #1a1a1a; margin-bottom: 8px; }
        .confirm-sub { font-size: 15px; color: #888; margin-bottom: 32px; line-height: 1.6; }
        .order-id-box { background: #f5f5f5; border-radius: 12px; padding: 14px 20px; display: inline-block; margin-bottom: 32px; }
        .order-id-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #aaa; margin-bottom: 4px; }
        .order-id-val { font-size: 14px; font-weight: 700; color: #1a1a1a; font-family: monospace; }
        .items-list { text-align: left; border: 1px solid #f0f0f0; border-radius: 14px; overflow: hidden; margin-bottom: 28px; }
        .items-header { background: #fafafa; padding: 12px 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #aaa; }
        .order-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-top: 1px solid #f5f5f5; }
        .order-item-left { display: flex; align-items: center; gap: 12px; }
        .order-item-img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; background: #f5f0eb; }
        .order-item-name { font-size: 13px; font-weight: 700; }
        .order-item-qty { font-size: 11px; color: #aaa; }
        .order-item-price { font-size: 13px; font-weight: 700; }
        .total-row { display: flex; justify-content: space-between; padding: 16px 20px; border-top: 1.5px solid #1a1a1a; font-size: 16px; font-weight: 800; }
        .action-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { display: inline-block; background: #1a1a1a; color: #fff; padding: 13px 28px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; border-radius: 10px; transition: background 0.2s; }
        .btn-primary:hover { background: #ec4899; }
        .btn-outline { display: inline-block; background: transparent; color: #1a1a1a; padding: 13px 28px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; border-radius: 10px; border: 2px solid #1a1a1a; transition: all 0.2s; }
        .btn-outline:hover { background: #1a1a1a; color: #fff; }
        .shipping-info { text-align: left; background: #fdf6f0; border-radius: 14px; padding: 16px 20px; margin-bottom: 28px; }
        .shipping-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #ec4899; margin-bottom: 6px; }
        .shipping-val { font-size: 13px; color: #555; line-height: 1.7; font-weight: 600; }
        @media (max-width: 480px) { .confirm-card { padding: 32px 20px; } }
      `}</style>

      <div className="confirm-page">
        <div className="confirm-card">
          <div className="confirm-icon">🎉</div>
          <h1 className="confirm-title">Order Confirmed!</h1>
          <p className="confirm-sub">
            Thank you, <strong>{orderData.shipping?.fullName}</strong>! Your Rhode Beauty order is on its way. You'll receive a confirmation at <strong>{orderData.userEmail}</strong>.
          </p>

          <div className="order-id-box">
            <div className="order-id-label">Order ID</div>
            <div className="order-id-val">#{orderId.slice(0, 12).toUpperCase()}</div>
          </div>

          {/* Shipping info */}
          <div className="shipping-info">
            <div className="shipping-label">Shipping To</div>
            <div className="shipping-val">
              {orderData.shipping?.fullName} · {orderData.shipping?.phone}<br />
              {orderData.shipping?.address}, {orderData.shipping?.city} {orderData.shipping?.state}<br />
              {orderData.shipping?.zip}, {orderData.shipping?.country}
            </div>
          </div>

          {/* Items */}
          <div className="items-list">
            <div className="items-header">Items Ordered</div>
            {orderData.items?.map((item, i) => (
              <div key={i} className="order-item">
                <div className="order-item-left">
                  <img src={item.img} alt={item.name} className="order-item-img" />
                  <div>
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-qty">Qty: {item.qty}</div>
                  </div>
                </div>
                <div className="order-item-price">
                  ${(parseFloat(item.price.replace('$','')) * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="total-row">
              <span>Total Paid</span>
              <span>${orderData.total?.toFixed(2)}</span>
            </div>
          </div>

          <div className="action-btns">
            <Link to="/dashboard" className="btn-primary">View My Orders</Link>
            <Link to="/" className="btn-outline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </>
  );
}
