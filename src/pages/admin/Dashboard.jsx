import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth, db } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import {
  collection, query, orderBy, onSnapshot,
  updateDoc, doc, getDocs,
} from 'firebase/firestore';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered'];
const STATUS_STYLES = {
  pending:    { bg: '#fff7ed', color: '#c2410c' },
  processing: { bg: '#eff6ff', color: '#1d4ed8' },
  shipped:    { bg: '#f0fdf4', color: '#15803d' },
  delivered:  { bg: '#f5f3ff', color: '#6d28d9' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'capitalize' }}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [customerCount, setCustomerCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const avatarUrl = currentUser?.photoURL ||
    `https://ui-avatars.com/api/?name=Admin&background=6d28d9&color=fff&bold=true`;

  // Real-time orders listener
  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoadingOrders(false);
    }, () => setLoadingOrders(false));
    return unsub;
  }, []);

  // Fetch unique customer count
  useEffect(() => {
    getDocs(collection(db, 'users')).then(snap => setCustomerCount(snap.size)).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Stats
  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const shippedOrders = orders.filter(o => o.status === 'shipped' || o.status === 'delivered').length;

  // Filtered orders for table
  const filteredOrders = orders.filter(o => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchSearch = search === '' ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
      o.userName?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
    { id: 'orders', label: 'All Orders', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
  ];

  return (
    <>
      <style>{`
        .admin-layout { display: flex; min-height: 100vh; background: #f4f4f6; font-family: 'Inter', sans-serif; }
        .admin-sidebar { width: 240px; background: #1a1a1a; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; flex-shrink: 0; }
        .admin-logo { padding: 24px 20px 20px; border-bottom: 1px solid #2a2a2a; }
        .admin-logo-text { font-size: 18px; font-weight: 900; color: #fff; letter-spacing: -0.5px; }
        .admin-logo-sub { font-size: 10px; color: #666; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }
        .admin-avatar-area { padding: 16px 20px; border-bottom: 1px solid #2a2a2a; display: flex; align-items: center; gap: 10px; }
        .admin-avatar { width: 36px; height: 36px; border-radius: 50%; border: 2px solid #6d28d9; object-fit: cover; }
        .admin-user-name { font-size: 13px; font-weight: 700; color: #fff; }
        .admin-user-role { font-size: 10px; color: #6d28d9; font-weight: 700; letter-spacing: 0.5px; }
        .admin-nav { flex: 1; padding: 16px 12px; }
        .admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #888; cursor: pointer; transition: all 0.15s; margin-bottom: 4px; border: none; background: none; width: 100%; text-align: left; }
        .admin-nav-item:hover { background: #2a2a2a; color: #fff; }
        .admin-nav-item.active { background: #6d28d9; color: #fff; }
        .admin-footer { padding: 12px; border-top: 1px solid #2a2a2a; }
        .admin-main { flex: 1; overflow-y: auto; }
        .admin-content { padding: 36px 32px; max-width: 1100px; }
        .admin-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .admin-page-title { font-size: 26px; font-weight: 900; color: #1a1a1a; }
        .admin-page-sub { font-size: 13px; color: #888; margin-top: 4px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: #fff; border-radius: 14px; padding: 22px; border: 1px solid #ececec; }
        .stat-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #aaa; margin-bottom: 10px; }
        .stat-value { font-size: 28px; font-weight: 900; color: #1a1a1a; }
        .stat-value.pink { color: #ec4899; }
        .stat-value.purple { color: #6d28d9; }
        .stat-value.green { color: #059669; }
        .stat-chip { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-top: 8px; }
        .chip-pink { background: #fce7f3; color: #be185d; }
        .chip-green { background: #ecfdf5; color: #065f46; }
        .chip-blue { background: #eff6ff; color: #1d4ed8; }
        .chip-purple { background: #f5f3ff; color: #6d28d9; }
        .section-card { background: #fff; border-radius: 16px; border: 1px solid #ececec; overflow: hidden; }
        .section-head { padding: 20px 24px; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .section-head-title { font-size: 16px; font-weight: 800; }
        .filter-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .search-input { padding: 8px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 13px; outline: none; width: 200px; transition: border-color 0.2s; font-family: 'Inter', sans-serif; }
        .search-input:focus { border-color: #6d28d9; }
        .filter-select { padding: 8px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 13px; outline: none; background: #fff; cursor: pointer; font-family: 'Inter', sans-serif; }
        .orders-table { width: 100%; }
        .table-header { display: grid; grid-template-columns: 1.8fr 1.4fr 100px 120px 110px; gap: 12px; padding: 12px 24px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #aaa; background: #fafafa; }
        .table-row { display: grid; grid-template-columns: 1.8fr 1.4fr 100px 120px 110px; gap: 12px; padding: 16px 24px; border-top: 1px solid #f5f5f5; align-items: center; cursor: pointer; transition: background 0.12s; }
        .table-row:hover { background: #faf9ff; }
        .row-order-id { font-size: 13px; font-weight: 700; color: #1a1a1a; }
        .row-order-date { font-size: 11px; color: #aaa; margin-top: 2px; }
        .row-customer { font-size: 13px; font-weight: 600; color: #1a1a1a; }
        .row-customer-email { font-size: 11px; color: #aaa; }
        .row-total { font-size: 14px; font-weight: 800; }
        .status-select { padding: 5px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; outline: none; font-family: 'Inter', sans-serif; background: #fff; transition: border-color 0.2s; }
        .status-select:focus { border-color: #6d28d9; }
        .no-orders { text-align: center; padding: 60px; color: #aaa; font-size: 14px; }
        .recent-mini { display: flex; flex-direction: column; }
        .recent-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; border-top: 1px solid #f5f5f5; }
        .recent-item:first-child { border-top: none; }
        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-box { background: #fff; border-radius: 20px; padding: 32px; max-width: 560px; width: 100%; max-height: 85vh; overflow-y: auto; position: relative; }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .table-header, .table-row { grid-template-columns: 1fr 80px 80px; }
          .table-header span:nth-child(2), .table-header span:nth-child(4),
          .table-row > div:nth-child(2), .table-row > div:nth-child(4) { display: none; }
        }
        @media (max-width: 640px) {
          .admin-sidebar { width: 100%; height: auto; position: static; flex-direction: row; }
          .admin-logo { flex: 1; }
          .admin-avatar-area { display: none; }
          .admin-nav { display: flex; gap: 4px; padding: 8px; }
          .admin-footer { padding: 8px; border-top: none; }
          .admin-content { padding: 20px 16px; }
        }
      `}</style>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <div className="admin-logo-text">rhode skin</div>
            <div className="admin-logo-sub">Admin Panel</div>
          </div>
          <div className="admin-avatar-area">
            <img src={avatarUrl} alt="admin" className="admin-avatar" />
            <div>
              <div className="admin-user-name">{currentUser?.displayName || 'Admin'}</div>
              <div className="admin-user-role">ADMINISTRATOR</div>
            </div>
          </div>
          <nav className="admin-nav">
            {navItems.map(item => (
              <button key={item.id} className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                {item.icon} {item.label}
              </button>
            ))}
            <Link to="/" className="admin-nav-item" style={{ textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Storefront
            </Link>
          </nav>
          <div className="admin-footer">
            <button className="admin-nav-item" onClick={handleLogout} style={{ color: '#e11d48' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="admin-main">
          <div className="admin-content">

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <>
                <div className="admin-topbar">
                  <div>
                    <div className="admin-page-title">Dashboard Overview</div>
                    <div className="admin-page-sub">Real-time data from Firestore</div>
                  </div>
                  <Link to="/" style={{ fontSize: '13px', fontWeight: '600', color: '#6d28d9', textDecoration: 'none' }}>View Storefront →</Link>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Total Revenue</div>
                    <div className="stat-value pink">${totalRevenue.toFixed(2)}</div>
                    <span className="stat-chip chip-pink">All time</span>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-value">{totalOrders}</div>
                    <span className="stat-chip chip-blue">{pendingOrders} pending</span>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Shipped / Delivered</div>
                    <div className="stat-value green">{shippedOrders}</div>
                    <span className="stat-chip chip-green">fulfilled</span>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Customers</div>
                    <div className="stat-value purple">{customerCount || '—'}</div>
                    <span className="stat-chip chip-purple">registered</span>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="section-card">
                  <div className="section-head">
                    <div className="section-head-title">Recent Orders</div>
                    <button className="admin-nav-item" style={{ width: 'auto', padding: '6px 14px', color: '#6d28d9' }} onClick={() => setActiveTab('orders')}>View All →</button>
                  </div>
                  {loadingOrders ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>Loading…</div>
                  ) : orders.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>No orders yet.</div>
                  ) : (
                    <div className="recent-mini">
                      {orders.slice(0, 6).map(order => (
                        <div key={order.id} className="recent-item">
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '700' }}>#{order.id.slice(0,10).toUpperCase()}</div>
                            <div style={{ fontSize: '12px', color: '#aaa' }}>{order.userEmail} · {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <StatusBadge status={order.status} />
                            <span style={{ fontWeight: '800', fontSize: '14px' }}>${order.total?.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <>
                <div className="admin-topbar">
                  <div>
                    <div className="admin-page-title">All Orders</div>
                    <div className="admin-page-sub">{filteredOrders.length} orders · Manage status in real-time</div>
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-head">
                    <div className="section-head-title">Orders ({filteredOrders.length})</div>
                    <div className="filter-row">
                      <input
                        className="search-input"
                        placeholder="Search by email or ID…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                      />
                      <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ textTransform: 'capitalize' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>

                  {loadingOrders ? (
                    <div className="no-orders">Loading orders…</div>
                  ) : filteredOrders.length === 0 ? (
                    <div className="no-orders">No orders found.</div>
                  ) : (
                    <div className="orders-table">
                      <div className="table-header">
                        <span>Order</span>
                        <span>Customer</span>
                        <span>Total</span>
                        <span>Status</span>
                        <span>Update</span>
                      </div>
                      {filteredOrders.map(order => (
                        <div key={order.id} className="table-row" onClick={() => setSelectedOrder(order)}>
                          <div>
                            <div className="row-order-id">#{order.id.slice(0,12).toUpperCase()}</div>
                            <div className="row-order-date">
                              {order.createdAt?.toDate
                                ? new Date(order.createdAt.toDate()).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
                                : 'Recently'}
                              · {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                          <div>
                            <div className="row-customer">{order.userName || '—'}</div>
                            <div className="row-customer-email">{order.userEmail}</div>
                          </div>
                          <div className="row-total">${order.total?.toFixed(2)}</div>
                          <div><StatusBadge status={order.status} /></div>
                          <div onClick={e => e.stopPropagation()}>
                            <select
                              className="status-select"
                              value={order.status}
                              disabled={updatingStatus === order.id}
                              onChange={e => handleStatusChange(order.id, e.target.value)}
                            >
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s} style={{ textTransform: 'capitalize' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedOrder(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#aaa' }}>✕</button>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#6d28d9', marginBottom: '4px', textTransform: 'uppercase' }}>Order Detail</div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>#{selectedOrder.id.slice(0,12).toUpperCase()}</h2>
            <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '20px' }}>
              {selectedOrder.userEmail} · <StatusBadge status={selectedOrder.status} />
            </div>

            {/* Items */}
            <div style={{ borderRadius: '12px', border: '1px solid #f0f0f0', overflow: 'hidden', marginBottom: '20px' }}>
              {selectedOrder.items?.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 16px', borderBottom: i < selectedOrder.items.length-1 ? '1px solid #f5f5f5' : 'none' }}>
                  <img src={item.img} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover', background: '#f5f0eb', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '700' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>Qty: {item.qty} · {item.price} each</div>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>${(parseFloat(item.price.replace('$','')) * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ background: '#fafafa', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '8px' }}><span>Subtotal</span><span>${selectedOrder.subtotal?.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                <span>Shipping</span>
                {selectedOrder.shippingFee === 0 ? <span style={{ color: '#059669', fontWeight: 700 }}>FREE</span> : <span>${selectedOrder.shippingFee?.toFixed(2)}</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', borderTop: '1.5px solid #e5e7eb', paddingTop: '10px' }}><span>Total</span><span>${selectedOrder.total?.toFixed(2)}</span></div>
            </div>

            {/* Shipping info */}
            <div style={{ background: '#f5f3ff', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6d28d9', marginBottom: '8px' }}>Ship To</div>
              <div style={{ fontSize: '13px', color: '#555', fontWeight: '600', lineHeight: '1.7' }}>
                {selectedOrder.shipping?.fullName} · {selectedOrder.shipping?.phone}<br />
                {selectedOrder.shipping?.address}, {selectedOrder.shipping?.city} {selectedOrder.shipping?.state}<br />
                {selectedOrder.shipping?.zip}, {selectedOrder.shipping?.country}
              </div>
            </div>

            {/* Status update */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#555' }}>Update Status</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {STATUS_OPTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(selectedOrder.id, s)}
                    disabled={updatingStatus === selectedOrder.id || selectedOrder.status === s}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', border: '2px solid',
                      borderColor: selectedOrder.status === s ? '#1a1a1a' : '#e5e7eb',
                      background: selectedOrder.status === s ? '#1a1a1a' : '#fff',
                      color: selectedOrder.status === s ? '#fff' : '#555',
                      fontWeight: '700', fontSize: '12px', cursor: 'pointer', textTransform: 'capitalize',
                      transition: 'all 0.15s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
