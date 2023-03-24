/* eslint-disable @next/next/no-img-element */
import * as S from './styles';
import * as D from '@radix-ui/react-dialog';
import * as P from 'phosphor-react';
import VehicleDialog from '@/components/VehicleDialog';
import { FirebaseVehicleProps } from '@/types/VehiclesTypes';
import { useState, useContext } from 'react';
import { deleteVehicles } from '@/utils/fireStoreDatabase';
import { FormatToCurrency } from '@/utils/FormatNumber';
import { format } from 'date-fns';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type VehicleItemProps = {
  vehicle: FirebaseVehicleProps;
};

export function Vehicleitem({ vehicle }: VehicleItemProps) {
  const { setVehicleItemImages } = useContext(VehiclesContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <S.VehiclesContainer key={vehicle.vehicleId}>
      <button onClick={() => deleteVehicles(vehicle.vehicleId)} className="delete">
        <P.Trash size={32} />
      </button>
      <S.MainImageContainer>
        {vehicle.mainImageUrl && (
          <LazyLoadImage
            effect="blur"
            src={vehicle.mainImageUrl.url}
            alt={vehicle.vehicleName}
            loading="lazy"
          />
        )}
        {!vehicle.mainImageUrl && (
          <>
            <P.FileDotted size={50} />
            <h4>Imagem principal não encontrada</h4>
          </>
        )}
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
            <S.VehicleDetailsButton
              onClick={() => setVehicleItemImages([vehicle.mainImageUrl, ...vehicle.imagesUrl])}
            >
              Detalhes
            </S.VehicleDetailsButton>
          </D.Trigger>
          <D.Portal>
            <VehicleDialog vehicle={vehicle} setOpen={setOpen} />
          </D.Portal>
        </D.Root>
      </S.CardDataContainer>
    </S.VehiclesContainer>
  );
}
