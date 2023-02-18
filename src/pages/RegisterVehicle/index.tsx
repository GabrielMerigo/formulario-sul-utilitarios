import * as S from './styles';
import * as P from 'phosphor-react';
import VehicleForm from '@/components/VehicleForm';

export default function RegisterVehicle() {
  return (
    <S.RegisterVehicleContainer>
      <S.LinksContainer>
        <S.LinkItem href="/">
          <P.House size={32} />
        </S.LinkItem>
        <S.LinkItem href="/ListVehicles">
          <P.Truck size={32} />
        </S.LinkItem>
      </S.LinksContainer>
      <S.FormContainer>
        <h2>Registar Veiculo</h2>
        <VehicleForm />
      </S.FormContainer>
    </S.RegisterVehicleContainer>
  );
}
