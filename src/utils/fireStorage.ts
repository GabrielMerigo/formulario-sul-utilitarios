import { CloudImagesArrayProps, ImageFile } from '@/types/VehiclesTypes';
import {
  deleteObject,
  getDownloadURL,
  list,
  ref,
  StorageReference,
  uploadBytes,
  uploadBytesResumable,
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
    setLoadingState(false);
    toast(
      'Houve um erro ao carregar a(s) imagem(s) principal(ais) do(s) veiculo(s):\n' +
        `${message}:${name}`,
      { className: 'error' }
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
    toast('Houve um erro ao carregar a(s) imagem(s) do(s) veiculo(s):\n' + `${message}:${name}`, {
      className: 'error',
    });
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
        `${message}:${name}`,
      { className: 'error' }
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
        `${message}:${name}`,
      { className: 'error' }
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
    toast('Imagem deletada!', { className: 'success' });
  } catch ({ message, name }) {
    toast('Houve um erro com a exclusão da imagem:\n' + `${message}:${name}`, {
      className: 'error',
    });
  }
};

export const deleteImageByURL = async (
  vehicleId: string,
  imageName: string,
  Images: { name: string; url: string }[],
  setState: Dispatch<
    SetStateAction<
      {
        name: string;
        url: string;
      }[]
    >
  >
) => {
  try {
    const deleteFile = await deleteObject(ref(storage, `${vehicleId}/${imageName}`));
    const remainingImages = Images.filter((image) => image.name !== imageName);
    setState((state) => remainingImages);
    toast('Imagem Deletada!', { className: 'success' });
  } catch ({ message, name }) {
    toast('Houve um erro com a exclusão da imagem:\n' + `${message}:${name}`, {
      className: 'error',
    });
  }
};

export const deleteVehicleImagesFolder = async (vehicleId: string) => {
  try {
    const imagesList = await list(ref(storage, vehicleId));
    imagesList.items.forEach((image) => {
      const deleteFile = deleteObject(ref(storage, `${vehicleId}/${image.name}`));
    });
  } catch ({ message, name }) {
    toast(
      'Houve um erro com a exclusão da pasta de imagem do veiculo:\n\n' + `${message}:${name}`,
      { className: 'error' }
    );
  }
};

export const uploadMainImage = async (vehicleId: string, mainImage: ImageFile[]) => {
  try {
    const mainImageStorageRef = ref(storage, `${vehicleId}/mainImage`);
    const uploadTask = uploadBytesResumable(mainImageStorageRef, mainImage[0]);
    await uploadTask;
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return { name: 'mainImage', url: downloadURL };
  } catch ({ message, name }) {
    toast('Houve um erro com ao registrar a imagem principal:\n' + `${message}:${name}`, {
      className: 'error',
    });
  }
};

export const uploadImages = async (vehicleId: string, images: ImageFile[]) => {
  try {
    const urlArray = [];
    for (let i = 0; i < images.length; i++) {
      const ImagesStorageRef = ref(storage, `${vehicleId}/${images[i].name}`);
      const uploadTask = uploadBytesResumable(ImagesStorageRef, images[i]);
      await uploadTask;
      const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
      urlArray.push({ url: await downloadURL, name: images[i].name });
    }
    return urlArray;
  } catch ({ message, name }) {
    toast('Houve um erro com ao registrar as imagens:\n' + `${message}:${name}`, {
      className: 'error',
    });
  }
};
