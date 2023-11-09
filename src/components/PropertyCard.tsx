import { twMerge } from "tailwind-merge"
import { RentalProperty } from "../types"

interface PropertyCardProps {
  property: RentalProperty
  className?: string
  children: React.ReactNode
}

export const PropertyCard = ({
  property,
  children,
  className,
}: PropertyCardProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col gap-4 rounded-xl bg-slate-50 p-4 shadow-md",
        className,
      )}
    >
      <img
        src={property.picture}
        alt="Rental Property"
        className="h-[250px] w-full"
      />
      <h1 className="text-xl">{property.name}</h1>

      {children}
    </div>
  )
}
