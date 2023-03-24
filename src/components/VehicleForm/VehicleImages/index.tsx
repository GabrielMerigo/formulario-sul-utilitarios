import UploadZone from '@/components/UploadZone';
import { CloudMainImageImageProps, FirebaseVehicleProps } from '@/types/VehiclesTypes';
import { Dispatch, SetStateAction } from 'react';
import * as S from './styles';

type VehicleImagesFormProps = {
  setUpdating: Dispatch<SetStateAction<boolean>> | undefined;
  images?: {
    name: string;
    url: string;
  }[];
  vehicleData: FirebaseVehicleProps | undefined;
};

export const VehicleImages = ({ setUpdating, images, vehicleData }: VehicleImagesFormProps) => {
  return (
    <S.VehicleImagesContainer>
      {setUpdating ? (
        <>
          <UploadZone setUpdating={setUpdating} vehicle={vehicleData} imageType="Main" />
          <UploadZone setUpdating={setUpdating} vehicle={vehicleData} imageType="secondary" />
        </>
      ) : (
        <>
          <UploadZone imageType="Main" />
          <UploadZone imageType="secondary" />
        </>
      )}
    </S.VehicleImagesContainer>
  );
};
