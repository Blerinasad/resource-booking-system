import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

import LoginPage     from './pages/auth/LoginPage.jsx'
import RegisterPage  from './pages/auth/RegisterPage.jsx'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import DashboardPage   from './pages/dashboard/DashboardPage.jsx'
import BookingsPage    from './pages/bookings/BookingsPage.jsx'
import ResourcesPage   from './pages/resources/ResourcesPage.jsx'
import AnalyticsPage   from './pages/analytics/AnalyticsPage.jsx'
import UsersPage       from './pages/users/UsersPage.jsx'
import NotFoundPage    from './pages/NotFoundPage.jsx'
import Loader          from './components/common/Loader.jsx'

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <Loader fullscreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <Loader fullscreen />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route index                 element={<DashboardPage />} />
        <Route path="bookings"       element={<BookingsPage />} />
        <Route path="resources"      element={<ResourcesPage />} />
        <Route path="analytics"      element={<AnalyticsPage />} />
        <Route path="users"          element={<UsersPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
