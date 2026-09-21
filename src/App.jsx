import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Splash from './components/Splash'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import CateringReservation from './pages/CateringReservation'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import MenuManagement from './pages/admin/MenuManagement'
import OrderManagement from './pages/admin/OrderManagement'
import ReservationManagement from './pages/admin/ReservationManagement'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  
  return (
    <div className="min-h-screen flex flex-col">
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/catering" element={<CateringReservation />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="reservations" element={<ReservationManagement />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
