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
import { db, storage, vehiclesCollection } from 'firebaseEnv';
import { deleteObject, list, ref, StorageReference } from 'firebase/storage';

type VehiclesContextType = {
  vehicles: VehicleProps[];
  mainImage: ImageFile[];
  images: ImageFile[];
  cloudImages: StorageReference[];
  setMainImage: Dispatch<SetStateAction<ImageFile[]>>;
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  setCloudImages: Dispatch<SetStateAction<StorageReference[]>>;
  postVehicles: (vehicleToPost: VehicleProps) => Promise<void>;
  deleteVehicles: (vehicleToDeleteId: string) => Promise<void>;
  updateVehicles: (vehicleToUpdateid: string, vehicleToUpdate: VehicleProps) => Promise<void>;
  fetchImagesUrlList: (vehicleId: string) => Promise<void>;
  deleteImage: (vehicleId: string, cloudImageName: string) => Promise<void>;
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const VehiclesContext = createContext({} as VehiclesContextType);

export function VehiclesContextProvider({ children }: CyclesContextProviderProps) {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [mainImage, setMainImage] = useState<ImageFile[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [cloudImages, setCloudImages] = useState<StorageReference[]>([]);

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

  const fetchImagesUrlList = async (vehicleId: string) => {
    const response = await list(ref(storage, vehicleId));
    setCloudImages((state) => response.items.reverse());
  };

  const deleteImage = async (vehicleId: string, cloudImageName: string) => {
    const deleteFile = deleteObject(ref(storage, `${vehicleId}/${cloudImageName}`));
    const remainingImages = cloudImages.filter((image) => image.name !== cloudImageName);
    setCloudImages((state) => remainingImages);
  };

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        mainImage,
        images,
        cloudImages,
        setMainImage,
        setImages,
        setCloudImages,
        postVehicles,
        deleteVehicles,
        updateVehicles,
        fetchImagesUrlList,
        deleteImage,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}
