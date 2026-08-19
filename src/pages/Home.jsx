import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />

    {/* ============================= HERO ============================= */}
    <section className="hero-bg" style={{"padding":"100px 24px","textAlign":"center","minHeight":"580px","display":"flex","alignItems":"center","justifyContent":"center"}}>
        <div style={{"maxWidth":"700px","margin":"0 auto"}}>
            <span className="badge badge-pink" style={{"marginBottom":"20px","display":"inline-block"}}>NEW ARRIVALS</span>
            <h1 style={{"fontSize":"clamp(48px,7vw,90px)","fontWeight":"900","color":"#1a1a1a","letterSpacing":"-3px","lineHeight":"1","marginBottom":"24px"}}>
                Glow<br />From Within.
            </h1>
            <p style={{"fontSize":"17px","color":"#666","lineHeight":"1.8","marginBottom":"36px","maxWidth":"500px","marginLeft":"auto","marginRight":"auto"}}>
                Peptide-powered skincare and makeup designed to nourish your skin barrier and give you an effortless dewy glow.
            </p>
            <div style={{"display":"flex","gap":"14px","justifyContent":"center","flexWrap":"wrap"}}>
                <a href="#skincare" className="btn-dark">SHOP SKINCARE</a>
                <a href="#makeup"   className="btn-outline">LIP & CHEEK</a>
            </div>
        </div>
    </section>

    {/* ============================= MARQUEE ============================= */}
    <div style={{"background":"#1a1a1a","padding":"14px 0","overflow":"hidden"}}>
        <div className="marquee-track">
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>GLAZING MILK</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>BARRIER RESTORE CREAM</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>PEPTIDE LIP TINT</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>POCKET BLUSH</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>HIGHLIGHT MILK</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>POCKET BRONZE</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>GLAZING MILK</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>BARRIER RESTORE CREAM</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>PEPTIDE LIP TINT</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>POCKET BLUSH</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>HIGHLIGHT MILK</span>
            <span style={{"color":"#ec4899"}}>✦</span>
            <span style={{"color":"#fff","fontSize":"12px","fontWeight":"700","letterSpacing":"3px"}}>POCKET BRONZE</span>
            <span style={{"color":"#ec4899"}}>✦</span>
        </div>
    </div>

    {/* ============================= SKINCARE SECTION ============================= */}
    <section id="skincare" style={{"padding":"80px 24px","background":"#fff"}}>
        <div style={{"maxWidth":"1280px","margin":"0 auto"}}>
            <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-end","marginBottom":"48px","flexWrap":"wrap","gap":"16px"}}>
                <div>
                    <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"8px"}}>CATEGORY</p>
                    <h2 className="section-title">Skincare</h2>
                    <p className="section-sub">Build your ideal routine</p>
                </div>
                <a href="#" className="btn-outline">VIEW ALL</a>
            </div>

            <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fill, minmax(240px, 1fr))","gap":"28px"}}>

                {/* Glazing Milk */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/glazing-milk-sq.png?v=1746170157" alt="Glazing Milk" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-pink">BEST SELLER</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Glazing Milk</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Ceramide facial essence</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$32.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(2,341 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Peptide Glazing Fluid */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/products/glaze-2000x2000_1.png?v=1737168098" alt="Peptide Glazing Fluid" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-green">BESTSELLER</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Peptide Glazing Fluid</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Hydrating serum with peptides</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$32.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(1,876 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Barrier Restore Cream */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/products/brc-2000x2000_1.png?v=1677822162" alt="Barrier Restore Cream" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-nude">AWARD WINNING</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Barrier Restore Cream</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Rich moisturizer for dry skin</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$32.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(3,102 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Pineapple Refresh Cleanser */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/cleanser-main-png-2000x2000-revision.png?v=1705696348" alt="Pineapple Refresh Cleanser" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-green">NEW</span>
                            <div className="stars">★★★★☆</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Pineapple Refresh Cleanser</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Gentle AHA face wash</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$30.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(987 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Barrier Butter */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/big-bb-main-png.png?v=1762296685" alt="Barrier Butter" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-purple">TRENDING</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Barrier Butter</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Nourishing whipped body butter</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$36.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(1,245 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Glazing Mist */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/mist-menu-png-2000x2000_bf2f0f50-ad7a-4ffb-bd85-a5dc7ab67aec.png?v=1776707735" alt="Glazing Mist" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-pink">POPULAR</span>
                            <div className="stars">★★★★☆</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Glazing Mist</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Dewy setting & refreshing mist</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$30.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(765 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Peptide Eye Prep */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/eyeprep-r-icon-main-png-2000x2000.png?v=1759292703" alt="Peptide Eye Prep" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-green">NEW</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Peptide Eye Prep</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Under-eye peptide patches</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$25.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(432 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Caffeine Reset Mask */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/main-png-caffeine-reset.png?v=1770090005" alt="Caffeine Reset Mask" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-nude">LIMITED</span>
                            <div className="stars">★★★★☆</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Caffeine Reset Mask</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Sculpting cream-gel mask</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$38.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(612 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {/* ============================= BANNER ============================= */}
    <section style={{"background":"linear-gradient(120deg,#fce7f3,#fdf6f0)","padding":"80px 24px","textAlign":"center"}}>
        <div style={{"maxWidth":"600px","margin":"0 auto"}}>
            <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"12px"}}>THE ROUTINE</p>
            <h2 style={{"fontSize":"clamp(32px,5vw,56px)","fontWeight":"900","letterSpacing":"-2px","marginBottom":"16px"}}>The Rhode Routine.</h2>
            <p style={{"color":"#888","fontSize":"16px","lineHeight":"1.8","marginBottom":"32px"}}>4 steps. Glazing Milk → Peptide Glazing Fluid → Barrier Restore Cream → Peptide Lip Treatment. That's it.</p>
            <a href="#skincare" className="btn-dark">BUILD YOUR ROUTINE</a>
        </div>
    </section>

    {/* ============================= LIP & CHEEK ============================= */}
    <section id="makeup" style={{"padding":"80px 24px","background":"#fafafa"}}>
        <div style={{"maxWidth":"1280px","margin":"0 auto"}}>
            <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-end","marginBottom":"48px","flexWrap":"wrap","gap":"16px"}}>
                <div>
                    <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"8px"}}>CATEGORY</p>
                    <h2 className="section-title">Lip & Cheek</h2>
                    <p className="section-sub">Color that nourishes</p>
                </div>
                <a href="#" className="btn-outline">VIEW ALL</a>
            </div>

            <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fill, minmax(240px, 1fr))","gap":"28px"}}>

                {/* Peptide Lip Tint */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/flatlay-square.png?v=1695258922" alt="Peptide Lip Tint" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-pink">VIRAL</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Peptide Lip Tint</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Sheer color + plumping</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$20.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(4,521 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Peptide Lip Treatment */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/main-png-2000x2000_unscented.png?v=1705598678" alt="Peptide Lip Treatment" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-green">BESTSELLER</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Peptide Lip Treatment</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Overnight lip mask</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$20.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(6,789 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Pocket Blush */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/mainimage-SQ-piggy.png?v=1717624055" alt="Pocket Blush" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-pink">NEW</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Pocket Blush</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Cream blush in 3 shades</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$25.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(3,210 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Pocket Bronze */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/drench-main.png?v=1780103534" alt="Pocket Bronze" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-nude">POPULAR</span>
                            <div className="stars">★★★★★</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Pocket Bronze</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Sun-kissed warmth</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$25.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(1,987 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

                {/* Highlight Milk */}
                <div className="product-card">
                    <div className="thumb" style={{"height":"300px","borderRadius":"12px 12px 0 0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/highlight-milk-1-main.png?v=1779479627" alt="Highlight Milk" />
                    </div>
                    <div style={{"padding":"18px 16px 16px"}}>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"8px"}}>
                            <span className="badge badge-purple">TRENDING</span>
                            <div className="stars">★★★★☆</div>
                        </div>
                        <h3 style={{"fontSize":"16px","fontWeight":"700","marginBottom":"4px"}}>Highlight Milk</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"12px"}}>Multipurpose luminizer</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"12px"}}>
                            <span style={{"fontSize":"16px","fontWeight":"700"}}>$28.00</span>
                            <span style={{"fontSize":"11px","color":"#888"}}>(2,103 reviews)</span>
                        </div>
                        <button className="add-btn">ADD TO BAG</button>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {/* ============================= SETS ============================= */}
    <section id="sets" style={{"padding":"80px 24px","background":"#fff"}}>
        <div style={{"maxWidth":"1280px","margin":"0 auto"}}>
            <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-end","marginBottom":"48px","flexWrap":"wrap","gap":"16px"}}>
                <div>
                    <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"8px"}}>BUNDLES</p>
                    <h2 className="section-title">Sets & Kits</h2>
                    <p className="section-sub">Save more, glow more</p>
                </div>
                <a href="#" className="btn-outline">VIEW ALL</a>
            </div>

            <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fill, minmax(280px, 1fr))","gap":"28px"}}>

                {/* Rhode Kit */}
                <div className="product-card" style={{"border":"1.5px solid #f0f0f0","borderRadius":"12px"}}>
                    <div className="thumb" style={{"height":"280px","borderRadius":"12px 12px 0 0","background":"#fdf6f0"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/rhodekitmainimage_1.png?v=1746036049" alt="The Rhode Kit" />
                    </div>
                    <div style={{"padding":"20px"}}>
                        <span className="badge badge-pink" style={{"marginBottom":"10px","display":"inline-block"}}>SAVE $35</span>
                        <h3 style={{"fontSize":"18px","fontWeight":"800","marginBottom":"6px"}}>The Rhode Kit</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"4px"}}>Cleanser + Glazing Milk + Peptide Fluid + Barrier Cream</p>
                        <p style={{"fontSize":"12px","color":"#aaa","marginBottom":"14px"}}>4 full-size products</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"14px"}}>
                            <div>
                                <span style={{"fontSize":"18px","fontWeight":"800"}}>$117.00</span>
                                <span style={{"fontSize":"13px","color":"#aaa","textDecoration":"line-through","marginLeft":"8px"}}>$152.00</span>
                            </div>
                            <div className="stars">★★★★★</div>
                        </div>
                        <button className="add-btn" style={{"opacity":"1","transform":"none"}}>ADD TO BAG</button>
                    </div>
                </div>

                {/* Soft Glam Set */}
                <div className="product-card" style={{"border":"1.5px solid #f0f0f0","borderRadius":"12px"}}>
                    <div className="thumb" style={{"height":"280px","borderRadius":"12px 12px 0 0","background":"#fce7f3"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/soft-glam-set-main.png?v=1783483355" alt="Soft Glam Set" />
                    </div>
                    <div style={{"padding":"20px"}}>
                        <span className="badge badge-purple" style={{"marginBottom":"10px","display":"inline-block"}}>NEW</span>
                        <h3 style={{"fontSize":"18px","fontWeight":"800","marginBottom":"6px"}}>The Soft Glam Set</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"4px"}}>Pocket Blush + Highlight Milk + Peptide Lip Tint</p>
                        <p style={{"fontSize":"12px","color":"#aaa","marginBottom":"14px"}}>3 full-size products</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"14px"}}>
                            <div>
                                <span style={{"fontSize":"18px","fontWeight":"800"}}>$67.00</span>
                                <span style={{"fontSize":"13px","color":"#aaa","textDecoration":"line-through","marginLeft":"8px"}}>$73.00</span>
                            </div>
                            <div className="stars">★★★★★</div>
                        </div>
                        <button className="add-btn" style={{"opacity":"1","transform":"none"}}>ADD TO BAG</button>
                    </div>
                </div>

                {/* Travel Set */}
                <div className="product-card" style={{"border":"1.5px solid #f0f0f0","borderRadius":"12px"}}>
                    <div className="thumb" style={{"height":"280px","borderRadius":"12px 12px 0 0","background":"#ecfdf5"}}>
                        <img src="https://cdn.shopify.com/s/files/1/0606/5451/8510/files/travel-set-mist-main.png?v=1783494070" alt="Travel Set" />
                    </div>
                    <div style={{"padding":"20px"}}>
                        <span className="badge badge-green" style={{"marginBottom":"10px","display":"inline-block"}}>BESTSELLER</span>
                        <h3 style={{"fontSize":"18px","fontWeight":"800","marginBottom":"6px"}}>The Travel Set</h3>
                        <p style={{"fontSize":"13px","color":"#888","marginBottom":"4px"}}>Minis of 5 best-sellers in a travel pouch</p>
                        <p style={{"fontSize":"12px","color":"#aaa","marginBottom":"14px"}}>5 mini products + pouch</p>
                        <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"14px"}}>
                            <div>
                                <span style={{"fontSize":"18px","fontWeight":"800"}}>$105.00</span>
                                <span style={{"fontSize":"13px","color":"#aaa","textDecoration":"line-through","marginLeft":"8px"}}>$130.00</span>
                            </div>
                            <div className="stars">★★★★★</div>
                        </div>
                        <button className="add-btn" style={{"opacity":"1","transform":"none"}}>ADD TO BAG</button>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {/* ============================= ABOUT ============================= */}
    <section id="about" style={{"padding":"80px 24px","background":"#fdf6f0"}}>
        <div style={{"maxWidth":"1280px","margin":"0 auto"}}>
            <div className="about-grid">
                <div>
                    <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"16px"}}>OUR STORY</p>
                    <h2 style={{"fontSize":"clamp(32px,4vw,52px)","fontWeight":"900","letterSpacing":"-2px","marginBottom":"24px","lineHeight":"1.1"}}>Clean.<br />Effective.<br />Accessible.</h2>
                    <p style={{"color":"#666","fontSize":"15px","lineHeight":"1.9","marginBottom":"16px"}}>
                        RHODE was created with one mission: give everyone access to premium skincare that actually works. We believe quality shouldn't be a luxury, and beauty should feel effortless.
                    </p>
                    <p style={{"color":"#666","fontSize":"15px","lineHeight":"1.9","marginBottom":"32px"}}>
                        Every formula is crafted with clean, clinically-tested ingredients, dermatologist-approved, and designed to build your skin's barrier — not strip it.
                    </p>
                    <div style={{"display":"flex","gap":"40px","marginBottom":"36px","flexWrap":"wrap"}}>
                        <div>
                            <p style={{"fontSize":"36px","fontWeight":"900","color":"#ec4899"}}>50+</p>
                            <p style={{"fontSize":"13px","color":"#888","fontWeight":"600"}}>Products</p>
                        </div>
                        <div>
                            <p style={{"fontSize":"36px","fontWeight":"900","color":"#ec4899"}}>2M+</p>
                            <p style={{"fontSize":"13px","color":"#888","fontWeight":"600"}}>Happy Customers</p>
                        </div>
                        <div>
                            <p style={{"fontSize":"36px","fontWeight":"900","color":"#ec4899"}}>4.9★</p>
                            <p style={{"fontSize":"13px","color":"#888","fontWeight":"600"}}>Average Rating</p>
                        </div>
                    </div>
                    <a href="#" className="btn-dark">LEARN MORE</a>
                </div>
                <div style={{"borderRadius":"16px","overflow":"hidden","height":"500px"}}>
                    <img src="https://akns-images.eonline.com/eol_images/Entire_Site/2024520/rs_1024x759-240620033511-Hailey_Bieber_Rhode_Pocket_Blush_Launch_.jpg?fit=around%7C1024:759&output-quality=90&crop=1024:759;center,top"
                         alt="RHODE mission"
                         style={{"width":"100%","height":"100%","objectFit":"cover"}} />
                </div>
            </div>
        </div>
    </section>

    {/* ============================= WHY RHODE ============================= */}
    <section style={{"padding":"80px 24px","background":"#fff"}}>
        <div style={{"maxWidth":"1280px","margin":"0 auto","textAlign":"center"}}>
            <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"12px"}}>WHY US</p>
            <h2 className="section-title" style={{"marginBottom":"48px"}}>Why Choose RHODE</h2>
            <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit, minmax(220px, 1fr))","gap":"40px"}}>
                <div>
                    <div style={{"width":"72px","height":"72px","background":"#fce7f3","borderRadius":"50%","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 20px"}}>
                        <i className="fas fa-flask" style={{"fontSize":"28px","color":"#ec4899"}}></i>
                    </div>
                    <h3 style={{"fontWeight":"800","fontSize":"16px","marginBottom":"8px"}}>Dermatologist Tested</h3>
                    <p style={{"color":"#888","fontSize":"14px","lineHeight":"1.7"}}>Tested and approved by dermatologists for all skin types.</p>
                </div>
                <div>
                    <div style={{"width":"72px","height":"72px","background":"#ecfdf5","borderRadius":"50%","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 20px"}}>
                        <i className="fas fa-leaf" style={{"fontSize":"28px","color":"#059669"}}></i>
                    </div>
                    <h3 style={{"fontWeight":"800","fontSize":"16px","marginBottom":"8px"}}>Clean Ingredients</h3>
                    <p style={{"color":"#888","fontSize":"14px","lineHeight":"1.7"}}>No parabens, sulfates, or harmful additives — ever.</p>
                </div>
                <div>
                    <div style={{"width":"72px","height":"72px","background":"#f5f3ff","borderRadius":"50%","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 20px"}}>
                        <i className="fas fa-star" style={{"fontSize":"28px","color":"#7c3aed"}}></i>
                    </div>
                    <h3 style={{"fontWeight":"800","fontSize":"16px","marginBottom":"8px"}}>Award Winning</h3>
                    <p style={{"color":"#888","fontSize":"14px","lineHeight":"1.7"}}>Recognized by Allure, Vogue, and top beauty editors.</p>
                </div>
                <div>
                    <div style={{"width":"72px","height":"72px","background":"#fdf6f0","borderRadius":"50%","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 20px"}}>
                        <i className="fas fa-heart" style={{"fontSize":"28px","color":"#f59e0b"}}></i>
                    </div>
                    <h3 style={{"fontWeight":"800","fontSize":"16px","marginBottom":"8px"}}>Cruelty Free</h3>
                    <p style={{"color":"#888","fontSize":"14px","lineHeight":"1.7"}}>Never tested on animals. Always ethical.</p>
                </div>
            </div>
        </div>
    </section>

    {/* ============================= NEWSLETTER ============================= */}
    <section style={{"background":"#1a1a1a","padding":"80px 24px","textAlign":"center"}}>
        <div style={{"maxWidth":"520px","margin":"0 auto"}}>
            <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"12px"}}>NEWSLETTER</p>
            <h2 style={{"fontSize":"clamp(28px,4vw,44px)","fontWeight":"900","color":"#fff","letterSpacing":"-1px","marginBottom":"12px"}}>Stay In The Glow.</h2>
            <p style={{"color":"rgba(255,255,255,0.6)","fontSize":"15px","marginBottom":"32px"}}>Skincare tips, new launches & exclusive offers — straight to your inbox.</p>
            <form style={{"display":"flex","gap":"0","maxWidth":"460px","margin":"0 auto"}} onsubmit="return false;">
                <input type="email" placeholder="Enter your email address" className="nl-input" required />
                <button type="submit" style={{"padding":"14px 24px","background":"#ec4899","color":"#fff","border":"none","fontSize":"13px","fontWeight":"700","letterSpacing":"1px","cursor":"pointer","transition":"background 0.3s"}} onMouseOver={() => {}} onMouseOut={() => {}}>
                    JOIN
                </button>
            </form>
            <p style={{"color":"rgba(255,255,255,0.3)","fontSize":"12px","marginTop":"14px"}}>No spam. Unsubscribe anytime.</p>
        </div>
    </section>

    {/* ============================= CONTACT ============================= */}
    <section id="contact" style={{"padding":"80px 24px","background":"#f9fafb"}}>
        <div style={{"maxWidth":"1280px","margin":"0 auto","textAlign":"center"}}>
            <p style={{"fontSize":"12px","fontWeight":"700","letterSpacing":"2px","color":"#ec4899","marginBottom":"12px"}}>SUPPORT</p>
            <h2 className="section-title" style={{"marginBottom":"8px"}}>Get In Touch</h2>
            <p className="section-sub" style={{"marginBottom":"48px"}}>We're here to help</p>

            <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit, minmax(220px, 1fr))","gap":"24px","maxWidth":"900px","margin":"0 auto"}}>
                <div style={{"background":"#fff","padding":"36px 24px","borderRadius":"16px","border":"1px solid #f0f0f0"}}>
                    <i className="fas fa-envelope" style={{"fontSize":"32px","color":"#ec4899","marginBottom":"16px","display":"block"}}></i>
                    <h3 style={{"fontWeight":"800","marginBottom":"8px"}}>Email Us</h3>
                    <a href="mailto:hello@rhode.skin" style={{"color":"#ec4899","textDecoration":"none","fontSize":"14px"}}>hello@rhode.skin</a>
                </div>
                <div style={{"background":"#fff","padding":"36px 24px","borderRadius":"16px","border":"1px solid #f0f0f0"}}>
                    <i className="fas fa-phone" style={{"fontSize":"32px","color":"#ec4899","marginBottom":"16px","display":"block"}}></i>
                    <h3 style={{"fontWeight":"800","marginBottom":"8px"}}>Call Us</h3>
                    <a href="tel:+18009876543" style={{"color":"#ec4899","textDecoration":"none","fontSize":"14px"}}>+1 (800) 987-6543</a>
                </div>
                <div style={{"background":"#fff","padding":"36px 24px","borderRadius":"16px","border":"1px solid #f0f0f0"}}>
                    <i className="fas fa-clock" style={{"fontSize":"32px","color":"#ec4899","marginBottom":"16px","display":"block"}}></i>
                    <h3 style={{"fontWeight":"800","marginBottom":"8px"}}>Hours</h3>
                    <p style={{"color":"#888","fontSize":"14px"}}>Mon–Fri: 9AM–5PM PST</p>
                </div>
                <div style={{"background":"#fff","padding":"36px 24px","borderRadius":"16px","border":"1px solid #f0f0f0"}}>
                    <i className="fab fa-instagram" style={{"fontSize":"32px","color":"#ec4899","marginBottom":"16px","display":"block"}}></i>
                    <h3 style={{"fontWeight":"800","marginBottom":"8px"}}>Follow Us</h3>
                    <a href="#" style={{"color":"#ec4899","textDecoration":"none","fontSize":"14px"}}>@rhode</a>
                </div>
            </div>
        </div>
    </section>

    {/* ============================= FOOTER ============================= */}
    <footer style={{"background":"#1a1a1a","color":"#fff","padding":"60px 24px 30px"}}>
        <div style={{"maxWidth":"1280px","margin":"0 auto"}}>
            <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit, minmax(180px, 1fr))","gap":"40px","marginBottom":"48px"}}>
                <div>
                    <p style={{"fontSize":"20px","fontWeight":"900","letterSpacing":"-1px","marginBottom":"12px"}}>rhode skin</p>
                    <p style={{"color":"rgba(255,255,255,0.5)","fontSize":"13px","lineHeight":"1.8"}}>Premium skincare designed for everyone. Created by Hailey Bieber.</p>
                    <div style={{"display":"flex","gap":"16px","marginTop":"20px"}}>
                        <a href="#" style={{"color":"rgba(255,255,255,0.6)","fontSize":"18px","transition":"color 0.3s"}} onMouseOver={() => {}} onMouseOut={() => {}}><i className="fab fa-instagram"></i></a>
                        <a href="#" style={{"color":"rgba(255,255,255,0.6)","fontSize":"18px","transition":"color 0.3s"}} onMouseOver={() => {}} onMouseOut={() => {}}><i className="fab fa-tiktok"></i></a>
                        <a href="#" style={{"color":"rgba(255,255,255,0.6)","fontSize":"18px","transition":"color 0.3s"}} onMouseOver={() => {}} onMouseOut={() => {}}><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div>
                    <h4 style={{"fontWeight":"800","fontSize":"13px","letterSpacing":"1.5px","marginBottom":"16px"}}>SHOP</h4>
                    <ul style={{"listStyle":"none","display":"flex","flexDirection":"column","gap":"10px"}}>
                        <li><a href="#skincare" style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Skincare</a></li>
                        <li><a href="#makeup"   style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Lip & Cheek</a></li>
                        <li><a href="#sets"     style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Sets & Kits</a></li>
                        <li><a href="#"         style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Bestsellers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{"fontWeight":"800","fontSize":"13px","letterSpacing":"1.5px","marginBottom":"16px"}}>COMPANY</h4>
                    <ul style={{"listStyle":"none","display":"flex","flexDirection":"column","gap":"10px"}}>
                        <li><a href="#about"   style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>About Us</a></li>
                        <li><a href="#contact" style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Contact</a></li>
                        <li><a href="#"        style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Privacy Policy</a></li>
                        <li><a href="#"        style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{"fontWeight":"800","fontSize":"13px","letterSpacing":"1.5px","marginBottom":"16px"}}>LEGAL</h4>
                    <ul style={{"listStyle":"none","display":"flex","flexDirection":"column","gap":"10px"}}>
                        <li><a href="#" style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Terms & Conditions</a></li>
                        <li><a href="#" style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Cookie Policy</a></li>
                        <li><a href="#" style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Shipping Policy</a></li>
                        <li><a href="#" style={{"color":"rgba(255,255,255,0.5)","textDecoration":"none","fontSize":"14px"}} onMouseOver={() => {}} onMouseOut={() => {}}>Returns</a></li>
                    </ul>
                </div>
            </div>
            <div style={{"borderTop":"1px solid rgba(255,255,255,0.1)","paddingTop":"24px","display":"flex","justifyContent":"space-between","alignItems":"center","flexWrap":"wrap","gap":"12px"}}>
                <p style={{"color":"rgba(255,255,255,0.3)","fontSize":"13px"}}>&copy; 2026 RHODE Skin. All rights reserved. Created for a university project.</p>
                <div style={{"display":"flex","gap":"16px"}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{"height":"20px","opacity":"0.4","filter":"grayscale(1) brightness(5)"}} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{"height":"20px","opacity":"0.4","filter":"grayscale(1) brightness(5)"}} />
                </div>
            </div>
        </div>
    </footer>

    {/* ============================= SCRIPTS ============================= */}



    </>
  );
}
