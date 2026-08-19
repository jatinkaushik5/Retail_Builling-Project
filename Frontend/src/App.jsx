import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import View from './pages/View'
import { Navigate, Route, Routes } from 'react-router-dom'
import Users from './pages/User/Users'
import { Toaster } from 'react-hot-toast'
import Inventory from './pages/Inventory/Inventory'
import Billing from './pages/Billing/Billing'
import Invoice from './pages/Billing/Invoice'
import api from './axiosConfig'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [roles, setroles] = useState([])

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/me",{
        withCredentials:true
      });
      console.log("response: ", response.data);
      setUser(response.data);
      setroles(response.data.roles)
      return response.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    const roles = user?.roles || [];
    const hasAdminRole = Array.isArray(roles)
      ? roles.includes("ROLE_ADMIN")
      : roles.toString().includes("ROLE_ADMIN");

    if (!hasAdminRole) {
      return <Navigate to="/view" replace />;
    }
    return children;
  };

  return (
    <>
      <div><Toaster/></div>
      <Routes>
        <Route path='/' element={user ? <Navigate to='/view' replace /> : <Login fetchUser={fetchUser} setUser={setUser} />} />
        <Route path='/view' element={<ProtectedRoute><View user={user} setUser={setUser} fetchUser={fetchUser} /></ProtectedRoute>}>
          <Route index element={<Dashboard user={user} roles={roles} />} />
          <Route path='dashboard' element={<Dashboard user={user} />} />
          <Route path='users' element={<AdminRoute><Users user={user} roles={roles} /></AdminRoute>} />
          <Route path='inventory' element={<AdminRoute><Inventory user={user} /></AdminRoute>} />
          <Route path='billing' element={<Billing user={user} />} />
        </Route>
        <Route path='invoice' element={<ProtectedRoute><Invoice user={user} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/view" replace />} />
      </Routes>
    </>
  )
}

export default App
