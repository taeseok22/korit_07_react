import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Car } from "../types";
import { useState } from "react";
import  { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";


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
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Add New Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleSave}>Save | 저장</button>
          <button onClick={handleClickClose}>Cancel | 취소</button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddCar;