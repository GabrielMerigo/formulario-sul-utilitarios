export type VehicleProps = {
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
  path: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type UploadzoneProps = {
  imageType: string;
};
