import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { Action, ActionsType, ReducerState, reducer } from ".";
import { getProperties } from "../api";
import { Booking } from "../types";

export interface IContext extends ReducerState {
  dispatch?: Dispatch<Action>;
};

const initialState: ReducerState = {
  bookings: [],
  rentalProperties: [],
};

export const Context = createContext<IContext>({ ...initialState });

export const GlobalContext = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const rentalProperties = await getProperties();
      dispatch({
        type: ActionsType.SET_RENTAL_PROPERTIES,
        payload: rentalProperties
      })
    }

    fetchData()
  }, []);

  useEffect(() => {
    const storagedBooking = localStorage.getItem("bookings");
    if (!storagedBooking) return;

    const bookings = JSON.parse(storagedBooking) as Booking[];
    dispatch({
      type: ActionsType.SET_BOOKINGS,
      payload: bookings,
    })
  }, [])

  return (
    <Context.Provider value={{
      ...state,
      dispatch
    }}>
      {props.children}
    </Context.Provider>
  )
};
