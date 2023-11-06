import { useContext } from "react";
import { Context } from "../context";
import { PropertyCard } from "../components";

export const Home = () => {
  const { rentalProperties } = useContext(Context);
  
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-6">
        {rentalProperties.map((property, idx) => (
          <PropertyCard key={idx} property={property} />
        ))}
      </div>
    </div>
  );
};
