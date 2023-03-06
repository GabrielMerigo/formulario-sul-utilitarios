import { CreateVehicleProps, FirebaseVehicleProps } from '@/types/VehiclesTypes';
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
import { toast } from 'react-toastify';
import { deleteVehicleImagesFolder } from './fireStorage';

export const fetchVehicles = async (
  setVehicles: Dispatch<SetStateAction<FirebaseVehicleProps[]>>
) => {
  try {
    onSnapshot(vehiclesCollection, (snapshot) => {
      const vehicles = snapshot.docs.map((doc) => doc.data() as FirebaseVehicleProps);
      const orderedVehicles = vehicles.sort((a, b) => {
        return b.created_at.toDate().getTime() - a.created_at.toDate().getTime();
      });
      setVehicles(orderedVehicles);
    });
  } catch ({ message, name }) {
    toast('Houve um erro ao carregar os dados veiculos:\n' + `${message}:${name}`, {
      theme: 'dark',
    });
  }
};

export const postVehicles = async (
  vehicleToPost: CreateVehicleProps,
  setLoadingState: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoadingState(true);
    await addDoc(vehiclesCollection, vehicleToPost);
    setLoadingState(false);
  } catch ({ message, name }) {
    setLoadingState(false);
    toast('Houve um erro com o cadastro do veiculo:\n' + `${message}:${name}`, { theme: 'dark' });
  }
};

export const deleteVehicles = async (vehicleToDeleteId: string) => {
  try {
    const q = query(collection(db, 'Vehicles'), where('vehicleId', '==', vehicleToDeleteId));
    const querySnapshot = await getDocs(q);
    let docId = '';
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const vehicleToDelete = doc(db, 'Vehicles', docId);
    await deleteDoc(vehicleToDelete);
    await deleteVehicleImagesFolder(vehicleToDeleteId);
    toast('O veiculo e todas as suas imagens foram excluídas!', { theme: 'dark' });
  } catch ({ message, name }) {
    toast('Houve um erro com a exclusão do veiculo:\n' + `${message}:${name}`, { theme: 'dark' });
  }
};

export const updateVehicles = async (vehicleToUpdateid: string, UpdateData: CreateVehicleProps) => {
  try {
    const q = query(collection(db, 'Vehicles'), where('vehicleId', '==', vehicleToUpdateid));
    const querySnapshot = await getDocs(q);
    let docId = '';
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const vehicleDoc = doc(db, 'Vehicles', docId);
    await updateDoc(vehicleDoc, UpdateData);
  } catch ({ message, name }) {
    toast('Houve um erro com a atualização de dados do veiculo:\n' + `${message}:${name}`, {
      theme: 'dark',
    });
  }
};
