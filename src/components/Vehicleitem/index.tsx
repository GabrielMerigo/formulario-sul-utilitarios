/* eslint-disable @next/next/no-img-element */
import * as S from './styles';
import * as D from '@radix-ui/react-dialog';
import * as P from 'phosphor-react';
import VehicleDialog from '@/components/VehicleDialog';
import { FirebaseVehicleProps } from '@/types/VehiclesTypes';
import { useContext, useEffect, useState } from 'react';
import { deleteVehicles } from '@/utils/fireStoreDatabase';
import { fetchMainImageUrl } from '@/utils/fireStorage';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { FormatToCurrency } from '@/utils/FormatNumber';
import { Loading } from '../Loading';
import { format } from 'date-fns';

export function Vehicleitem(vehicle: FirebaseVehicleProps) {
  const { setCloudImages } = useContext(VehiclesContext);
  const [URLsImages, setURLsImages] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMainImageUrl(vehicle.vehicleId, setURLsImages, setLoading);
  }, [vehicle.vehicleId]);

  const HandleOpenModal = () => {
    setCloudImages([]);
  };

  console.log(vehicle.created_at);

  return (
    <S.VehiclesContainer key={vehicle.vehicleId}>
      <button onClick={() => deleteVehicles(vehicle.vehicleId)} className="delete">
        <P.Trash size={32} />
      </button>
      <S.MainImageContainer>
        {URLsImages && <img src={URLsImages} alt={vehicle.vehicleName} />}
        {!loading && !URLsImages && <h4>Imagem principal não encontrada</h4>}
        {loading && <Loading />}
      </S.MainImageContainer>
      <S.CardDataContainer>
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
        <S.VehicleInfosGroup>
          <strong>Registrado em:</strong>
          <span>{format(vehicle.created_at.toDate(), 'dd/MM/yyyy')}</span>
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
              created_at={vehicle.created_at.toDate()}
              setOpen={setOpen}
            />
          </D.Portal>
        </D.Root>
      </S.CardDataContainer>
    </S.VehiclesContainer>
  );
}
