import { Timestamp } from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';

export type CreateVehicleProps = {
  vehicleId: string;
  vehicleType: string;
  vehicleName: string;
  vehiclePrice: number;
  brand: string;
  model: string;
  manufactureYear: number;
  manufactureModel: number;
  traction: string;
  bodywork: string;
  description: string;
  created_at: Date;
  imagesUrl: CloudImagesArrayProps;
  mainImageUrl: CloudMainImageImageProps;
};

export type FirebaseVehicleProps = {
  vehicleId: string;
  vehicleType: string;
  vehicleName: string;
  vehiclePrice: number;
  brand: string;
  model: string;
  manufactureYear: number;
  manufactureModel: number;
  traction: string;
  bodywork: string;
  description: string;
  created_at: Timestamp;
  imagesUrl: CloudImagesArrayProps;
  mainImageUrl: CloudMainImageImageProps;
};

export type UploadzoneProps = {
  imageType: string;
  setUpdating?: Dispatch<SetStateAction<boolean>>;
  vehicle?: FirebaseVehicleProps;
};

export type ImageFile = {
  preview: string;
} & File;

export type CloudMainImageImageProps = {
  name: string;
  url: string;
};

export type CloudImagesArrayProps = {
  name: string;
  url: string;
}[];
