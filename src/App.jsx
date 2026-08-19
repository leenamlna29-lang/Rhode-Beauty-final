import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Skincare from './pages/Skincare'
import LipCheek from './pages/LipCheek'
import Sets from './pages/Sets'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import UserDashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'

// Protected route — requires login
function RequireAuth({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" replace />
}

// Admin-only route
function RequireAdmin({ children }) {
  const { currentUser, userRole } = useAuth()
  if (!currentUser) return <Navigate to="/login" replace />
  if (userRole !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                   element={<Home />} />
      <Route path="/about"              element={<About />} />
      <Route path="/shop"               element={<Shop />} />
      <Route path="/skincare"           element={<Skincare />} />
      <Route path="/lip-cheek"          element={<LipCheek />} />
      <Route path="/sets"               element={<Sets />} />
      <Route path="/contact"            element={<Contact />} />
      <Route path="/login"              element={<Login />} />
      <Route path="/cart"               element={<Cart />} />
      <Route path="/checkout"           element={<RequireAuth><Checkout /></RequireAuth>} />
      <Route path="/order-confirmation" element={<RequireAuth><OrderConfirmation /></RequireAuth>} />
      <Route path="/dashboard"          element={<RequireAuth><UserDashboard /></RequireAuth>} />
      <Route path="/admin"              element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
