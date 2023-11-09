import { useContext, useEffect, useRef } from "react"
import { Context } from "../context"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../components"
import { nanoid } from "nanoid"
import { InputRef } from "../types"
import { validateBooking } from "../utils"

export const Booking = () => {
  const { rentalProperties, bookings, addBooking, showToast } =
    useContext(Context)
  const { id: propertyId } = useParams()
  const navigate = useNavigate()

  const startDateInput = useRef<InputRef>(null)
  const endDateInput = useRef<InputRef>(null)

  const property = rentalProperties.find(
    (property) => property.id === propertyId,
  )

  useEffect(() => {
    if (!propertyId || !property) {
      showToast({
        content: "Property not found",
        type: "warning",
      })
      navigate("/")
    }
  }, [propertyId])

  const handleBook = () => {
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

    const newBooking = {
      id: nanoid(),
      rentalPropertyId: property?.id || "",
      startDate,
      endDate,
    }
    const isDateAvailable = validateBooking(bookings, newBooking)
    if (!isDateAvailable) {
      showToast({
        content: "Booking date isnt available please try other",
        type: "warning",
      })
      return
    }

    addBooking(newBooking)
    showToast({
      content: "Booking made successfully",
      type: "success",
    })
  }

  return (
    <div className="flex w-full flex-col gap-8 p-5 md:flex-row">
      <img
        src={property?.picture}
        alt="Rental Property"
        className="h-[250px] w-full rounded-sm sm:h-[350px] md:w-1/2"
      />

      <div className="flex flex-col gap-8 md:justify-center">
        <h1 className="text-xl font-bold">{property?.name}</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>

        <div className="flex flex-row justify-between gap-2">
          <span className="font-light">From:</span>
          <input ref={startDateInput} type="date" placeholder="Select date" />
        </div>

        <div className="flex flex-row justify-between gap-2">
          <span className="font-light">To:</span>
          <input ref={endDateInput} type="date" placeholder="Select date" />
        </div>

        <Button onClick={handleBook}>Book this house</Button>
      </div>
    </div>
  )
}
