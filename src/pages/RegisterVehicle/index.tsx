import * as S from './styles';
import Link from 'next/link';
import UploadZone from '@/components/UploadZone';

export default function RegisterVehicle() {
  return (
    <S.RegisterVehicleContainer>
      <S.FormContainer>
        <h2>Registar Veiculo</h2>
        <S.ListVehiclesButton href="/">Listar veiculos</S.ListVehiclesButton>
        <form>
          <S.InputGroup>
            <legend>Selecione o tipo de Veículo</legend>
            <S.RadioGroup>
              <input type="radio" id="Veiculo" name="vehicleType" value="Veículo" />
              <label htmlFor="Veiculo">Veículo</label>
              <input type="radio" id="Caminhao" name="vehicleType" value="Caminhão" />
              <label htmlFor="Caminhao">Caminhão</label>
            </S.RadioGroup>
          </S.InputGroup>
          <S.FieldInputsContainer>
            <S.InputGroup>
              <label htmlFor="vehicleName">Nome do Veículo</label>
              <input id="vehicleName" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="vehiclePrice">Preço do veículo</label>
              <input id="vehiclePrice" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="brand">Marca</label>
              <input id="brand" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="model">Modelo</label>
              <input id="model" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="manufactureYear">Ano Fabricação</label>
              <input id="manufactureYear" type="number" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="manufactureModel">Ano Modelo</label>
              <input id="manufactureModel" type="number" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="traction">Tração</label>
              <input id="traction" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="bodywork">Carroceria</label>
              <input id="bodywork" type="text" />
            </S.InputGroup>
          </S.FieldInputsContainer>
          <S.InputGroup>
            <label htmlFor="description">Descrição do Veículo</label>
            <textarea id="description" />
          </S.InputGroup>
          <S.UploadZoneContainer>
            <UploadZone imageType="Main" />
          </S.UploadZoneContainer>
          <S.UploadZoneContainer>
            <UploadZone imageType="secondary" />
          </S.UploadZoneContainer>
          <Link href="/" type="submit">
            Registrar Veiculo
          </Link>
        </form>
      </S.FormContainer>
    </S.RegisterVehicleContainer>
  );
}
