import { ReactNode, createContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { CloudImagesArrayProps, FirebaseVehicleProps, ImageFile } from '@/types/VehiclesTypes';
import { StorageReference } from 'firebase/storage';
import { fetchVehicles, updateVehicles } from '@/utils/fireStoreDatabase';
import { deleteImageByURL } from '@/utils/fireStorage';

type VehiclesContextType = {
  vehicles: FirebaseVehicleProps[];
  vehicleItemImages: CloudImagesArrayProps;
  newMainImage: ImageFile[];
  newImages: ImageFile[];
  setNewImages: Dispatch<SetStateAction<ImageFile[]>>;
  setNewMainImage: Dispatch<SetStateAction<ImageFile[]>>;
  setVehicleItemImages: Dispatch<SetStateAction<CloudImagesArrayProps>>;
  setVehicles: Dispatch<SetStateAction<FirebaseVehicleProps[]>>;
  handleDeleteSingleImage: (vehicle: FirebaseVehicleProps, imageToDelete: string) => void;
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const VehiclesContext = createContext({} as VehiclesContextType);

export function VehiclesContextProvider({ children }: CyclesContextProviderProps) {
  const [vehicles, setVehicles] = useState<FirebaseVehicleProps[]>([]);
  const [vehicleItemImages, setVehicleItemImages] = useState<CloudImagesArrayProps>([]);
  const [newMainImage, setNewMainImage] = useState<ImageFile[]>([]);
  const [newImages, setNewImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    fetchVehicles(setVehicles);
  }, []);

  const handleDeleteSingleImage = (vehicle: FirebaseVehicleProps, imageToDelete: string) => {
    const imageInfo = vehicleItemImages.find((image) => image.name === imageToDelete);
    const remainingImages = vehicleItemImages.filter((image) => image.name !== imageToDelete);

    deleteImageByURL(vehicle.vehicleId, imageInfo!.name, vehicleItemImages, setVehicleItemImages);

    if (imageInfo!.name !== 'mainImage') {
      const mainImage = remainingImages.find((image) => image.name === 'mainImage');
      const images = remainingImages.filter((image) => image.name !== 'mainImage');
      updateVehicles(vehicle.vehicleId, {
        ...vehicle,
        mainImageUrl: mainImage!,
        imagesUrl: images,
      });
      return;
    }

    updateVehicles(vehicle.vehicleId, { ...vehicle, mainImageUrl: { name: '', url: '' } });
    setVehicleItemImages(remainingImages);
  };

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        vehicleItemImages,
        newMainImage,
        newImages,
        setNewImages,
        setNewMainImage,
        setVehicleItemImages,
        setVehicles,
        handleDeleteSingleImage,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}
