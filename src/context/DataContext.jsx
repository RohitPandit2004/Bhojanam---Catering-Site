import { createContext, useContext, useState } from 'react'
import { foods as seedFoods, seedOrders, seedReservations } from '../data/mockData'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [foods, setFoods] = useState(seedFoods)
  const [orders, setOrders] = useState(seedOrders)
  const [reservations, setReservations] = useState(seedReservations)

  function addFood(food) {
    setFoods((prev) => [...prev, { ...food, id: 'f' + Date.now() }])
  }

  function updateFood(id, patch) {
    setFoods((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)))
  }

  function deleteFood(id) {
    setFoods((prev) => prev.filter((f) => f.id !== id))
  }

  function placeOrder(order) {
    const id = 'BH' + Math.floor(1000 + Math.random() * 9000)
    const newOrder = { ...order, id, date: new Date().toISOString().slice(0, 10), status: 'Placed' }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  function placeReservation(res) {
    const id = 'CR' + Math.floor(100 + Math.random() * 900)
    const newRes = { ...res, id, status: 'Requested' }
    setReservations((prev) => [newRes, ...prev])
    return newRes
  }

  function updateReservationStatus(id, status) {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <DataContext.Provider
      value={{
        foods,
        addFood,
        updateFood,
        deleteFood,
        orders,
        placeOrder,
        updateOrderStatus,
        reservations,
        placeReservation,
        updateReservationStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
