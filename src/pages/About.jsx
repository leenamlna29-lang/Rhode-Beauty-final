import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Header />

    {/* ========== ABOUT HERO ========== */}
    <section className="py-24 px-4 text-center bg-pink-50">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-black text-gray-900 mb-6">About RHODE</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
                Rhode is Hailey Bieber's skin-focused beauty brand, built around the belief that great skin is the best foundation.
                Our products are designed to nourish, protect, and enhance your natural beauty — simply and effortlessly.
            </p>
        </div>
    </section>

    {/* ========== MISSION ========== */}
    <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h3 className="text-4xl font-black mb-6">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                    We believe in skin that looks and feels its best — dewy, healthy, and naturally radiant. 
                    Rhode was founded on the idea that beauty routines should feel good, not overwhelming.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Every product is thoughtfully formulated to be inclusive, effective, and a little bit fun — 
                    because beauty should be joyful.
                </p>
            </div>
            <div className="bg-pink-100 rounded-2xl h-72 flex items-center justify-center">
                <p className="text-pink-400 font-black text-2xl">rhode beauty</p>
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
