import { Action, ReducerState, reducer } from ".";
import { getProperties } from "../api";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";

export interface IContext extends ReducerState {
  dispatch?: Dispatch<Action>;
};

const Context = createContext<IContext | null>(null);

const ConfigurationContext = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, );

  useEffect(() => {
    async function fetchData() {
      const rentalProperties = await getProperties();
      dispatch(Actions.)
    }
  });

  const value: IContext = {
    ...state,
    dispatch,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export { ConfigurationContext, Context };
