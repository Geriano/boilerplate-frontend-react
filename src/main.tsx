import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom"
import DashboardLayout from './Layouts/DashboardLayout'

declare global {
  interface Window { components: {
    [name: string]: () => JSX.Element
  }; }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<DashboardLayout />}></Route>
      ))} />
    </Provider>
  </React.StrictMode>
)