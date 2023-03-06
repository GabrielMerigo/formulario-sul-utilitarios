import * as S from './styles';
import * as P from 'phosphor-react';
import { useContext, useEffect } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { Vehicleitem } from '@/components/Vehicleitem';
import { toast } from 'react-toastify';

export default function ListVehicles() {
  const { vehicles, setCloudImages } = useContext(VehiclesContext);
  return (
    <>
      <S.LinksContainer>
        <S.LinkItem href="/">
          <P.House size={32} />
        </S.LinkItem>
        <S.LinkItem href="/RegisterVehicle">
          <P.Scroll size={32} />
        </S.LinkItem>
      </S.LinksContainer>
      <S.ListVehicleContainer>
        {vehicles.map((vehicle) => {
          return (
            <Vehicleitem
              key={vehicle.vehicleId}
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
              created_at={vehicle.created_at}
            />
          );
        })}
      </S.ListVehicleContainer>
    </>
  );
}
