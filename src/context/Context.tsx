import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react"
import { Action, ActionsType, ReducerState, reducer } from "."
import { getProperties } from "../api"
import { Booking } from "../types"
import { ShowToast } from "../components/Toast"

export interface IContext extends ReducerState {
  addBooking: (bookingToAdd: Booking) => void
  updateBooking: (bookingToUpdate: Booking) => void
  deleteBooking: (bookingToDelete: Booking) => void
  showToast: (payload: ShowToast | null) => void
  dispatch?: Dispatch<Action>
}

const initialState: ReducerState = {
  bookings: [],
  rentalProperties: [],
}

export const Context = createContext<IContext>({
  ...initialState,
  addBooking: () => null,
  updateBooking: () => null,
  deleteBooking: () => null,
  showToast: () => null,
})

export const GlobalContext = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchData() {
      const rentalProperties = await getProperties()
      dispatch({
        type: ActionsType.SET_RENTAL_PROPERTIES,
        payload: rentalProperties,
      })
    }

    fetchData()
  }, [])

  useEffect(() => {
    const storagedBooking = localStorage.getItem("bookings")
    if (!storagedBooking) return

    const bookings = JSON.parse(storagedBooking) as Booking[]
    dispatch({
      type: ActionsType.SET_BOOKINGS,
      payload: bookings,
    })
  }, [])

  const showToast = (payload: ShowToast | null) => {
    dispatch({
      type: ActionsType.SET_TOAST,
      payload: payload,
    })
  }

  const addBooking = (bookingToAdd: Booking) => {
    const bookingsUpdated = [...state.bookings, bookingToAdd]
    setBooking(bookingsUpdated)
  }

  const updateBooking = (bookingToUpdate: Booking) => {
    const indexToUpdate = state.bookings.findIndex(
      (booking: Booking) => booking.id === bookingToUpdate.id,
    )
    if (indexToUpdate === -1) return
    const bookingsUpdated = [...state.bookings]
    bookingsUpdated.splice(indexToUpdate, 1, bookingToUpdate)

    setBooking(bookingsUpdated)
  }

  const deleteBooking = (bookingToDelete: Booking) => {
    const indexToDelete = state.bookings.findIndex(
      (booking: Booking) => booking.id === bookingToDelete.id,
    )
    if (indexToDelete === -1) return
    const bookingsUpdated = [...state.bookings]
    bookingsUpdated.splice(indexToDelete, 1)

    setBooking(bookingsUpdated)
  }

  function setBooking(bookings: Booking[]) {
    localStorage.setItem("bookings", JSON.stringify(bookings))
    dispatch({
      type: ActionsType.SET_BOOKINGS,
      payload: bookings,
    })
  }

  return (
    <Context.Provider
      value={{
        ...state,
        addBooking,
        updateBooking,
        deleteBooking,
        showToast,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
