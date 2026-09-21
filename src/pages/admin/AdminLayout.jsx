import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
