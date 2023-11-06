export interface Booking {
  id: string;
  rentalPropertyId: string;
  startDate: Date;
  endDate: Date;
}

export interface RentalProperty {
  id: string;
  name: string;
  picture: string;
}
