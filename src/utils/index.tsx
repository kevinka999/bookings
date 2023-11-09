import { Booking } from "../types"

function formatDate(date = new Date()) {
  const year = date.toLocaleString("default", { year: "numeric" })
  const month = date.toLocaleString("default", {
    month: "2-digit",
  })
  const day = date.toLocaleString("default", { day: "2-digit" })
  return [year, month, day].join("-")
}

function validateBooking(bookings: Booking[], bookingToValidate: Booking) {
  if (bookings.length === 0) return true
  const bookingsFromProperty = bookings.filter(
    (booking) =>
      booking.rentalPropertyId === bookingToValidate.rentalPropertyId,
  )
  if (bookingsFromProperty.length === 0) return true

  const { startDate: wishedStartDate, endDate: wishedEndDate } =
    bookingToValidate

  return bookingsFromProperty.some((booking) => {
    const startDate = new Date(booking.startDate)
    const endDate = new Date(booking.endDate)

    if (wishedStartDate >= startDate && wishedStartDate <= endDate) return false
    if (wishedEndDate >= startDate && wishedEndDate <= endDate) return false
    return true
  })
}

export { formatDate, validateBooking }
