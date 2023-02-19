import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import './interceptor'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import DashboardLayout from './Layouts/DashboardLayout'
import AuthLayout from './Layouts/AuthLayout'
import Login from './Pages/Auth/Login'
import Setting from './Pages/Setting'
import General from './Pages/Setting/General'
import Permission from './Pages/Setting/Permission'
import Role from './Pages/Setting/Role'
import User from './Pages/Setting/User'
import Configuration from './Pages/Setting/Role/Configuration'

declare global {
  interface Window { components: {
    [name: string]: () => JSX.Element
  }; }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={createBrowserRouter(createRoutesFromElements(
        <>
          <Route path='/' element={<DashboardLayout />}>
            <Route path='/setting' element={<Setting />}>
              <Route path='/setting/general' element={<General />} />
              <Route path='/setting/permission' element={<Permission />} />
              <Route path='/setting/role' element={<Role />}>
                <Route path='/setting/role' />
                <Route path='/setting/role/:id' element={<Configuration />} />
              </Route>
              <Route path='/setting/user' element={<User />} />
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