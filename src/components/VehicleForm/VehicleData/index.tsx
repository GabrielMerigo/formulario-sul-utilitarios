import * as S from './styles';
import * as P from 'phosphor-react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { VehicleProps } from '@/types/VehiclesTypes';
import CurrencyInput from 'react-currency-input-field';

type VehicleDataFormProps = {
  control: Control<VehicleProps, any>;
  register: UseFormRegister<VehicleProps>;
  errors: FieldErrors<VehicleProps>;
};

export const VehicleData = ({ control, register, errors }: VehicleDataFormProps) => {
  return (
    <>
      <S.VehicleTypeLabel>
        <label htmlFor="vehicleType">Escolha um tipo de veiculo</label>
        {errors.vehicleType && <S.ErrorMessage>Informe o tipo do veículo</S.ErrorMessage>}
      </S.VehicleTypeLabel>
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
          <input
            required
            autoComplete="off"
            {...register('vehicleName')}
            id="vehicleName"
            type="text"
            placeholder="Celta"
            style={{ border: errors.vehicleName ? '2px solid red' : 'initial' }}
          />
          {errors.vehicleName && <S.ErrorMessage>{errors.vehicleName.message}</S.ErrorMessage>}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="vehiclePrice">Preço do veículo</label>
          <CurrencyInput
            required
            prefix="R$"
            decimalsLimit={2}
            placeholder="R$ 0.000,00"
            autoComplete="off"
            {...register('vehiclePrice')}
            id="vehiclePrice"
            style={{ border: errors.vehiclePrice ? '2px solid red' : 'initial' }}
          />
          {errors.vehiclePrice && <S.ErrorMessage>{errors.vehiclePrice.message}</S.ErrorMessage>}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="brand">Marca</label>
          <input
            required
            autoComplete="off"
            {...register('brand')}
            id="brand"
            type="text"
            placeholder="Chevrolet"
            style={{ border: errors.brand ? '2px solid red' : 'initial' }}
          />
          {errors.brand && <S.ErrorMessage>{errors.brand.message}</S.ErrorMessage>}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="model">Modelo</label>
          <input
            required
            autoComplete="off"
            {...register('model')}
            id="model"
            type="text"
            placeholder="Life"
            style={{ border: errors.model ? '2px solid red' : 'initial' }}
          />
          {errors.model && <S.ErrorMessage>{errors.model.message}</S.ErrorMessage>}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="manufactureYear">Ano Fabricação</label>
          <input
            required
            autoComplete="off"
            {...register('manufactureYear')}
            id="manufactureYear"
            type="number"
            placeholder="2004"
            style={{ border: errors.manufactureYear ? '2px solid red' : 'initial' }}
          />
          {errors.manufactureYear && (
            <S.ErrorMessage>{errors.manufactureYear.message}</S.ErrorMessage>
          )}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="manufactureModel">Ano Modelo</label>
          <input
            required
            autoComplete="off"
            {...register('manufactureModel')}
            id="manufactureModel"
            type="number"
            placeholder="2005"
            style={{ border: errors.manufactureModel ? '2px solid red' : 'initial' }}
          />
          {errors.manufactureModel && (
            <S.ErrorMessage>{errors.manufactureModel.message}</S.ErrorMessage>
          )}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="traction">Tração</label>
          <input
            required
            autoComplete="off"
            {...register('traction')}
            id="traction"
            type="text"
            placeholder="Dianteira"
            style={{ border: errors.traction ? '2px solid red' : 'initial' }}
          />
          {errors.traction && <S.ErrorMessage>{errors.traction.message}</S.ErrorMessage>}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="bodywork">Carroceria</label>
          <input
            required
            autoComplete="off"
            {...register('bodywork')}
            id="bodywork"
            type="text"
            style={{ border: errors.bodywork ? '2px solid red' : 'initial' }}
          />
          {errors.bodywork && <S.ErrorMessage>{errors.bodywork.message}</S.ErrorMessage>}
        </S.InputGroup>
      </S.FieldInputsContainer>
      <S.InputGroup>
        <label htmlFor="description">Descrição do Veículo</label>
        <textarea {...register('description')} id="description" />
      </S.InputGroup>
    </>
  );
};
