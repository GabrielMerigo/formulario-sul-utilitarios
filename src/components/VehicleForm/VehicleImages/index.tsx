import UploadZone from '@/components/UploadZone';
import { VehicleProps } from '@/types/VehiclesTypes';
import { StorageReference } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';
import * as S from './styles';

type VehicleImagesFormProps = {
  setUpdating: Dispatch<SetStateAction<boolean>> | undefined;
  cloudImages: StorageReference[] | undefined;
  vehicleData: VehicleProps | undefined;
};

export const VehicleImages = ({
  setUpdating,
  cloudImages,
  vehicleData,
}: VehicleImagesFormProps) => {
  return (
    <S.VehicleImagesContainer>
      {setUpdating ? (
        <>
          <UploadZone
            setUpdating={setUpdating}
            cloudMainImage={cloudImages?.find((image) => image.name === 'mainImage')}
            vehicleId={vehicleData?.vehicleId}
            imageType="Main"
          />
          <UploadZone
            setUpdating={setUpdating}
            cloudImages={cloudImages?.filter((image) => image.name !== 'mainImage')}
            vehicleId={vehicleData?.vehicleId}
            imageType="secondary"
          />
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
