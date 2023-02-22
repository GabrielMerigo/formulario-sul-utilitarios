import { api } from '@/utils/axios';
import { ReactNode, createContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { VehicleProps, ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db, vehiclesCollection } from 'firebaseEnv';

type VehiclesContextType = {
  vehicles: VehicleProps[];
  mainImage: ImageFile[];
  images: ImageFile[];
  setMainImage: Dispatch<SetStateAction<ImageFile[]>>;
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  postVehicles: (vehicleToPost: VehicleProps) => Promise<void>;
  deleteVehicles: (vehicleToDeleteId: string) => Promise<void>;
  updateVehicles: (vehicleToUpdateid: string, vehicleToUpdate: VehicleProps) => Promise<void>;
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const VehiclesContext = createContext({} as VehiclesContextType);

export function VehiclesContextProvider({ children }: CyclesContextProviderProps) {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [mainImage, setMainImage] = useState<ImageFile[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    onSnapshot(vehiclesCollection, (snapshot) => {
      setVehicles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const postVehicles = async (vehicleToPost: VehicleProps) => {
    await addDoc(vehiclesCollection, vehicleToPost);
  };

  const deleteVehicles = async (vehicleToDeleteId: string) => {
    const taskDoc = doc(db, 'Vehicles', vehicleToDeleteId);
    await deleteDoc(taskDoc);
  };

  const updateVehicles = async (vehicleToUpdateid: string, vehicleToUpdate: VehicleProps) => {
    const taskDoc = doc(db, 'Vehicles', vehicleToUpdateid);
    const newTaskText = vehicleToUpdate;
    await updateDoc(taskDoc, newTaskText);
  };

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        mainImage,
        images,
        setMainImage,
        setImages,
        postVehicles,
        deleteVehicles,
        updateVehicles,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}
