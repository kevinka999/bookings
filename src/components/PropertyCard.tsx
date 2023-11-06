import { RentalProperty } from "../types"

export const PropertyCard = ({ property }: { property: RentalProperty }) => {
  return (
    <div className="bg-slate-400 p-4 flex flex-row rounded-sm">
      <img src={property.picture} className="rounded-sm w-[200px]" alt="Rental Property"/>
      <p>{property.name}</p>
    </div>
  )
}