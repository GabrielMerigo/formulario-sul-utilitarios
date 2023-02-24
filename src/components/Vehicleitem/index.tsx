import * as S from './styles';
import * as D from '@radix-ui/react-dialog';
import * as P from 'phosphor-react';
import Image from 'next/image';
import VehicleDialog from '@/components/VehicleDialog';
import { VehicleProps } from '@/types/VehiclesTypes';
import { useEffect, useState } from 'react';
import { deleteVehicles } from '@/utils/fireStoreDatabase';
import { fetchMainImageUrl } from '@/utils/fireStorage';

type ComponentProps = {
  vehicle: VehicleProps;
};

export function Vehicleitem({ vehicle }: ComponentProps) {
  const [URLsImages, setURLsImages] = useState('');

  useEffect(() => {
    fetchMainImageUrl(vehicle.vehicleId, setURLsImages);
  }, []);

  return (
    <S.VehiclesContainer key={vehicle.vehicleId}>
      <button onClick={() => deleteVehicles(vehicle.vehicleId)} className="delete">
        <P.Trash size={32} />
      </button>
      <Image
        src={URLsImages}
        alt={vehicle.vehicleName}
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
            vehicleId={vehicle.vehicleId}
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
}
