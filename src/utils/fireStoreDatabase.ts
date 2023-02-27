import { VehicleProps } from '@/types/VehiclesTypes';
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db, vehiclesCollection } from 'firebaseEnv';
import { Dispatch, SetStateAction } from 'react';

export const fetchVehicles = async (setVehicles: Dispatch<SetStateAction<VehicleProps[]>>) => {
  onSnapshot(vehiclesCollection, (snapshot) => {
    const vehicles = snapshot.docs.map((doc) => doc.data() as VehicleProps);
    setVehicles(vehicles);
  });
};

export const postVehicles = async (vehicleToPost: VehicleProps) => {
  await addDoc(vehiclesCollection, vehicleToPost);
};

export const deleteVehicles = async (vehicleToDeleteId: string) => {
  const q = query(collection(db, 'Vehicles'), where('vehicleId', '==', vehicleToDeleteId));
  const querySnapshot = await getDocs(q);
  let docId = '';
  querySnapshot.forEach(async (doc) => {
    docId = doc.id;
  });
  const vehicleToDelete = doc(db, 'Vehicles', docId);
  await deleteDoc(vehicleToDelete);
};

export const updateVehicles = async (vehicleToUpdateid: string, UpdateData: VehicleProps) => {
  const q = query(collection(db, 'Vehicles'), where('vehicleId', '==', vehicleToUpdateid));
  const querySnapshot = await getDocs(q);
  let docId = '';
  querySnapshot.forEach(async (doc) => {
    docId = doc.id;
  });
  const vehicleDoc = doc(db, 'Vehicles', docId);
  await updateDoc(vehicleDoc, UpdateData);
};
