import * as S from './styles';
import * as P from 'phosphor-react';
import { Control, Controller, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { VehicleProps } from '@/types/VehiclesTypes';

type VehicleDataFormProps = {
  control: Control<VehicleProps, any>;
  register: UseFormRegister<VehicleProps>;
};

export const VehicleData = ({ control, register }: VehicleDataFormProps) => {
  return (
    <>
      <label htmlFor="vehicleType">Escolha um tipo de veiculo</label>
      <Controller
        control={control}
        name="vehicleType"
        render={({ field }) => {
          return (
            <S.VehicleType onValueChange={field.onChange} value={field.value}>
              <S.VehicleTypeButton value="Carro">
                <P.Car size={24} />
                Carro
              </S.VehicleTypeButton>
              <S.VehicleTypeButton value="Caminhão">
                <P.Truck size={24} />
                Caminhão
              </S.VehicleTypeButton>
            </S.VehicleType>
          );
        }}
      />
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
    </>
  );
};
