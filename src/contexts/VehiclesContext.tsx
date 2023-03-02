import { ReactNode, createContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { VehicleProps, ImageFile } from '@/types/VehiclesTypes';
import { StorageReference } from 'firebase/storage';
import { fetchVehicles } from '@/utils/fireStoreDatabase';

type VehiclesContextType = {
  vehicles: VehicleProps[];
  mainImage: ImageFile[];
  images: ImageFile[];
  cloudImages: StorageReference[];
  setVehicles: Dispatch<SetStateAction<VehicleProps[]>>;
  setMainImage: Dispatch<SetStateAction<ImageFile[]>>;
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  setCloudImages: Dispatch<SetStateAction<StorageReference[]>>;
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
    fetchVehicles(setVehicles);
  }, []);

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        mainImage,
        images,
        cloudImages,
        setVehicles,
        setMainImage,
        setImages,
        setCloudImages,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}
