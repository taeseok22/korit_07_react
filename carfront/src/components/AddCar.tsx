import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Car } from "../types";
import { useState } from "react";
import  { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";

function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [e.target.name]: e.target.value});
  }
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars']});
      handleClickClose();
    },
    onError: error => {
      console.log(error);
    }
  });

  const handleSave = () => {
    mutate(car);
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0
    });
    handleClickClose();
  }
  return (
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
          <input type="text" name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} /><br />
          <input type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} /><br />
          <input type="text" name="color" placeholder="Color" value={car.color} onChange={handleChange} /><br />
          <input type="text" name="registrationNumber" placeholder="Registration Number" value={car.registrationNumber} onChange={handleChange} /><br />
          <input type="number" name="modelYear" placeholder="Model Year" value={car.modelYear} onChange={handleChange} /><br />
          <input type="number" name="price" placeholder="Price" value={car.price} onChange={handleChange} /><br />
`        </DialogContent>
        <DialogActions>
          <button onClick={handleSave}>Save | 저장</button>
          <button onClick={handleClickClose}>Cancel | 취소</button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddCar;