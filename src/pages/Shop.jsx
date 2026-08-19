import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Shop() {
  return (
    <>
      <Header />

    {/* ========== PAGE TITLE ========== */}
    <section className="py-16 px-4 text-center border-b border-gray-100">
        <h2 className="text-5xl font-black text-gray-900 mb-3">SHOP ALL</h2>
        <p className="text-gray-500 text-sm">Discover all Pocket Blush shades</p>
    </section>

    {/* ========== PRODUCT GRID ========== */}
    <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                <div className="product-card bg-white rounded-lg overflow-hidden border border-gray-100">
                    <div className="overflow-hidden bg-gray-100 h-72">
                        <img src="images/piggy.png" alt="Piggy" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Piggy</p>
                        <h3 className="text-lg font-black mb-2">POCKET BLUSH</h3>
                        <p className="text-sm text-gray-600 mb-4">Limited edition shade</p>
                        <span className="text-lg font-bold">$25.00</span>
                    </div>
                </div>

                <div className="product-card bg-white rounded-lg overflow-hidden border border-gray-100">
                    <div className="overflow-hidden bg-gray-100 h-72">
                        <img src="images/tanline.png" alt="Tan Line" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Tan Line</p>
                        <h3 className="text-lg font-black mb-2">POCKET BLUSH</h3>
                        <p className="text-sm text-gray-600 mb-4">Limited edition shade</p>
                        <span className="text-lg font-bold">$25.00</span>
                    </div>
                </div>

                <div className="product-card bg-white rounded-lg overflow-hidden border border-gray-100">
                    <div className="overflow-hidden bg-gray-100 h-72">
                        <img src="images/juicebox.png" alt="Juice Box" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Juice Box</p>
                        <h3 className="text-lg font-black mb-2">POCKET BLUSH</h3>
                        <p className="text-sm text-gray-600 mb-4">Limited edition shade</p>
                        <span className="text-lg font-bold">$25.00</span>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {/* ========== FOOTER ========== */}
    <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div>
                    <h3 className="text-2xl font-black mb-4">rhode beauty</h3>
                    <p className="text-gray-400 text-sm">Inclusive Shades. Flawless Formula. For All of Us</p>
                </div>
                <div>
                    <h4 className="font-black text-lg mb-4">SHOP</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="shop.html" className="hover:text-white transition">All Products</a></li>
                        <li><a href="shop.html" className="hover:text-white transition">Cheek</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black text-lg mb-4">COMPANY</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="about.html" className="hover:text-white transition">About Us</a></li>
                        <li><a href="contact.html" className="hover:text-white transition">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black text-lg mb-4">FOLLOW US</h4>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-400 hover:text-white text-xl transition"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl transition"><i className="fab fa-tiktok"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl transition"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; 2026 RHODE Beauty. All rights reserved.</p>
            </div>
        </div>
    </footer>



    </>
  );
}
