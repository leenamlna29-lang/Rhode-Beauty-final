import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const sets = [
  { id: 'set-01', name: 'The Rhode Kit', desc: 'Cleanser + Glazing Milk + Peptide Fluid + Barrier Cream', sub: '4 full-size products', price: '$117.00', original: '$152.00', badge: 'SAVE $35', badgeClass: 'badge-pink', stars: '★★★★★', bg: '#fdf6f0', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/rhodekitmainimage_1.png?v=1746036049' },
  { id: 'set-02', name: 'The Soft Glam Set', desc: 'Pocket Blush + Highlight Milk + Peptide Lip Tint', sub: '3 full-size products', price: '$67.00', original: '$73.00', badge: 'NEW', badgeClass: 'badge-purple', stars: '★★★★★', bg: '#fce7f3', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/soft-glam-set-main.png?v=1783483355' },
  { id: 'set-03', name: 'The Travel Set', desc: 'Minis of 5 best-sellers in a travel pouch', sub: '5 mini products + pouch', price: '$105.00', original: '$130.00', badge: 'BESTSELLER', badgeClass: 'badge-green', stars: '★★★★★', bg: '#ecfdf5', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/travel-set-mist-main.png?v=1783494070' },
  { id: 'set-04', name: 'The Glow Duo', desc: 'Glazing Milk + Peptide Glazing Fluid', sub: '2 full-size products', price: '$58.00', original: '$64.00', badge: 'POPULAR', badgeClass: 'badge-nude', stars: '★★★★☆', bg: '#fdf6f0', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/glow-kit-main.png?v=1783483356' },
  { id: 'set-05', name: 'The Pocket Duo', desc: 'Pocket Blush + Pocket Bronze', sub: '2 full-size products', price: '$48.00', original: '$50.00', badge: 'NEW', badgeClass: 'badge-green', stars: '★★★★★', bg: '#fdf6f0', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/pocket-duo-menu.png?v=1780105812' },
  { id: 'set-06', name: 'The Sun-kissed Set', desc: 'Pocket Bronze + Peptide Lip Tint', sub: '2 full-size products', price: '$50.00', original: '$53.00', badge: 'POPULAR', badgeClass: 'badge-nude', stars: '★★★★☆', bg: '#ecfdf5', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/sun-kissed-set-main.png?v=1780105812' },
  { id: 'set-07', name: 'The Peptide Lip Trio', desc: 'Three peptide lip treatments', sub: '3 full-size products', price: '$56.00', original: '$60.00', badge: 'LIMITED', badgeClass: 'badge-pink', stars: '★★★★★', bg: '#fce7f3', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/peptide-lip-trio-bronze-main.png?v=1779479959' },
  { id: 'set-08', name: 'The Peptide Lip Shape Set', desc: 'Four shape peptide lip', sub: '4 full-size products', price: '$92.00', original: '$96.00', badge: 'LIMITED', badgeClass: 'badge-pink', stars: '★★★★★', bg: '#fce7f3', img: 'https://www.rhodeskin.com/cdn/shop/files/set-pls-hero-d_2x_029fdaf4-df83-42cc-8873-79047608f1d9_2000x.jpg?v=1737602715' },
];

function Toast({ msg }) {
  return msg ? (
    <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', color: '#fff', padding: '12px 24px', borderRadius: '40px', fontSize: '13px', fontWeight: '700', zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.3s ease' }}>
      ✓ Added to bag
    </div>
  ) : null;
}

export default function Sets() {
  const { addToCart } = useCart();
  const [toast, setToast] = useState(false);

  const handleAdd = (s) => {
    addToCart({ id: s.id, name: s.name, desc: s.desc, price: s.price, img: s.img });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
      <Header />
      <Toast msg={toast} />

      <section style={{ background: 'linear-gradient(135deg,#f5eaf8,#fce8e8)', padding: '60px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px', color: '#ec4899', marginBottom: '12px', textTransform: 'uppercase' }}>Bundles</p>
        <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: '900', letterSpacing: '-3px', color: '#1a1a1a', lineHeight: '1', marginBottom: '16px' }}>Sets &amp; Kits</h1>
        <p style={{ fontSize: '16px', color: '#888', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>Save more, glow more. Curated bundles of your favourite RHODE essentials.</p>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', fontSize: '12px', color: '#aaa', display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <span style={{ color: '#1a1a1a', fontWeight: '600' }}>Sets &amp; Kits</span>
      </div>

      <section style={{ padding: '20px 24px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
            {sets.map((s) => (
              <div key={s.id} className="product-card" style={{ border: '1.5px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
                <div className="thumb" style={{ height: '280px', borderRadius: '12px 12px 0 0', background: s.bg }}>
                  <img src={s.img} alt={s.name} />
                </div>
                <div style={{ padding: '20px' }}>
                  <span className={`badge ${s.badgeClass}`} style={{ marginBottom: '10px', display: 'inline-block' }}>{s.badge}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>{s.name}</h3>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>{s.desc}</p>
                  <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '14px' }}>{s.sub}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '18px', fontWeight: '800' }}>{s.price}</span>
                      <span style={{ fontSize: '13px', color: '#aaa', textDecoration: 'line-through', marginLeft: '8px' }}>{s.original}</span>
                    </div>
                    <div className="stars">{s.stars}</div>
                  </div>
                  <button className="add-btn" style={{ opacity: 1, transform: 'none' }} onClick={() => handleAdd(s)}>ADD TO BAG</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#1a1a1a', color: '#fff', padding: '60px 24px 30px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '40px', marginBottom: '40px' }}>
          <div><h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '10px' }}>rhode beauty</h3><p style={{ color: '#888', fontSize: '13px' }}>Inclusive Shades. Flawless Formula.</p></div>
          <div><h4 style={{ fontWeight: '800', marginBottom: '14px', letterSpacing: '1px', fontSize: '13px' }}>SHOP</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/skincare" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Skincare</Link>
              <Link to="/lip-cheek" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Lip &amp; Cheek</Link>
              <Link to="/sets" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Sets</Link>
            </div>
          </div>
          <div><h4 style={{ fontWeight: '800', marginBottom: '14px', letterSpacing: '1px', fontSize: '13px' }}>COMPANY</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>About Us</Link>
              <Link to="/contact" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Contact</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: '24px', textAlign: 'center', color: '#555', fontSize: '12px' }}>© 2026 RHODE Beauty. All rights reserved.</div>
      </footer>
    </>
  );
}
