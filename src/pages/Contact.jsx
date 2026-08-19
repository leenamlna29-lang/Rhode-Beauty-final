import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Contact() {
  return (
    <>
      <Header />

    {/* ========== CONTACT ========== */}
    <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-black text-gray-900 mb-3">CONTACT US</h2>
                <p className="text-gray-500 text-sm">We'd love to hear from you</p>
            </div>

            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input type="text" placeholder="Your name"
                           className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input type="email" placeholder="your@email.com"
                           className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                    <textarea rows="5" placeholder="Write your message..."
                              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition rounded-lg resize-none"></textarea>
                </div>
                <button type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 transition rounded-lg">
                    SEND MESSAGE
                </button>
            </form>
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
