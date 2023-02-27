import { ImageFile, VehicleProps } from '@/types/VehiclesTypes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import UploadZone from '../UploadZone';
import * as S from './styles';
import * as P from 'phosphor-react';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { StorageReference } from 'firebase/storage';
import { postVehicles, updateVehicles } from '@/utils/fireStoreDatabase';
import { uploadImages, uploadMainImage } from '@/utils/fireStorage';

type VehicleFormProps = {
  setUpdating?: Dispatch<SetStateAction<boolean>>;
  vehicleData?: VehicleProps;
  cloudImages?: StorageReference[];
};

export const VehicleForm = ({ setUpdating, cloudImages, vehicleData }: VehicleFormProps) => {
  const { mainImage, images } = useContext(VehiclesContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleProps>({
    defaultValues: {
      vehicleId: vehicleData?.vehicleId,
      vehicleType: vehicleData?.vehicleType,
      vehicleName: vehicleData?.vehicleName,
      vehiclePrice: vehicleData?.vehiclePrice,
      brand: vehicleData?.brand,
      model: vehicleData?.model,
      manufactureYear: vehicleData?.manufactureYear,
      manufactureModel: vehicleData?.manufactureModel,
      traction: vehicleData?.traction,
      bodywork: vehicleData?.bodywork,
      description: vehicleData?.description,
    },
  });

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  const onSubmit: SubmitHandler<VehicleProps> = (data) => {
    const generateId = generateUniqueId();
    if (vehicleData) {
      updateVehicles(data.vehicleId, data);
      return;
    }
    uploadMainImage(generateId, mainImage);
    uploadImages(generateId, images);
    postVehicles({ ...data, vehicleId: generateId });
  };

  return (
    <S.FormContainer>
      {setUpdating && (
        <S.ButtonsContainer>
          <div>
            <button onClick={() => setUpdating(false)} className="update">
              <P.ArrowBendDoubleUpLeft size={32} />
            </button>
          </div>
          <S.CloseDialogButton aria-label="CloseDialogButton">
            <P.X size={32} />
          </S.CloseDialogButton>
        </S.ButtonsContainer>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {setUpdating ? (
          <>
            <UploadZone
              setUpdating={setUpdating}
              cloudMainImage={cloudImages?.find((image) => image.name === 'mainImage')}
              vehicleId={vehicleData?.vehicleId}
              imageType="Main"
            />
            <UploadZone
              setUpdating={setUpdating}
              cloudImages={cloudImages?.filter((image) => image.name !== 'mainImage')}
              vehicleId={vehicleData?.vehicleId}
              imageType="secondary"
            />
          </>
        ) : (
          <>
            <UploadZone imageType="Main" />
            <UploadZone imageType="secondary" />
          </>
        )}

        <button type="submit">Atualizar Informações</button>
      </form>
    </S.FormContainer>
  );
};
