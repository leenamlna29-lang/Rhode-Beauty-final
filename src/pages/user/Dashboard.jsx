import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth, db } from '../../firebase/config';
import { signOut, updateProfile } from 'firebase/auth';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const STATUS_STYLES = {
  pending:    { bg: '#fff7ed', color: '#c2410c', label: 'Pending' },
  processing: { bg: '#eff6ff', color: '#1d4ed8', label: 'Processing' },
  shipped:    { bg: '#f0fdf4', color: '#15803d', label: 'Shipped' },
  delivered:  { bg: '#f5f3ff', color: '#6d28d9', label: 'Delivered' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px' }}>
      {s.label}
    </span>
  );
}

function OrderModal({ order, onClose }) {
  if (!order) return null;
  const subtotal = order.items?.reduce((s, i) => s + parseFloat(i.price.replace('$','')) * i.qty, 0) || 0;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', maxWidth: '560px', width: '100%', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#aaa' }}>✕</button>
        <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#ec4899', marginBottom: '4px', textTransform: 'uppercase' }}>Order Details</div>
        <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>#{order.id?.slice(0,12).toUpperCase()}</h2>
        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '20px' }}>
          {order.createdAt?.toDate ? new Date(order.createdAt.toDate()).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) : 'Recently'}
          &nbsp;·&nbsp;<StatusBadge status={order.status} />
        </div>

        {/* Items */}
        <div style={{ borderRadius: '12px', border: '1px solid #f0f0f0', overflow: 'hidden', marginBottom: '20px' }}>
          {order.items?.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 16px', borderBottom: i < order.items.length-1 ? '1px solid #f5f5f5' : 'none' }}>
              <img src={item.img} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover', background: '#f5f0eb', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>Qty: {item.qty}</div>
              </div>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>${(parseFloat(item.price.replace('$','')) * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ background: '#fafafa', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '8px' }}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '10px' }}>
            <span>Shipping</span>
            {order.shippingFee === 0 ? <span style={{ color: '#059669', fontWeight: 700 }}>FREE</span> : <span>${order.shippingFee?.toFixed(2)}</span>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', borderTop: '1.5px solid #e5e7eb', paddingTop: '10px' }}><span>Total</span><span>${order.total?.toFixed(2)}</span></div>
        </div>

        {/* Shipping address */}
        <div style={{ background: '#fdf6f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ec4899', marginBottom: '8px' }}>Shipped To</div>
          <div style={{ fontSize: '13px', color: '#555', fontWeight: '600', lineHeight: '1.7' }}>
            {order.shipping?.fullName}<br />
            {order.shipping?.address}, {order.shipping?.city} {order.shipping?.state}<br />
            {order.shipping?.zip}, {order.shipping?.country}<br />
            {order.shipping?.phone}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [savingName, setSavingName] = useState(false);

  const handleSaveName = async () => {
    if (!newName.trim() || newName === currentUser?.displayName) {
      setEditingName(false);
      return;
    }
    setSavingName(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      window.location.reload(); // Refresh to reflect changes in Header
    } catch (err) {
      console.error('Failed to update name', err);
    } finally {
      setSavingName(false);
      setEditingName(false);
    }
  };

  const avatarUrl = currentUser?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.displayName || currentUser?.email || 'User')}&background=ec4899&color=fff&bold=true`;

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoadingOrders(false);
    }, () => setLoadingOrders(false));
    return unsub;
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const totalSpent = orders.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <>
      <style>{`
        .dash-layout { display: flex; min-height: 100vh; background: #f8f7f5; font-family: 'Inter', sans-serif; }
        .dash-sidebar { width: 260px; background: #fff; border-right: 1px solid #f0f0f0; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; flex-shrink: 0; }
        .dash-logo { padding: 24px 24px 20px; border-bottom: 1px solid #f0f0f0; }
        .dash-logo a { font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #1a1a1a; text-decoration: none; }
        .dash-avatar-area { padding: 20px 24px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 12px; }
        .dash-avatar { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #ec4899; object-fit: cover; }
        .dash-user-name { font-size: 14px; font-weight: 700; color: #1a1a1a; }
        .dash-user-email { font-size: 11px; color: #aaa; }
        .dash-nav { flex: 1; padding: 16px 12px; }
        .dash-nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; color: #666; cursor: pointer; transition: all 0.15s; margin-bottom: 4px; border: none; background: none; width: 100%; text-align: left; }
        .dash-nav-item:hover { background: #fdf2f8; color: #ec4899; }
        .dash-nav-item.active { background: #fce7f3; color: #be185d; font-weight: 700; }
        .dash-footer { padding: 16px 12px; border-top: 1px solid #f0f0f0; }
        .dash-main { flex: 1; overflow-y: auto; }
        .dash-content { max-width: 900px; padding: 40px 32px; }
        .dash-page-title { font-size: 26px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 6px; }
        .dash-page-sub { color: #888; font-size: 14px; margin-bottom: 32px; }
        .stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: #fff; border: 1px solid #f0f0f0; border-radius: 14px; padding: 20px; }
        .stat-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #aaa; margin-bottom: 8px; }
        .stat-value { font-size: 26px; font-weight: 900; color: #1a1a1a; }
        .stat-sub { font-size: 12px; color: #aaa; margin-top: 4px; }
        .orders-table-wrap { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; overflow: hidden; }
        .orders-table-header { display: grid; grid-template-columns: 1fr 80px 90px 90px; gap: 16px; padding: 14px 20px; background: #fafafa; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #aaa; }
        .order-row { display: grid; grid-template-columns: 1fr 80px 90px 90px; gap: 16px; padding: 16px 20px; border-top: 1px solid #f5f5f5; align-items: center; cursor: pointer; transition: background 0.15s; }
        .order-row:hover { background: #fdf8ff; }
        .order-id { font-size: 13px; font-weight: 700; color: #1a1a1a; }
        .order-date { font-size: 12px; color: #aaa; margin-top: 2px; }
        .order-items-preview { font-size: 12px; color: #888; margin-top: 2px; }
        .order-total { font-size: 14px; font-weight: 800; color: #1a1a1a; }
        .empty-orders { text-align: center; padding: 60px 20px; }
        .profile-card { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 28px; }
        .profile-banner { background: linear-gradient(135deg,#fce7f3,#fdf6f0); border-radius: 12px; padding: 28px; display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
        .profile-avatar-lg { width: 72px; height: 72px; border-radius: 50%; border: 3px solid #ec4899; object-fit: cover; }
        .profile-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f5f5f5; }
        .profile-field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .profile-field-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #aaa; }
        .profile-field-value { font-size: 15px; font-weight: 600; color: #1a1a1a; }
        .role-badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; background: #fce7f3; color: #be185d; }
        .role-badge.admin { background: #ede9fe; color: #6d28d9; }
        @media (max-width: 768px) {
          .dash-layout { flex-direction: column; }
          .dash-sidebar { width: 100%; height: auto; position: static; flex-direction: row; flex-wrap: wrap; border-right: none; border-bottom: 1px solid #f0f0f0; }
          .dash-logo { border-bottom: none; }
          .dash-avatar-area { display: none; }
          .dash-nav { display: flex; gap: 4px; padding: 8px 12px; flex: 1; }
          .dash-footer { border-top: none; padding: 8px 12px; }
          .dash-content { padding: 20px 16px; }
          .stat-cards { grid-template-columns: 1fr 1fr; }
          .orders-table-header, .order-row { grid-template-columns: 1fr 80px 80px; }
          .orders-table-header span:last-child, .order-row > div:last-child { display: none; }
        }
      `}</style>

      <div className="dash-layout">
        {/* Sidebar */}
        <aside className="dash-sidebar">
          <div className="dash-logo">
            <Link to="/">rhode skin</Link>
          </div>
          <div className="dash-avatar-area">
            <img src={avatarUrl} alt="avatar" className="dash-avatar" />
            <div>
              <div className="dash-user-name">{currentUser?.displayName || 'User'}</div>
              <div className="dash-user-email">{currentUser?.email}</div>
            </div>
          </div>
          <nav className="dash-nav">
            <button className={`dash-nav-item ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              My Orders
            </button>
            <button className={`dash-nav-item ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              Profile
            </button>
            <Link to="/skincare" className="dash-nav-item" style={{ textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
              Shop Now
            </Link>
          </nav>
          <div className="dash-footer">
            <button className="dash-nav-item" onClick={handleLogout} style={{ color: '#e11d48' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="dash-main">
          <div className="dash-content">

            {/* Orders Tab */}
            {tab === 'orders' && (
              <>
                <h1 className="dash-page-title">My Orders</h1>
                <p className="dash-page-sub">Track and view all your Rhode Beauty purchases.</p>

                {/* Stats */}
                <div className="stat-cards">
                  <div className="stat-card">
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-value">{orders.length}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total Spent</div>
                    <div className="stat-value">${totalSpent.toFixed(2)}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Active</div>
                    <div className="stat-value">{orders.filter(o => o.status !== 'delivered').length}</div>
                    <div className="stat-sub">in progress</div>
                  </div>
                </div>

                {loadingOrders ? (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#aaa', fontSize: '14px' }}>Loading orders…</div>
                ) : orders.length === 0 ? (
                  <div className="empty-orders">
                    <div style={{ fontSize: '52px', marginBottom: '16px' }}>🛍️</div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>No orders yet</h3>
                    <p style={{ color: '#aaa', marginBottom: '24px' }}>Start shopping and your orders will appear here.</p>
                    <Link to="/skincare" style={{ display: 'inline-block', background: '#1a1a1a', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', letterSpacing: '1px', textDecoration: 'none' }}>Shop Skincare</Link>
                  </div>
                ) : (
                  <div className="orders-table-wrap">
                    <div className="orders-table-header">
                      <span>Order</span>
                      <span>Status</span>
                      <span>Total</span>
                      <span>Items</span>
                    </div>
                    {orders.map(order => (
                      <div key={order.id} className="order-row" onClick={() => setSelectedOrder(order)}>
                        <div>
                          <div className="order-id">#{order.id.slice(0,12).toUpperCase()}</div>
                          <div className="order-date">
                            {order.createdAt?.toDate
                              ? new Date(order.createdAt.toDate()).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
                              : 'Recently'}
                          </div>
                          <div className="order-items-preview">{order.items?.map(i => i.name).join(', ').slice(0, 50)}{order.items?.map(i=>i.name).join('').length > 50 ? '…' : ''}</div>
                        </div>
                        <div><StatusBadge status={order.status} /></div>
                        <div className="order-total">${order.total?.toFixed(2)}</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#888' }}>{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Profile Tab */}
            {tab === 'profile' && (
              <>
                <h1 className="dash-page-title">My Profile</h1>
                <p className="dash-page-sub">Your account information.</p>
                <div className="profile-card">
                  <div className="profile-banner">
                    <img src={avatarUrl} alt="avatar" className="profile-avatar-lg" />
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: '900', color: '#1a1a1a' }}>{currentUser?.displayName || 'Rhode User'}</div>
                      <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{currentUser?.email}</div>
                      <div style={{ marginTop: '8px' }}><span className={`role-badge ${userRole === 'admin' ? 'admin' : ''}`}>{userRole || 'user'}</span></div>
                    </div>
                  </div>

                  <div className="profile-field">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="profile-field-label">Display Name</span>
                      {!editingName && (
                        <button onClick={() => { setEditingName(true); setNewName(currentUser?.displayName || ''); }} style={{ background: 'none', border: 'none', color: '#ec4899', fontSize: '11px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>Edit</button>
                      )}
                    </div>
                    {editingName ? (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} style={{ padding: '8px 12px', border: '1.5px solid #ec4899', borderRadius: '6px', fontSize: '14px', outline: 'none', flex: 1, fontFamily: 'Inter, sans-serif' }} autoFocus />
                        <button onClick={handleSaveName} disabled={savingName} style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '0 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>{savingName ? 'SAVING' : 'SAVE'}</button>
                        <button onClick={() => setEditingName(false)} style={{ background: '#f5f5f5', color: '#555', border: 'none', padding: '0 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>CANCEL</button>
                      </div>
                    ) : (
                      <span className="profile-field-value">{currentUser?.displayName || '—'}</span>
                    )}
                  </div>
                  <div className="profile-field">
                    <span className="profile-field-label">Email Address</span>
                    <span className="profile-field-value">{currentUser?.email}</span>
                  </div>
                  <div className="profile-field">
                    <span className="profile-field-label">User ID</span>
                    <span className="profile-field-value" style={{ fontSize: '12px', fontFamily: 'monospace', color: '#aaa' }}>{currentUser?.uid}</span>
                  </div>
                  <div className="profile-field">
                    <span className="profile-field-label">Role</span>
                    <span className="profile-field-value"><span className={`role-badge ${userRole === 'admin' ? 'admin' : ''}`}>{userRole || 'user'}</span></span>
                  </div>
                  <div className="profile-field">
                    <span className="profile-field-label">Email Verified</span>
                    <span className="profile-field-value">{currentUser?.emailVerified ? '✅ Verified' : '❌ Not verified'}</span>
                  </div>
                  <div className="profile-field">
                    <span className="profile-field-label">Member Since</span>
                    <span className="profile-field-value">
                      {currentUser?.metadata?.creationTime
                        ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
                        : '—'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Order detail modal */}
      {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </>
  );
}
