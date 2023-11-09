import { useContext } from "react"
import { Context } from "../context"
import { Button, PropertyCard } from "../components"
import { Toast } from "../components/Toast"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const { rentalProperties } = useContext(Context)
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {rentalProperties.map((property, idx) => (
        <PropertyCard key={idx} property={property}>
          <Button onClick={() => navigate(`/booking/${property.id}`)}>
            See details
          </Button>
        </PropertyCard>
      ))}
      <Toast />
    </div>
  )
}
