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
    cloudImageArray.forEach(async (image) => {
      await getDownloadURL(ref(storage, `${vehicleId}/${image.name}`)).then((url: string) => {
        setState((state: string[]) => [...state, `${url}||${image.name}`]);
      });
    });
    setLoadingState(false);
  } catch ({ message, name }) {
    toast(
      'Houve um erro ao carregar a lista de URL das imagens de todos os veiculos:\n' +
        `${message}:${name}`
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
  } catch ({ message, name }) {
    toast(
      'Houve um erro ao carregar a lista de referencia das imagens de todos os veiculos:\n' +
        `${message}:${name}`
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
  } catch ({ message, name }) {
    toast('Houve um erro com a exclusão da imagem:\n' + `${message}:${name}`);
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
  } catch ({ message, name }) {
    toast('Houve um erro com a exclusão da imagem:\n' + `${message}:${name}`);
  }
};

export const deleteVehicleImagesFolder = async (vehicleId: string) => {
  try {
    const imagesList = await list(ref(storage, vehicleId));
    imagesList.items.forEach((image) => {
      const deleteFile = deleteObject(ref(storage, `${vehicleId}/${image.name}`));
    });
  } catch ({ message, name }) {
    toast('Houve um erro com a exclusão da pasta de imagem do veiculo:\n\n' + `${message}:${name}`);
  }
};

export const uploadMainImage = async (
  vehicleId: string,
  mainImage: ImageFile[],
  setSendingDataState: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setSendingDataState(true);
    const mainImageStorageRef = ref(storage, `${vehicleId}/mainImage`);
    await uploadBytes(mainImageStorageRef, mainImage[0]);
    setSendingDataState(false);
  } catch ({ message, name }) {
    setSendingDataState(false);
    toast('Houve um erro com ao registrar a imagem principal:\n' + `${message}:${name}`);
  }
};

export const uploadImages = async (
  vehicleId: string,
  Images: ImageFile[],
  setSendingDataState: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setSendingDataState(true);
    Images.forEach(async (image) => {
      const ImagesStorageRef = ref(storage, `${vehicleId}/${image.name}`);
      await uploadBytes(ImagesStorageRef, image);
    });
    setSendingDataState(false);
  } catch ({ message, name }) {
    setSendingDataState(false);
    toast('Houve um erro com ao registrar as imagens:\n' + `${message}:${name}`);
  }
};
