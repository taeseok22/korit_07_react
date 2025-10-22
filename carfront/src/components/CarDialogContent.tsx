import { ChangeEvent } from "react";
import { Car } from "../types";
import { DialogContent } from "@mui/material";

type DialogFormProps = {
  car: Car;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <input type="text" name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} /><br />
      <input type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} /><br />
      <input type="text" name="color" placeholder="Color" value={car.color} onChange={handleChange} /><br />
      <input type="text" name="registrationNumber" placeholder="Registration Number" value={car.registrationNumber} onChange={handleChange} /><br />
      <input type="number" name="modelYear" placeholder="Model Year" value={car.modelYear} onChange={handleChange} /><br />
      <input type="number" name="price" placeholder="Price" value={car.price} onChange={handleChange} /><br />
    </DialogContent>
  )
}

export default CarDialogContent;