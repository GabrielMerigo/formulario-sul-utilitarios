import * as S from './styles';
import * as P from 'phosphor-react';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { VehicleProps } from '@/types/VehiclesTypes';
import CurrencyInput from 'react-currency-input-field';

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
          <input autoComplete="off" {...register('vehicleName')} id="vehicleName" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="vehiclePrice">Preço do veículo</label>
          <CurrencyInput
            prefix="R$"
            fixedDecimalLength={2}
            decimalsLimit={2}
            placeholder="R$ 000,00"
            autoComplete="off"
            {...register('vehiclePrice')}
            id="vehiclePrice"
          />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="brand">Marca</label>
          <input autoComplete="off" {...register('brand')} id="brand" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="model">Modelo</label>
          <input autoComplete="off" {...register('model')} id="model" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="manufactureYear">Ano Fabricação</label>
          <input
            autoComplete="off"
            {...register('manufactureYear')}
            id="manufactureYear"
            type="number"
          />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="manufactureModel">Ano Modelo</label>
          <input
            autoComplete="off"
            {...register('manufactureModel')}
            id="manufactureModel"
            type="number"
          />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="traction">Tração</label>
          <input autoComplete="off" {...register('traction')} id="traction" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="bodywork">Carroceria</label>
          <input autoComplete="off" {...register('bodywork')} id="bodywork" type="text" />
        </S.InputGroup>
      </S.FieldInputsContainer>
      <S.InputGroup>
        <label htmlFor="description">Descrição do Veículo</label>
        <textarea {...register('description')} id="description" />
      </S.InputGroup>
    </>
  );
};
