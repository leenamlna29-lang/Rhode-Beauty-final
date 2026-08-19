import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const products = [
  { id: 'sk-01', name: 'Glazing Milk', desc: 'Ceramide facial essence', price: '$32.00', reviews: '2,341', badge: 'BEST SELLER', badgeClass: 'badge-pink', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/glazing-milk-sq.png?v=1746170157' },
  { id: 'sk-02', name: 'Peptide Glazing Fluid', desc: 'Hydrating serum with peptides', price: '$32.00', reviews: '1,876', badge: 'BESTSELLER', badgeClass: 'badge-green', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/products/glaze-2000x2000_1.png?v=1737168098' },
  { id: 'sk-03', name: 'Barrier Restore Cream', desc: 'Rich moisturizer for dry skin', price: '$32.00', reviews: '3,102', badge: 'AWARD WINNING', badgeClass: 'badge-nude', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/products/brc-2000x2000_1.png?v=1677822162' },
  { id: 'sk-04', name: 'Pineapple Refresh Cleanser', desc: 'Gentle AHA face wash', price: '$30.00', reviews: '987', badge: 'NEW', badgeClass: 'badge-green', stars: '★★★★☆', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/cleanser-main-png-2000x2000-revision.png?v=1705696348' },
  { id: 'sk-05', name: 'Barrier Butter', desc: 'Nourishing whipped body butter', price: '$36.00', reviews: '1,245', badge: 'TRENDING', badgeClass: 'badge-purple', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/big-bb-main-png.png?v=1762296685' },
  { id: 'sk-06', name: 'Glazing Mist', desc: 'Dewy setting & refreshing mist', price: '$30.00', reviews: '765', badge: 'POPULAR', badgeClass: 'badge-pink', stars: '★★★★☆', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/mist-menu-png-2000x2000_bf2f0f50-ad7a-4ffb-bd85-a5dc7ab67aec.png?v=1776707735' },
  { id: 'sk-07', name: 'Peptide Eye Prep', desc: 'Under-eye peptide patches', price: '$25.00', reviews: '432', badge: 'NEW', badgeClass: 'badge-green', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/eyeprep-r-icon-main-png-2000x2000.png?v=1759292703' },
  { id: 'sk-08', name: 'Caffeine Reset Mask', desc: 'Sculpting cream-gel mask', price: '$38.00', reviews: '612', badge: 'LIMITED', badgeClass: 'badge-nude', stars: '★★★★☆', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/main-png-caffeine-reset.png?v=1770090005' },
  { id: 'sk-09', name: 'The Spotwear Trio', desc: 'Hydrocolloid pimple patches', price: '$45.00', reviews: '234', badge: 'NEW', badgeClass: 'badge-purple', stars: '★★★★★', img: 'https://cdn.shopify.com/s/files/1/0606/5451/8510/files/spotwear-trio-main-png-2000x2000.png?v=1778266840' },
];

function Toast({ msg }) {
  return msg ? (
    <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', color: '#fff', padding: '12px 24px', borderRadius: '40px', fontSize: '13px', fontWeight: '700', zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.3s ease' }}>
      ✓ Added to bag
    </div>
  ) : null;
}

export default function Skincare() {
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

      {/* Page hero */}
      <section style={{ background: 'linear-gradient(135deg,#fdf6f0,#fce8e8)', padding: '60px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px', color: '#ec4899', marginBottom: '12px', textTransform: 'uppercase' }}>Category</p>
        <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: '900', letterSpacing: '-3px', color: '#1a1a1a', lineHeight: '1', marginBottom: '16px' }}>Skincare</h1>
        <p style={{ fontSize: '16px', color: '#888', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>Peptide-powered formulas designed to nourish your skin barrier and give you an effortless dewy glow.</p>
      </section>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', fontSize: '12px', color: '#aaa', display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <span style={{ color: '#1a1a1a', fontWeight: '600' }}>Skincare</span>
      </div>

      {/* Product Grid */}
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
