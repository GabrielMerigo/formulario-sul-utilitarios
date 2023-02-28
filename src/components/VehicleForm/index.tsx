import * as S from './styles';
import * as P from 'phosphor-react';
import { VehicleProps } from '@/types/VehiclesTypes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import UploadZone from '../UploadZone';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { StorageReference } from 'firebase/storage';
import { postVehicles, updateVehicles } from '@/utils/fireStoreDatabase';
import { uploadImages, uploadMainImage } from '@/utils/fireStorage';
import { VehicleData } from './VehicleData';
import { VehicleImages } from './VehicleImages';

type VehicleFormProps = {
  setUpdating?: Dispatch<SetStateAction<boolean>>;
  vehicleData?: VehicleProps;
  cloudImages?: StorageReference[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

export const VehicleForm = ({
  setUpdating,
  cloudImages,
  vehicleData,
  setOpen,
}: VehicleFormProps) => {
  const { mainImage, images, setMainImage, setImages } = useContext(VehiclesContext);
  const [activeStep, setActiveStep] = useState<number>(0);
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

  const steps = [
    {
      label: 'DADOS DO VEICULO',
      description: <VehicleData control={control} register={register} />,
    },
    {
      label: 'IMAGENS DO VEICULO',
      description: (
        <VehicleImages
          setUpdating={setUpdating}
          cloudImages={cloudImages}
          vehicleData={vehicleData}
        />
      ),
    },
  ];

  const handleNext = () => setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep: number) => prevActiveStep - 1);

  useEffect(() => {
    setMainImage([]);
    setImages([]);
  }, []);

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  const onSubmit: SubmitHandler<VehicleProps> = (data) => {
    const generateId = generateUniqueId();
    if (vehicleData) {
      updateVehicles(data.vehicleId, data);
      mainImage.length && uploadMainImage(data.vehicleId, mainImage);
      images.length && uploadImages(data.vehicleId, images);
      setOpen!(false);
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
        <S.StepperBox>
          <S.StepperComponent activeStep={activeStep} orientation="vertical">
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <S.StepComponent key={label.label} {...stepProps}>
                  <S.StepLabelComponent>{label.label}</S.StepLabelComponent>
                  <S.StepContentComponent>{label.description}</S.StepContentComponent>
                </S.StepComponent>
              );
            })}
          </S.StepperComponent>
        </S.StepperBox>
        {/* <VehicleData control={control} register={register} />
        <VehicleImages
          setUpdating={setUpdating}
          cloudImages={cloudImages}
          vehicleData={vehicleData}
        /> */}
        {activeStep === 1 ? (
          <>
            <button className="step" type="button" onClick={handleBack}>
              Voltar etapa
            </button>
            <button type="submit">Atualizar Informações</button>
          </>
        ) : (
          <button className="step" type="button" onClick={handleNext}>
            Próxima etapa
          </button>
        )}
      </form>
    </S.FormContainer>
  );
};
