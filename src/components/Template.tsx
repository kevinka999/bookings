import { Outlet, Link, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"

export const Template = () => {
  const location = useLocation()
  const isOnPath = (path: string) => location?.pathname === path

  return (
    <div>
      <nav className="flex flex-row justify-center gap-4 p-5">
        <Link to={"/"}>
          <button
            className={twMerge(
              "text-blue-200 hover:font-bold",
              isOnPath("/") && "font-extrabold text-blue-400",
            )}
            disabled={isOnPath("/")}
          >
            Home
          </button>
        </Link>

        <Link to={"/bookings"}>
          <button
            className={twMerge(
              "text-blue-200 hover:font-bold",
              isOnPath("/bookings") && "font-extrabold text-blue-400",
            )}
            disabled={isOnPath("/bookings")}
          >
            My bookings
          </button>
        </Link>
      </nav>

      <Outlet />
    </div>
  )
}
