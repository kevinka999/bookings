import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home, Manage, Booking } from "./pages"
import { Template } from "./components"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bookings",
        element: <Manage />,
      },
      {
        path: "/booking/:id",
        element: <Booking />,
      },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
