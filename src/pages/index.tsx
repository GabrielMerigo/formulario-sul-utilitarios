import * as S from './styles';
import * as P from 'phosphor-react';

export default function Home() {
  return (
    <S.IndexContainer>
      <h1>SUL UTILITARIOS</h1>
      <S.LinksContainer>
        <S.LinkItem href="/RegisterVehicle">
          <P.Scroll size={40} />
          Registrar Veiculo
        </S.LinkItem>
        <S.LinkItem href="/ListVehicles">
          <P.Truck size={40} />
          Listar Veiculos
        </S.LinkItem>
      </S.LinksContainer>
    </S.IndexContainer>
  );
}
