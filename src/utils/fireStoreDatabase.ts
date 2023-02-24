import { VehicleProps } from '@/types/VehiclesTypes';
import { addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, vehiclesCollection } from 'firebaseEnv';
import { Dispatch, SetStateAction } from 'react';

export const fetchVehicles = async (setVehicles: Dispatch<SetStateAction<VehicleProps[]>>) => {
  onSnapshot(vehiclesCollection, (snapshot) => {
    setVehicles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export const postVehicles = async (vehicleToPost: VehicleProps) => {
  await addDoc(vehiclesCollection, vehicleToPost);
};

export const deleteVehicles = async (vehicleToDeleteId: string) => {
  const taskDoc = doc(db, 'Vehicles', vehicleToDeleteId);
  await deleteDoc(taskDoc);
};

export const updateVehicles = async (vehicleToUpdateid: string, vehicleToUpdate: VehicleProps) => {
  const taskDoc = doc(db, 'Vehicles', vehicleToUpdateid);
  const newTaskText = vehicleToUpdate;
  await updateDoc(taskDoc, newTaskText);
};
