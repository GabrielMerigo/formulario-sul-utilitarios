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
import { toast } from 'react-toastify';
import { setTimeout } from 'timers/promises';

export const fetchMainImageUrl = async (
  vehicleId: string,
  setState: Dispatch<SetStateAction<string>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoadingState(true);
    const response = await getDownloadURL(ref(storage, `${vehicleId}/mainImage`));
    setLoadingState(false);
    setState(response);
  } catch ({ message, name }) {
    toast(
      'Houve um erro ao carregar a(s) imagem(s) principal(ais) do(s) veiculo(s):\n' +
        `${message}:${name}`
    );
  }
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
    toast('Houve um erro ao carregar a(s) imagem(s) do(s) veiculo(s):\n' + `${message}:${name}`);
  }
};

export const setManyImagesUrls = (
  vehicleId: string,
  cloudImageArray: StorageReference[],
  setState: Dispatch<SetStateAction<string[]>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoadingState(true);
    cloudImageArray.forEach((image) => {
      getDownloadURL(ref(storage, `${vehicleId}/${image.name}`)).then((url: string) => {
        setState((state: string[]) => [...state, `${url}||${image.name}`]);
      });
    });
    setLoadingState(false);
  } catch ({ message, error }) {
    toast(
      'Houve um erro ao carregar a lista de URL das imagens de todos os veiculos:\n' +
        `${message}:${error}`
    );
  }
};

export const fetchImagesReferenceList = async (
  vehicleId: string,
  setState: Dispatch<SetStateAction<StorageReference[]>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoadingState(true);
    const response = await list(ref(storage, vehicleId));
    setLoadingState(false);
    setState((state) => response.items.reverse());
  } catch ({ message, error }) {
    toast(
      'Houve um erro ao carregar a lista de referencia das imagens de todos os veiculos:\n' +
        `${message}:${error}`
    );
  }
};

export const deleteImageByStorageReference = async (
  vehicleId: string,
  cloudImageName: string,
  cloudImages: StorageReference[],
  setState: Dispatch<SetStateAction<StorageReference[]>>
) => {
  try {
    const deleteFile = deleteObject(ref(storage, `${vehicleId}/${cloudImageName}`));
    const remainingImages = cloudImages.filter((image) => image.name !== cloudImageName);
    setState((state) => remainingImages);
    toast('Imagem deletada!');
  } catch ({ message, error }) {
    toast('Houve um erro com a exclusão da imagem:\n' + `${message}:${error}`);
  }
};

export const deleteImageByURL = async (
  vehicleId: string,
  URLCloudName: string[],
  URLCloudImages: string[],
  setState: Dispatch<SetStateAction<string[]>>
) => {
  try {
    const deleteFile = deleteObject(ref(storage, `${vehicleId}/${URLCloudName[1]}`));
    const remainingUrls = URLCloudImages.filter((url) => url.split('||')[0] !== URLCloudName[0]);
    setState((state) => remainingUrls);
    toast('Imagem Deletada!');
  } catch ({ message, error }) {
    toast('Houve um erro com a exclusão da imagem:\n' + `${message}:${error}`);
  }
};

export const uploadMainImage = (vehicleId: string, mainImage: ImageFile[]) => {
  try {
    const mainImageStorageRef = ref(storage, `${vehicleId}/mainImage`);
    uploadBytes(mainImageStorageRef, mainImage[0]).then((snapshot) => {});
    toast('Imagem principal Salva!');
  } catch ({ message, error }) {
    toast('Houve um erro com ao registrar a imagem principal:\n' + `${message}:${error}`);
  }
};

export const uploadImages = (vehicleId: string, Images: ImageFile[]) => {
  try {
    Images.forEach((image) => {
      const ImagesStorageRef = ref(storage, `${vehicleId}/${image.name}`);
      uploadBytes(ImagesStorageRef, image);
    });
    toast('Imagens Registradas!');
  } catch ({ message, error }) {
    toast('Houve um erro com ao registrar as imagens:\n' + `${message}:${error}`);
  }
};
