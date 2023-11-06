import { RentalProperty } from "../types";

const rentalPropertiesMock: RentalProperty[] = [
  {
    id: "1SkWEjelxA1HgdXYwGOfg",
    name: "House 1",
    picture: "house.jpg",
  },
  {
    id: "VrE88LqzDAhx7uOH5qOnJ",
    name: "House 2",
    picture: "house.jpg",
  },
  {
    id: "BKwDXVJ5O2bxKhA4xLN2J",
    name: "House 3",
    picture: "house.jpg",
  },
  {
    id: "bNAisr6Ci4deGyNGS5i0W",
    name: "House 4",
    picture: "house.jpg",
  },
  {
    id: "xSUgP4S3fq-cF8B9FZFQO",
    name: "House 5",
    picture: "house.jpg",
  },
];

export function getProperties(): Promise<RentalProperty[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rentalPropertiesMock);
    }, 1000);
  });
}
