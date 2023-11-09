import { ShowToast } from "../components"
import { Booking, RentalProperty } from "../types"

export enum ActionsType {
  SET_RENTAL_PROPERTIES,
  SET_BOOKINGS,
  SET_TOAST,
}

export interface Action {
  type: ActionsType
  payload: any
}

export interface ReducerState {
  bookings: Booking[]
  rentalProperties: RentalProperty[]
  toast?: ShowToast
}

export const reducer = (state: ReducerState, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case ActionsType.SET_RENTAL_PROPERTIES:
      return {
        ...state,
        rentalProperties: payload,
      }
    case ActionsType.SET_BOOKINGS:
      return {
        ...state,
        bookings: payload,
      }
    case ActionsType.SET_TOAST:
      return {
        ...state,
        toast: payload,
      }
    default:
      return state
  }
}
