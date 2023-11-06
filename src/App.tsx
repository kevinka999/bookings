import { AppRouter } from "./Router";
import { GlobalContext } from "./context";
import "./global.css";

export const App = () => {
  return (
    <GlobalContext>
      <AppRouter />
    </GlobalContext>
  )
};
