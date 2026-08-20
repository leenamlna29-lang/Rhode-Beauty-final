import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const STEPS = ['Shipping', 'Payment', 'Review'];

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '40px' }}>
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i <= current ? '#1a1a1a' : '#e5e7eb',
              color: i <= current ? '#fff' : '#aaa', fontWeight: '800', fontSize: '14px',
              transition: 'all 0.3s',
            }}>
              {i < current ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', color: i <= current ? '#1a1a1a' : '#bbb', textTransform: 'uppercase' }}>{step}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: '2px', background: i < current ? '#1a1a1a' : '#e5e7eb', margin: '0 8px', marginBottom: '20px', transition: 'background 0.3s' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shipping, setShipping] = useState({
    fullName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    address: '', city: '', state: '', zip: '', country: 'Cambodia', phone: '',
  });

  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const shippingFee = cartTotal >= 50 ? 0 : 5.99;
  const orderTotal = cartTotal + shippingFee;

  const handleShipNext = (e) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handlePayNext = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const orderData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || shipping.fullName,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          img: item.img,
          desc: item.desc,
        })),
        shipping: { ...shipping },
        paymentLast4: payment.cardNumber.replace(/\s/g, '').slice(-4),
        subtotal: parseFloat(cartTotal.toFixed(2)),
        shippingFee: parseFloat(shippingFee.toFixed(2)),
        total: parseFloat(orderTotal.toFixed(2)),
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      navigate('/order-confirmation', { state: { orderId: docRef.id, orderData } });
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb',
    borderRadius: '10px', fontSize: '14px', fontFamily: 'Inter, sans-serif',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
  };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#555', letterSpacing: '0.5px', textTransform: 'uppercase' };
  const rowStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' };

  const handleFocus = (e) => e.target.style.borderColor = '#ec4899';
  const handleBlur = (e) => e.target.style.borderColor = '#e5e7eb';

  const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  if (cartItems.length === 0 && step < 2) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <style>{`
        .checkout-page { min-height: 100vh; background: #fafafa; }
        .checkout-inner { max-width: 1060px; margin: 0 auto; padding: 40px 24px 80px; }
        .checkout-grid { display: grid; grid-template-columns: 1fr 360px; gap: 40px; }
        .checkout-card { background: #fff; border: 1px solid #f0f0f0; border-radius: 20px; padding: 32px; }
        .section-label { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #ec4899; margin-bottom: 6px; }
        .section-heading { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 28px; }
        .next-btn { width: 100%; background: #1a1a1a; color: #fff; border: none; padding: 15px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; border-radius: 10px; margin-top: 24px; transition: background 0.2s; }
        .next-btn:hover { background: #ec4899; }
        .next-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #888; background: none; border: none; cursor: pointer; margin-bottom: 24px; padding: 0; }
        .back-link:hover { color: #1a1a1a; }
        .order-sidebar { position: sticky; top: 80px; height: fit-content; }
        .sidebar-card { background: #fff; border: 1px solid #f0f0f0; border-radius: 20px; padding: 24px; }
        .sidebar-title { font-size: 15px; font-weight: 800; margin-bottom: 20px; }
        .sidebar-item { display: flex; gap: 12px; align-items: center; margin-bottom: 14px; }
        .sidebar-item img { width: 52px; height: 52px; border-radius: 8px; object-fit: cover; background: #f5f0eb; }
        .sidebar-item-info { flex: 1; }
        .sidebar-item-name { font-size: 13px; font-weight: 700; }
        .sidebar-item-sub { font-size: 11px; color: #aaa; }
        .sidebar-item-price { font-size: 13px; font-weight: 700; }
        .divider { border: none; border-top: 1px solid #f0f0f0; margin: 16px 0; }
        .summary-row { display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 10px; }
        .summary-total { display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #1a1a1a; padding-top: 12px; border-top: 1.5px solid #f0f0f0; margin-top: 4px; }
        .review-section { margin-bottom: 24px; }
        .review-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #aaa; margin-bottom: 8px; }
        .review-value { font-size: 14px; font-weight: 600; color: #1a1a1a; line-height: 1.6; }
        .place-btn { width: 100%; background: #ec4899; color: #fff; border: none; padding: 16px; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; border-radius: 10px; margin-top: 8px; transition: background 0.2s; }
        .place-btn:hover { background: #db2777; }
        .place-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .card-icons { display: flex; gap: 8px; margin-bottom: 20px; }
        .card-icon { background: #f5f5f5; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #555; }
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr; }
          .order-sidebar { position: static; }
        }
        @media (max-width: 480px) {
          .checkout-card { padding: 20px; }
        }
      `}</style>

      <Header />
      <div className="checkout-page">
        <div className="checkout-inner">
          <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '32px' }}>Checkout</h1>

          <StepIndicator current={step} />

          <div className="checkout-grid">
            {/* Left: form */}
            <div>
              {/* STEP 0 — Shipping */}
              {step === 0 && (
                <div className="checkout-card">
                  <div className="section-label">Step 1</div>
                  <div className="section-heading">Shipping Information</div>
                  <form onSubmit={handleShipNext} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={rowStyle}>
                      <div>
                        <label style={labelStyle}>Full Name</label>
                        <input style={inputStyle} required value={shipping.fullName} onChange={e => setShipping(p => ({ ...p, fullName: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="Hailey Rhode" />
                      </div>
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input style={inputStyle} required type="email" value={shipping.email} onChange={e => setShipping(p => ({ ...p, email: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="you@email.com" />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Street Address</label>
                      <input style={inputStyle} required value={shipping.address} onChange={e => setShipping(p => ({ ...p, address: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="123 Glow Street" />
                    </div>
                    <div style={rowStyle}>
                      <div>
                        <label style={labelStyle}>City</label>
                        <input style={inputStyle} required value={shipping.city} onChange={e => setShipping(p => ({ ...p, city: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="City/Province" />
                      </div>
                      <div>
                        <label style={labelStyle}>Khan/Sangkat</label>
                        <input style={inputStyle} value={shipping.state} onChange={e => setShipping(p => ({ ...p, state: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="street/village" />
                      </div>
                    </div>
                    <div style={rowStyle}>
                      <div>
                        <label style={labelStyle}>ZIP / Postal Code</label>
                        <input style={inputStyle} required value={shipping.zip} onChange={e => setShipping(p => ({ ...p, zip: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="10001" />
                      </div>
                      <div>
                        <label style={labelStyle}>Country</label>
                        <select style={{ ...inputStyle, background: '#f5f5f5', color: '#888', cursor: 'not-allowed' }} value={shipping.country} disabled>
                          <option>Cambodia</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input style={inputStyle} value={shipping.phone} onChange={e => setShipping(p => ({ ...p, phone: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="+1 (555) 000-0000" />
                    </div>
                    <button type="submit" className="next-btn">Continue to Payment →</button>
                  </form>
                </div>
              )}

              {/* STEP 1 — Payment */}
              {step === 1 && (
                <div className="checkout-card">
                  <button className="back-link" onClick={() => setStep(0)}>← Back to Shipping</button>
                  <div className="section-label">Step 2</div>
                  <div className="section-heading">Payment Details</div>
                  <div className="card-icons">
                    <span className="card-icon">VISA</span>
                    <span className="card-icon">MC</span>
                    <span className="card-icon">AMEX</span>
                    <span className="card-icon">PAYPAL</span>
                  </div>
                  <form onSubmit={handlePayNext} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Name on Card</label>
                      <input style={inputStyle} required value={payment.cardName} onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="Hailey Rhode" />
                    </div>
                    <div>
                      <label style={labelStyle}>Card Number</label>
                      <input style={inputStyle} required value={payment.cardNumber} onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div style={rowStyle}>
                      <div>
                        <label style={labelStyle}>Expiry Date</label>
                        <input style={inputStyle} required value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div>
                        <label style={labelStyle}>CVV</label>
                        <input style={inputStyle} required value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} onFocus={handleFocus} onBlur={handleBlur} placeholder="•••" maxLength={4} type="password" />
                      </div>
                    </div>
                    <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '12px 16px', fontSize: '12px', color: '#065f46', fontWeight: '600' }}>
                      🔒 Your payment info is encrypted and secure. This is a demo — no real charge will occur.
                    </div>
                    <button type="submit" className="next-btn">Review Order →</button>
                  </form>
                </div>
              )}

              {/* STEP 2 — Review */}
              {step === 2 && (
                <div className="checkout-card">
                  <button className="back-link" onClick={() => setStep(1)}>← Back to Payment</button>
                  <div className="section-label">Step 3</div>
                  <div className="section-heading">Review & Place Order</div>

                  <div className="review-section">
                    <div className="review-label">Shipping To</div>
                    <div className="review-value">
                      {shipping.fullName}<br />
                      {shipping.address}, {shipping.city} {shipping.state} {shipping.zip}<br />
                      {shipping.country}<br />
                      {shipping.phone}
                    </div>
                  </div>

                  <div className="review-section">
                    <div className="review-label">Payment</div>
                    <div className="review-value">
                      💳 Card ending in {payment.cardNumber.replace(/\s/g, '').slice(-4)}
                    </div>
                  </div>

                  <div className="review-section">
                    <div className="review-label">Items ({cartItems.length})</div>
                    {cartItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5', fontSize: '14px' }}>
                        <span style={{ fontWeight: '600' }}>{item.name} <span style={{ color: '#aaa', fontWeight: '400' }}>× {item.qty}</span></span>
                        <span style={{ fontWeight: '700' }}>${(parseFloat(item.price.replace('$','')) * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div style={{ background: '#fce7f3', color: '#be185d', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '16px' }}>
                      {error}
                    </div>
                  )}

                  <button className="place-btn" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : `Place Order · $${orderTotal.toFixed(2)}`}
                  </button>
                  <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#aaa' }}>
                    By placing your order you agree to our Terms of Service.
                  </div>
                </div>
              )}
            </div>

            {/* Right: order sidebar */}
            <div className="order-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-title">Your Bag ({cartItems.length})</div>
                {cartItems.map(item => (
                  <div key={item.id} className="sidebar-item">
                    <img src={item.img} alt={item.name} />
                    <div className="sidebar-item-info">
                      <div className="sidebar-item-name">{item.name}</div>
                      <div className="sidebar-item-sub">Qty: {item.qty}</div>
                    </div>
                    <div className="sidebar-item-price">${(parseFloat(item.price.replace('$','')) * item.qty).toFixed(2)}</div>
                  </div>
                ))}
                <hr className="divider" />
                <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="summary-row">
                  <span>Shipping</span>
                  {shippingFee === 0 ? <span style={{ color: '#059669', fontWeight: 700 }}>FREE</span> : <span>${shippingFee.toFixed(2)}</span>}
                </div>
                <div className="summary-total"><span>Total</span><span>${orderTotal.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
