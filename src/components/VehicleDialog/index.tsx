import Image from 'next/image';
import * as S from './styles';
import * as P from 'phosphor-react';
import { VehicleProps } from '@/types/VehiclesTypes';

export default function VehicleDialog(props: VehicleProps) {
  return (
    <>
      <S.Overlay />
      <S.Content>
        <S.CloseDialogButton aria-label="CloseDialogButton">
          <P.X size={32} />
        </S.CloseDialogButton>
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
      </S.Content>
    </>
  );
}
