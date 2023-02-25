import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import './index.css'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom"
import './interceptor'
import axios from 'axios'
import { route } from './_backend/routes'

import DashboardLayout from './Layouts/DashboardLayout'
import AuthLayout from './Layouts/AuthLayout'
import Login from './Pages/Auth/Login'
import Setting from './Pages/Setting'
import General from './Pages/Setting/General'
import Permission from './Pages/Setting/Permission'
import Role from './Pages/Setting/Role'
import User from './Pages/Setting/User'
import RolePermissionConfiguration from './Pages/Setting/Role/Configuration'
import UserPermissionConfiguration from './Pages/Setting/UserPermission/Configuration'
import UserPermission from './Pages/Setting/UserPermission'
import UserRoleConfiguration from './Pages/Setting/UserRole/Configuration'
import UserRole from './Pages/Setting/UserRole'
import Translation from './Pages/Setting/Translation'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'

Object.defineProperties(window, {
  axios: {
    value: axios,
  },
  route: {
    value: route,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={createBrowserRouter(createRoutesFromElements(
        <>
          <Route path='/' element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/setting' element={<Setting />}>
              <Route path='/setting' element={<Navigate to="/setting/general" />} />
              <Route path='/setting/general' element={<General />} />
              <Route path='/setting/translation' element={<Translation />} />
              <Route path='/setting/permission' element={<Permission />} />
              <Route path='/setting/role' element={<Role />}>
                <Route path='/setting/role' />
                <Route path='/setting/role/:id' element={<RolePermissionConfiguration />} />
              </Route>
              <Route path='/setting/user' element={<User />} />
              <Route path='/setting/user/permission' element={<UserPermission />}>
                <Route path='/setting/user/permission' />
                <Route path='/setting/user/permission/:id' element={<UserPermissionConfiguration />} />
              </Route>
              <Route path='/setting/user/role' element={<UserRole />}>
                <Route path='/setting/user/role' />
                <Route path='/setting/user/role/:id' element={<UserRoleConfiguration />} />
              </Route>
            </Route>
          </Route>
          <Route path='/' element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </>
      ))} />
    </Provider>
  </React.StrictMode>
)