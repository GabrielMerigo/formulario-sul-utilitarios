import * as S from './styles';
import * as D from '@radix-ui/react-dialog';
import * as P from 'phosphor-react';
import { VehicleProps } from '@/types/VehiclesTypes';
import { useState } from 'react';
import Image from 'next/image';
import VehicleDialog from '@/components/VehicleDialog';

const testVehicles = [
  {
    vehicleType: 'Carro',
    vehicleName: 'Civic',
    vehiclePrice: 10000,
    brand: 'Fiat',
    model: 'compacto',
    manufactureYear: 2022,
    manufactureModel: 2021,
    traction: 'Dianteira',
    bodywork: 's16ad51a6s5d156as',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse fugit quia id nulla ab. Est earum officia pariatur magnam? Vitae ratione recusandae aliquid commodi velit minima at assumenda. Quis?',
    File: [
      {
        path: 'Image1.png',
        preview: 'blob:http://localhost:3000/95bc30c2-681e-4ce8-9ab9-2a97967d6f6d',
        lastModified: 1675652489611,
        lastModifiedDate: new Date(),
        name: 'Image1.png',
        size: 49728,
        type: 'image/png',
        webkitRelativePath: '',
      },
    ],
  },
  {
    vehicleType: 'Caminhao',
    vehicleName: 'DAF XF',
    vehiclePrice: 10000,
    brand: 'Fiat',
    model: 'compacto',
    manufactureYear: 2022,
    manufactureModel: 2021,
    traction: 'Dianteira',
    bodywork: 's16ad51a6s5d156as',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati esse fugit quia id nulla ab. Est earum officia pariatur magnam? Vitae ratione recusandae aliquid commodi velit minima at assumenda. Quis?',
    File: [
      {
        path: 'Image1.png',
        preview: 'blob:http://localhost:3000/95bc30c2-681e-4ce8-9ab9-2a97967d6f6d',
        lastModified: 1675652489611,
        lastModifiedDate: new Date(),
        name: 'Image1.png',
        size: 49728,
        type: 'image/png',
        webkitRelativePath: '',
      },
    ],
  },
];

export default function ListVehicles() {
  const [vehicles, setVehicles] = useState<VehicleProps[]>(testVehicles);

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
