import * as S from './styles';
import * as P from 'phosphor-react';
import UploadZone from '@/components/UploadZone';
import { VehicleProps } from '@/types/VehiclesTypes';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function RegisterVehicle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleProps>();

  const onSubmit: SubmitHandler<VehicleProps> = (data) => console.log(data);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.InputGroup>
            <legend>Selecione o tipo de Veículo</legend>
            <S.RadioGroup>
              <input
                {...register('vehicleType')}
                type="radio"
                id="Veiculo"
                name="vehicleType"
                value="Veículo"
              />
              <label htmlFor="Veiculo">Veículo</label>
              <input
                {...register('vehicleType')}
                type="radio"
                id="Caminhao"
                name="vehicleType"
                value="Caminhão"
              />
              <label htmlFor="Caminhao">Caminhão</label>
            </S.RadioGroup>
          </S.InputGroup>
          <S.FieldInputsContainer>
            <S.InputGroup>
              <label htmlFor="vehicleName">Nome do Veículo</label>
              <input {...register('vehicleName')} id="vehicleName" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="vehiclePrice">Preço do veículo</label>
              <input {...register('vehiclePrice')} id="vehiclePrice" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="brand">Marca</label>
              <input {...register('brand')} id="brand" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="model">Modelo</label>
              <input {...register('model')} id="model" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="manufactureYear">Ano Fabricação</label>
              <input {...register('manufactureYear')} id="manufactureYear" type="number" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="manufactureModel">Ano Modelo</label>
              <input {...register('manufactureModel')} id="manufactureModel" type="number" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="traction">Tração</label>
              <input {...register('traction')} id="traction" type="text" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="bodywork">Carroceria</label>
              <input {...register('bodywork')} id="bodywork" type="text" />
            </S.InputGroup>
          </S.FieldInputsContainer>
          <S.InputGroup>
            <label htmlFor="description">Descrição do Veículo</label>
            <textarea {...register('description')} id="description" />
          </S.InputGroup>
          <UploadZone imageType="Main" />
          <UploadZone imageType="secondary" />
          <button type="submit">Registrar Veiculo</button>
        </form>
      </S.FormContainer>
    </S.RegisterVehicleContainer>
  );
}
