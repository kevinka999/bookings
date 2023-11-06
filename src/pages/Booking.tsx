import { useContext } from "react";
import { Context } from "../context";
import { PropertyCard } from "../components";

export const Booking = () => {
  const { rentalProperties } = useContext(Context);
  
  return (
    <div>
      <h1>page</h1>
      <div className="grid grid-cols-1 md:grid-cols-6">
        {rentalProperties.map((property, idx) => (
          <PropertyCard key={idx} property={property} />
        ))}
      </div>
    </div>
  );
};
