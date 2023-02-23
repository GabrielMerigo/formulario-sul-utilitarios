import Image from 'next/image';
import * as S from './styles';
import * as P from 'phosphor-react';
import { VehicleProps } from '@/types/VehiclesTypes';
import { useContext, useEffect, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import VehicleForm from '../VehicleForm';
import { storage } from 'firebaseEnv';
import { list, ref, StorageReference } from 'firebase/storage';
import ImagesCarrousel from '../ImagesCarrousel';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export default function VehicleDialog(vehicle: VehicleProps) {
  const { cloudImages, fetchImagesUrlList, deleteVehicles } = useContext(VehiclesContext);
  const [updating, setUpdating] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleProps>();

  useEffect(() => {
    fetchImagesUrlList(vehicle.vehicleId);
  }, []);

  const onSubmit: SubmitHandler<VehicleProps> = (data) => {
    console.log(data);
    // postVehicles(data);
  };

  const deleteVehicle = (id: string) => deleteVehicles(id);

  return (
    <>
      <S.Overlay />
      <S.Content>
        {!updating ? (
          <>
            <S.ButtonsContainer>
              <div>
                <button onClick={() => deleteVehicle(vehicle.vehicleId)} className="delete">
                  <P.Trash size={32} />
                </button>
                <button onClick={() => setUpdating(true)} className="update">
                  <P.NotePencil size={32} />
                </button>
              </div>
              <S.CloseDialogButton aria-label="CloseDialogButton">
                <P.X size={32} />
              </S.CloseDialogButton>
            </S.ButtonsContainer>
            <S.ImagesCarousel>
              {cloudImages.map((cloudImage) => {
                return (
                  <ImagesCarrousel
                    key={cloudImage.name}
                    cloudImage={cloudImage}
                    vehicleId={vehicle.vehicleId}
                  />
                );
              })}
            </S.ImagesCarousel>
            <h3>{vehicle.vehicleName}</h3>
            <S.VehicleInfos>
              <S.VehicleInfosGroup>
                <strong>Tipo:</strong>
                <span>{vehicle.vehicleType}</span>
              </S.VehicleInfosGroup>
              <S.VehicleInfosGroup>
                <strong>Preço:</strong>
                <span>{vehicle.vehiclePrice}</span>
              </S.VehicleInfosGroup>
              <label>Características do veículo:</label>
              <S.VehiclecharacteristicsContainer>
                <S.VehiclecharacteristicsGroup>
                  <strong>Marca:</strong>
                  <span>{vehicle.brand}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo:</strong>
                  <span>{vehicle.model}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Ano de fabricação:</strong>
                  <span>{vehicle.manufactureYear}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo de fabricação:</strong>
                  <span>{vehicle.manufactureYear}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Tração:</strong>
                  <span>{vehicle.traction}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Carroceria:</strong>
                  <span>{vehicle.bodywork}</span>
                </S.VehiclecharacteristicsGroup>
              </S.VehiclecharacteristicsContainer>
              <S.VehicleDescriptionContainer>
                <strong>Descrição:</strong>
                <span>{vehicle.description}</span>
              </S.VehicleDescriptionContainer>
            </S.VehicleInfos>
          </>
        ) : (
          <VehicleForm setUpdating={setUpdating} vehicleData={vehicle} />
        )}
      </S.Content>
    </>
  );
}
