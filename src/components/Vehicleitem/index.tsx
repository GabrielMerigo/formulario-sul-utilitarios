/* eslint-disable @next/next/no-img-element */
import * as S from './styles';
import * as D from '@radix-ui/react-dialog';
import * as P from 'phosphor-react';
import Image from 'next/image';
import VehicleDialog from '@/components/VehicleDialog';
import { VehicleProps } from '@/types/VehiclesTypes';
import { useContext, useEffect, useState } from 'react';
import { deleteVehicles } from '@/utils/fireStoreDatabase';
import { fetchMainImageUrl } from '@/utils/fireStorage';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { FormatToCurrency } from '@/utils/FormatNumber';

type ComponentProps = {
  vehicle: VehicleProps;
};

export function Vehicleitem({ vehicle }: ComponentProps) {
  const { setCloudImages } = useContext(VehiclesContext);
  const [URLsImages, setURLsImages] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchMainImageUrl(vehicle.vehicleId, setURLsImages);
  }, [vehicle.vehicleId]);

  const HandleOpenModal = () => {
    setCloudImages([]);
  };

  return (
    <S.VehiclesContainer key={vehicle.vehicleId}>
      <button onClick={() => deleteVehicles(vehicle.vehicleId)} className="delete">
        <P.Trash size={32} />
      </button>
      {URLsImages ? (
        <img
          src={URLsImages}
          alt={vehicle.vehicleName}
          width={200}
          height={200}
          style={{ margin: 10 }}
        />
      ) : (
        <h3>Sem imagem</h3>
      )}
      <h3>{vehicle.vehicleName}</h3>
      <S.VehicleInfosGroup>
        <strong>Tipo:</strong>
        <span>{vehicle.vehicleType}</span>
      </S.VehicleInfosGroup>
      <S.VehicleInfosGroup>
        <strong>Preço:</strong>
        <span>{FormatToCurrency(vehicle.vehiclePrice)}</span>
      </S.VehicleInfosGroup>
      <S.VehicleInfosGroup>
        <strong>Marca:</strong>
        <span>{vehicle.brand}</span>
      </S.VehicleInfosGroup>
      <D.Root open={open} onOpenChange={setOpen}>
        <D.Trigger asChild>
          <S.VehicleDetailsButton onClick={HandleOpenModal}>Detalhes</S.VehicleDetailsButton>
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
            setOpen={setOpen}
          />
        </D.Portal>
      </D.Root>
    </S.VehiclesContainer>
  );
}
