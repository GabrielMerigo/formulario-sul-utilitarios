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
import { setTimeout } from 'timers/promises';

export const fetchMainImageUrl = async (
  vehicleId: string,
  setState: Dispatch<SetStateAction<string>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>
) => {
  setLoadingState(true);
  const response = await getDownloadURL(ref(storage, `${vehicleId}/mainImage`));
  setLoadingState(false);
  setState(response);
};

export const fetchImageUrl = async (
  vehicleId: string,
  cloudImage: StorageReference,
  setState: Dispatch<SetStateAction<string>>
) => {
  try {
    const response = await getDownloadURL(ref(storage, `${vehicleId}/${cloudImage.name}`));
    setState(response);
  } catch ({ name, message }) {
    alert(`Erro ao obter imagem do firebase:\n ${name}:${message}`);
  }
};

export const setManyImagesUrls = (
  vehicleId: string,
  cloudImageArray: StorageReference[],
  setState: Dispatch<SetStateAction<string[]>>
) => {
  cloudImageArray.forEach((image) => {
    getDownloadURL(ref(storage, `${vehicleId}/${image.name}`)).then((url: string) => {
      setState((state: string[]) => [...state, `${url}||${image.name}`]);
    });
  });
};

export const fetchImagesReferenceList = async (
  vehicleId: string,
  setState: Dispatch<SetStateAction<StorageReference[]>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>
) => {
  setLoadingState(true);
  const response = await list(ref(storage, vehicleId));

  setLoadingState(false);
  setState((state) => response.items.reverse());
};

export const deleteImageByStorageReference = async (
  vehicleId: string,
  cloudImageName: string,
  cloudImages: StorageReference[],
  setState: Dispatch<SetStateAction<StorageReference[]>>
) => {
  const deleteFile = deleteObject(ref(storage, `${vehicleId}/${cloudImageName}`));
  const remainingImages = cloudImages.filter((image) => image.name !== cloudImageName);
  setState((state) => remainingImages);
  console.log('Imagem Deletada!');
};

export const deleteImageByURL = async (
  vehicleId: string,
  URLCloudName: string[],
  URLCloudImages: string[],
  setState: Dispatch<SetStateAction<string[]>>
) => {
  const deleteFile = deleteObject(ref(storage, `${vehicleId}/${URLCloudName[1]}`));
  const remainingUrls = URLCloudImages.filter((url) => url.split('||')[0] !== URLCloudName[0]);
  setState((state) => remainingUrls);
  console.log('Imagem Deletada!');
};

export const uploadMainImage = (vehicleId: string, mainImage: ImageFile[]) => {
  const mainImageStorageRef = ref(storage, `${vehicleId}/mainImage`);

  uploadBytes(mainImageStorageRef, mainImage[0]).then((snapshot) => {
    console.log('Imagem principal foi enviada!');
  });
};

export const uploadImages = (vehicleId: string, Images: ImageFile[]) => {
  Images.forEach((image) => {
    const ImagesStorageRef = ref(storage, `${vehicleId}/${image.name}`);
    uploadBytes(ImagesStorageRef, image);
  });
  console.log('Todas as imagens foram enviadas!');
};
