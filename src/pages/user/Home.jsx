import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function Home() {
  const { currentUser, userRole, mockLogout, mockLogin } = useAuth();

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-primary-dark">Rhode Beauty</h1>
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Role: {userRole}</span>
              <button 
                onClick={mockLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-sm font-medium"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button 
                onClick={() => mockLogin('user')}
                className="px-6 py-2 bg-primary text-white rounded-full shadow-sm hover:bg-primary-dark transition-colors font-medium"
              >
                Login as User
              </button>
              <button 
                onClick={() => mockLogin('admin')}
                className="px-6 py-2 bg-gray-800 text-white rounded-full shadow-sm hover:bg-black transition-colors font-medium"
              >
                Login as Admin
              </button>
            </div>
          )}
        </header>

        <main className="glass p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Rhode Beauty</h2>
          <p className="text-gray-600 mb-8">
            Experience the glow. Discover our curated collection of premium skincare and beauty products designed for your everyday aesthetic.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-primary font-medium">Product {item}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">Peptide Glazing Fluid</h3>
                <p className="text-sm text-gray-500">$29.00</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
