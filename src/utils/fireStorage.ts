import { ImageFile } from '@/types/VehiclesTypes';
import {
  deleteObject,
  getDownloadURL,
  list,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import { storage } from 'firebaseEnv';
import { Dispatch, SetStateAction } from 'react';

export const fetchMainImageUrl = async (
  vehicleId: string,
  setState: Dispatch<SetStateAction<string>>
) => {
  const response = await getDownloadURL(ref(storage, `${vehicleId}/mainImage`));
  setState(response);
};

export const fetchImageUrl = async (
  vehicleId: string,
  cloudImage: StorageReference,
  setState: Dispatch<SetStateAction<string>>
) => {
  const response = await getDownloadURL(ref(storage, `${vehicleId}/${cloudImage.name}`));
  setState(response);
};

export const setManyImagesUrls = (
  vehicleId: string,
  cloudImageArray: StorageReference[],
  setState: Dispatch<SetStateAction<string[]>>
) => {
  cloudImageArray.forEach((image) => {
    getDownloadURL(ref(storage, `${vehicleId}/${image.name}`)).then((url: string) => {
      setState((state: string[]) => [...state, url]);
    });
  });
};

export const fetchImagesReferenceList = async (
  vehicleId: string,
  setState: Dispatch<SetStateAction<StorageReference[]>>
) => {
  const response = await list(ref(storage, vehicleId));
  setState((state) => response.items.reverse());
};

export const deleteImage = async (
  vehicleId: string,
  cloudImageName: string,
  cloudImages: StorageReference[],
  setState: Dispatch<SetStateAction<StorageReference[]>>
) => {
  const deleteFile = deleteObject(ref(storage, `${vehicleId}/${cloudImageName}`));
  const remainingImages = cloudImages.filter((image) => image.name !== cloudImageName);
  setState((state) => remainingImages);
};

export const uploadMainImage = (vehicleId: string, mainImage: ImageFile[]) => {
  const mainImageStorageRef = ref(storage, `${vehicleId}/mainImage`);

  uploadBytes(mainImageStorageRef, mainImage[0]).then((snapshot) => {
    console.log('Images Uploaded');
  });
};

export const uploadImages = (vehicleId: string, Images: ImageFile[]) => {
  Images.forEach((image, index) => {
    const ImagesStorageRef = ref(storage, `${vehicleId}/${index}`);
    uploadBytes(ImagesStorageRef, image).then((snapshot) => {
      console.log('Images Uploaded');
    });
  });
};
