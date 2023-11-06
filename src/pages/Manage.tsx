import { useContext } from "react";
import { Context } from "../context";
import { PropertyCard } from "../components";

export const Manage = () => {
  const { rentalProperties } = useContext(Context);
  console.log(rentalProperties)
  return (
    <div className="">
      <h1>page</h1>
      <div className="grid grid-cols-1 md:grid-cols-6">
        {rentalProperties.map((property, idx) => (
          <PropertyCard key={idx} property={property} />
        ))}
      </div>
    </div>
  );
};
