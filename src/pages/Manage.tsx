import { useContext, useRef } from "react"
import { Context } from "../context"
import { Button, PropertyCard } from "../components"
import { Booking, InputRef, RentalProperty } from "../types"
import { formatDate, validateBooking } from "../utils"

interface ManagePropertyProps {
  property: RentalProperty
  booking: Booking
  updateBooking: (bookingToUpdate: Booking) => void
  deleteBooking: (bookingToUpdate: Booking) => void
}

const ManageProperty = ({
  property,
  booking,
  updateBooking,
  deleteBooking,
}: ManagePropertyProps) => {
  const { showToast } = useContext(Context)

  const startDateInput = useRef<InputRef>(null)
  const endDateInput = useRef<InputRef>(null)

  const handleUpdateBooking = () => {
    const unparsedStartDate = startDateInput.current?.value
    const unparsedEndDate = endDateInput.current?.value
    if (!unparsedStartDate || !unparsedEndDate) {
      showToast({
        content: "Please fill booking dates",
        type: "warning",
      })
      return
    }

    const startDate = new Date(unparsedStartDate + "T00:00:00")
    const endDate = new Date(unparsedEndDate + "T00:00:00")
    if (startDate < new Date()) {
      showToast({
        content: "Start date must be after or today",
        type: "warning",
      })
      return
    }

    if (startDate > endDate) {
      showToast({
        content: "End date must be after start date",
        type: "warning",
      })
      return
    }

    updateBooking({
      ...booking,
      startDate,
      endDate,
    })
  }

  return (
    <PropertyCard property={property}>
      <div className="flex flex-row justify-between gap-2">
        <span className="font-light">From:</span>
        <input
          ref={startDateInput}
          type="date"
          placeholder="Select date"
          defaultValue={formatDate(new Date(booking.startDate))}
        />
      </div>

      <div className="flex flex-row justify-between gap-2">
        <span className="font-light">To:</span>
        <input
          ref={endDateInput}
          type="date"
          placeholder="Select date"
          defaultValue={formatDate(new Date(booking.endDate))}
        />
      </div>

      <div className="flex flex-row gap-2">
        <Button onClick={() => handleUpdateBooking()} className="w-full">
          Update
        </Button>
        <Button onClick={() => deleteBooking(booking)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </Button>
      </div>
    </PropertyCard>
  )
}

export const Manage = () => {
  const {
    bookings,
    rentalProperties,
    showToast,
    updateBooking,
    deleteBooking,
  } = useContext(Context)

  const handleUpdateBooking = (bookingToUpdate: Booking) => {
    const isDateAvailable = validateBooking(bookings, bookingToUpdate)
    if (!isDateAvailable) {
      showToast({
        content: "Booking date isnt available please try other",
        type: "warning",
      })
      return
    }

    updateBooking(bookingToUpdate)
    showToast({
      content: "Booking updated successfully",
      type: "success",
    })
  }

  const handleDeleteBooking = (bookingToDelete: Booking) => {
    deleteBooking(bookingToDelete)
    showToast({
      content: "Booking deleted successfully",
      type: "success",
    })
  }

  return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-6 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {bookings.map((booking, idx) => {
        const property = rentalProperties.find(
          (property) => property.id === booking.rentalPropertyId,
        )
        if (!property) return <></>

        return (
          <ManageProperty
            key={idx}
            property={property}
            booking={booking}
            updateBooking={handleUpdateBooking}
            deleteBooking={handleDeleteBooking}
          />
        )
      })}
    </div>
  )
}
