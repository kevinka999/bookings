import { AppRouter } from "./Router"
import { Toast } from "./components"
import { GlobalContext } from "./context"
import "./global.css"

export const App = () => {
  return (
    <GlobalContext>
      <AppRouter />
      <Toast />
    </GlobalContext>
  )
}
