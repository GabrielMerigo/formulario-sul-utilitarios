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
import { toast } from 'react-toastify';
import { deleteVehicleImagesFolder } from './fireStorage';

export const fetchVehicles = async (setVehicles: Dispatch<SetStateAction<VehicleProps[]>>) => {
  try {
    onSnapshot(vehiclesCollection, (snapshot) => {
      const vehicles = snapshot.docs.map((doc) => doc.data() as VehicleProps);
      setVehicles(vehicles);
    });
  } catch ({ message, name }) {
    toast('Houve um erro ao carregar os dados veiculos:\n' + `${message}:${name}`);
  }
};

export const postVehicles = async (vehicleToPost: VehicleProps) => {
  try {
    await addDoc(vehiclesCollection, vehicleToPost);
    toast('Veiculo adicionado!');
  } catch ({ message, name }) {
    toast('Houve um erro com o cadastro do veiculo:\n' + `${message}:${name}`);
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
    toast('O veiculo e todas as suas imagens foram excluídas!');
  } catch ({ message, name }) {
    toast('Houve um erro com a exclusão do veiculo:\n' + `${message}:${name}`);
  }
};

export const updateVehicles = async (vehicleToUpdateid: string, UpdateData: VehicleProps) => {
  try {
    const q = query(collection(db, 'Vehicles'), where('vehicleId', '==', vehicleToUpdateid));
    const querySnapshot = await getDocs(q);
    let docId = '';
    querySnapshot.forEach(async (doc) => {
      docId = doc.id;
    });
    const vehicleDoc = doc(db, 'Vehicles', docId);
    await updateDoc(vehicleDoc, UpdateData);
    toast('Dados do veiculo Atualizados!');
  } catch ({ message, name }) {
    toast('Houve um erro com a atualização de dados do veiculo:\n' + `${message}:${name}`);
  }
};
