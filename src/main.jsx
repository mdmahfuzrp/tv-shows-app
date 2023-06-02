import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ShowList from './pages/ShowList.jsx'
import ShowDetails from './pages/ShowDetails'
import Home from './Layout/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyBookings from './pages/MyBookings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <ShowList></ShowList>
      },
      {
        path: '/show/:showId',
        element: <ShowDetails />,
        loader: ({ params }) =>
          fetch(`https://api.tvmaze.com/shows/${params.showId}`).then((response) =>
            response.json()
          ),
      },
      {
        path: '/myBookings',
        element: <MyBookings></MyBookings>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
