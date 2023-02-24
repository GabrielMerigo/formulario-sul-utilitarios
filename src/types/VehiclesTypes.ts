import { StorageReference } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';

export type VehicleProps = {
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
  File?: ImageFile[];
};

export type ImageFile = {
  preview: string;
} & File;

export type UploadzoneProps = {
  imageType: string;
  setUpdating?: Dispatch<SetStateAction<boolean>>;
  vehicleId?: string;
  cloudMainImage?: StorageReference;
  cloudImages?: StorageReference[];
};
