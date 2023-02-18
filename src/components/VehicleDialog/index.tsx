import Image from 'next/image';
import * as S from './styles';
import * as P from 'phosphor-react';
import { VehicleProps } from '@/types/VehiclesTypes';
import { useContext, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import UploadZone from '../UploadZone';
import VehicleForm from '../VehicleForm';

export default function VehicleDialog(props: VehicleProps) {
  const { deleteVehicles } = useContext(VehiclesContext);
  const [updating, setUpdating] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleProps>();

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
                <button onClick={() => deleteVehicle(props.id)} className="delete">
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
            <Image
              src="/images/Image1.png"
              alt="vehicle"
              width={200}
              height={200}
              style={{ margin: 10 }}
            />
            <h3>{props.vehicleName}</h3>
            <S.VehicleInfos>
              <S.VehicleInfosGroup>
                <strong>Tipo:</strong>
                <span>{props.vehicleType}</span>
              </S.VehicleInfosGroup>
              <S.VehicleInfosGroup>
                <strong>Preço:</strong>
                <span>{props.vehiclePrice}</span>
              </S.VehicleInfosGroup>
              <label>Características do veículo:</label>
              <S.VehiclecharacteristicsContainer>
                <S.VehiclecharacteristicsGroup>
                  <strong>Marca:</strong>
                  <span>{props.brand}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo:</strong>
                  <span>{props.model}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Ano de fabricação:</strong>
                  <span>{props.manufactureYear}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo de fabricação:</strong>
                  <span>{props.manufactureYear}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Tração:</strong>
                  <span>{props.traction}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Carroceria:</strong>
                  <span>{props.bodywork}</span>
                </S.VehiclecharacteristicsGroup>
              </S.VehiclecharacteristicsContainer>
              <S.VehicleDescriptionContainer>
                <strong>Descrição:</strong>
                <span>{props.description}</span>
              </S.VehicleDescriptionContainer>
            </S.VehicleInfos>
          </>
        ) : (
          <VehicleForm setUpdating={setUpdating} vehicleData={props} />
        )}
      </S.Content>
    </>
  );
}
