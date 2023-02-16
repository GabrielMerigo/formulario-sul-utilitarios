import * as S from './styles';
import * as D from '@radix-ui/react-dialog';
import * as P from 'phosphor-react';
import { VehicleProps } from '@/types/VehiclesTypes';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import VehicleDialog from '@/components/VehicleDialog';
import { api } from '@/utils/axios';
import { VehiclesContext } from '@/contexts/VehiclesContext';

export default function ListVehicles() {
  const { vehicles } = useContext(VehiclesContext);

  const vehicleInfos = vehicles.map((vehicle, index) => {
    return (
      <S.VehiclesContainer key={vehicle.File[0].path}>
        <Image
          src="/images/Image1.png"
          alt={vehicle.File[0].name}
          width={200}
          height={200}
          style={{ margin: 10 }}
        />
        <h3>{vehicle.vehicleName}</h3>
        <S.VehicleInfosGroup>
          <strong>Tipo:</strong>
          <span>{vehicle.vehicleType}</span>
        </S.VehicleInfosGroup>
        <S.VehicleInfosGroup>
          <strong>Preço:</strong>
          <span>{vehicle.vehiclePrice}</span>
        </S.VehicleInfosGroup>
        <S.VehicleInfosGroup>
          <strong>Marca:</strong>
          <span>{vehicle.brand}</span>
        </S.VehicleInfosGroup>
        <D.Root>
          <D.Trigger asChild>
            <S.VehicleDetailsButton>Detalhes</S.VehicleDetailsButton>
          </D.Trigger>
          <D.Portal>
            <VehicleDialog
              vehicleType={vehicle.vehicleType}
              vehicleName={vehicle.vehicleName}
              vehiclePrice={vehicle.vehiclePrice}
              brand={vehicle.brand}
              model={vehicle.model}
              manufactureYear={vehicle.manufactureYear}
              manufactureModel={vehicle.manufactureModel}
              traction={vehicle.traction}
              bodywork={vehicle.bodywork}
              description={vehicle.description}
            />
          </D.Portal>
        </D.Root>
      </S.VehiclesContainer>
    );
  });

  return (
    <S.PageContainer>
      <S.LinksContainer>
        <S.LinkItem href="/">
          <P.House size={32} />
        </S.LinkItem>
        <S.LinkItem href="/RegisterVehicle">
          <P.Scroll size={32} />
        </S.LinkItem>
      </S.LinksContainer>
      <S.ListVehicleContainer>{vehicleInfos}</S.ListVehicleContainer>
    </S.PageContainer>
  );
}
