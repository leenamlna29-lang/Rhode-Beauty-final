import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const products = [
  { id: 'lc-01', name: 'Peptide Lip Tint', desc: 'Sheer color + plumping', price: '$20.00', reviews: '4,521', badge: 'VIRAL', badgeClass: 'badge-pink', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/flatlay-square.png?v=1695258922' },
  { id: 'lc-02', name: 'Peptide Lip Treatment', desc: 'Overnight lip mask', price: '$20.00', reviews: '6,789', badge: 'BESTSELLER', badgeClass: 'badge-green', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/main-png-2000x2000_unscented.png?v=1705598678' },
  { id: 'lc-03', name: 'Pocket Blush', desc: 'Cream blush in 3 shades', price: '$25.00', reviews: '3,210', badge: 'NEW', badgeClass: 'badge-pink', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/mainimage-SQ-piggy.png?v=1717624055' },
  { id: 'lc-04', name: 'Pocket Bronze', desc: 'Sun-kissed warmth', price: '$25.00', reviews: '1,987', badge: 'POPULAR', badgeClass: 'badge-nude', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/drench-main.png?v=1780103534' },
  { id: 'lc-05', name: 'Highlight Milk', desc: 'Multipurpose luminizer', price: '$28.00', reviews: '2,103', badge: 'TRENDING', badgeClass: 'badge-purple', stars: '★★★★☆', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/highlight-milk-1-main.png?v=1779479627' },
  { id: 'lc-06', name: 'Lip Liner', desc: 'Precise & long-lasting', price: '$18.00', reviews: '876', badge: 'NEW', badgeClass: 'badge-green', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/TWIST-pls-main-png-sq.png?v=1736479535' },
  { id: 'lc-07', name: 'Peptide Lip Tint Espresso', desc: 'Sheer color + plumping', price: '$20.00', reviews: '2,130', badge: 'BESTSELLER', badgeClass: 'badge-green', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/esp-flatlay-square.png?v=1695254066' },
  { id: 'lc-08', name: 'Peptide Lip Tint Raspberry Jelly', desc: 'Sheer color + plumping', price: '$20.00', reviews: '1,421', badge: 'TRENDING', badgeClass: 'badge-pink', stars: '★★★★☆', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/flatlay-square-rasp.png?v=1695255630' },
  { id: 'lc-09', name: 'Peptide Lip Treatment Watermelon Slice', desc: 'Overnight lip mask', price: '$20.00', reviews: '3,892', badge: 'SUMMER', badgeClass: 'badge-nude', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/main-png-2000x2000_watermelon_cc3c028b-5e97-40c7-aa0e-e6b10a808fd3.png?v=1709759894' },
  { id: 'lc-10', name: 'Peptide Lip Treatment Salted Caramel', desc: 'Overnight lip mask', price: '$20.00', reviews: '2,510', badge: '', badgeClass: '', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/main-png-2000x2000_saltedcaramel_5df90d2c-bf13-4be3-b218-f04a58421574.png?v=1705608073' },
  { id: 'lc-11', name: 'Pocket Blush Sleepy Girl', desc: 'Cream blush in soft mauve', price: '$25.00', reviews: '1,142', badge: 'POPULAR', badgeClass: 'badge-purple', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/mainimage-SQ-sleepygirl.png?v=1717624419' },
  { id: 'lc-12', name: 'Pocket Blush Spicy Marg', desc: 'Cream blush in coral', price: '$25.00', reviews: '875', badge: '', badgeClass: '', stars: '★★★★☆', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/mainimage-SQ-spicymarg.png?v=1717624428' },
];

function Toast({ msg }) {
  return msg ? (
    <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', color: '#fff', padding: '12px 24px', borderRadius: '40px', fontSize: '13px', fontWeight: '700', zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.3s ease' }}>
      ✓ Added to bag
    </div>
  ) : null;
}

export default function LipCheek() {
  const { addToCart } = useCart();
  const [toast, setToast] = useState(false);

  const handleAdd = (product) => {
    addToCart(product);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
      <Header />
      <Toast msg={toast} />

      <section style={{ background: 'linear-gradient(135deg,#fce7f3,#fdf6f0)', padding: '60px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px', color: '#ec4899', marginBottom: '12px', textTransform: 'uppercase' }}>Category</p>
        <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: '900', letterSpacing: '-3px', color: '#1a1a1a', lineHeight: '1', marginBottom: '16px' }}>Lip &amp; Cheek</h1>
        <p style={{ fontSize: '16px', color: '#888', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>Color that nourishes. Shades that flatter every skin tone with peptide-infused formulas.</p>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', fontSize: '12px', color: '#aaa', display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <span style={{ color: '#1a1a1a', fontWeight: '600' }}>Lip &amp; Cheek</span>
      </div>

      <section style={{ padding: '20px 24px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '28px' }}>
            {products.map((p) => (
              <div key={p.id} className="product-card" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0', background: '#fff' }}>
                <div className="thumb" style={{ height: '300px', borderRadius: '12px 12px 0 0' }}>
                  <img src={p.img} alt={p.name} />
                </div>
                <div style={{ padding: '18px 16px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className={`badge ${p.badgeClass}`}>{p.badge}</span>
                    <div className="stars">{p.stars}</div>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{p.name}</h3>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>{p.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700' }}>{p.price}</span>
                    <span style={{ fontSize: '11px', color: '#888' }}>({p.reviews} reviews)</span>
                  </div>
                  <button className="add-btn" style={{ opacity: 1, transform: 'none' }} onClick={() => handleAdd(p)}>ADD TO BAG</button>
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
