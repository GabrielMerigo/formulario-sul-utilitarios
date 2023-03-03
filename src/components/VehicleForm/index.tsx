import * as S from './styles';
import * as P from 'phosphor-react';
import * as Z from 'zod';
import { VehicleProps } from '@/types/VehiclesTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { StorageReference } from 'firebase/storage';
import { postVehicles, updateVehicles } from '@/utils/fireStoreDatabase';
import { uploadImages, uploadMainImage } from '@/utils/fireStorage';
import { formatValue } from '@/utils/FormatNumberValue';
import { VehicleData } from './VehicleData';
import { VehicleImages } from './VehicleImages';
import router from 'next/router';
import { toast } from 'react-toastify';

type VehicleFormProps = {
  setUpdating?: Dispatch<SetStateAction<boolean>>;
  vehicleData?: VehicleProps;
  cloudImages?: StorageReference[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const newVehicleFormValidationSchema = Z.object({
  vehicleType: Z.string().min(1, { message: 'Informe o tipo do veículo' }),
  vehicleName: Z.string().min(1, { message: 'Informe O nome do veículo' }),
  vehiclePrice: Z.coerce.string().min(1, { message: 'Informe O nome do veículo' }),
  brand: Z.string().min(1, { message: 'Informe a marca' }),
  model: Z.string().min(1, { message: 'Informe o modelo' }),
  manufactureYear: Z.string().min(4, { message: 'Informe o ano de fabricação' }),
  manufactureModel: Z.string().min(4, 'Informe o ano do modelo'),
  traction: Z.string().min(1, { message: 'Informe o tipo de tração' }),
  bodywork: Z.string().min(1, { message: 'Informe o chassi' }),
  description: Z.coerce.string(),
  // created_at: Z.coerce.date(),
});

export const VehicleForm = ({
  setUpdating,
  cloudImages,
  vehicleData,
  setOpen,
}: VehicleFormProps) => {
  const { mainImage, images, setMainImage, setImages } = useContext(VehiclesContext);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [sedingData, setSendingData] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleProps>({
    resolver: zodResolver(newVehicleFormValidationSchema),
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
  console.log(errors);
  const steps = [
    {
      label: 'DADOS DO VEICULO',
      description: (
        <VehicleData
          control={control}
          register={register}
          errors={errors}
          vehiclePrice={vehicleData?.vehiclePrice}
        />
      ),
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

  const onSubmit: SubmitHandler<VehicleProps> = async (data) => {
    const generateId = generateUniqueId();
    const formattedValue = formatValue(String(data.vehiclePrice));
    data.vehiclePrice = formattedValue;

    if (vehicleData) {
      updateVehicles(vehicleData.vehicleId, {
        ...data,
        vehicleId: vehicleData.vehicleId,
        // created_at: new Date(),
      });
      mainImage.length && uploadMainImage(data.vehicleId, mainImage, setSendingData);
      images.length && uploadImages(data.vehicleId, images, setSendingData);
      setOpen!(false);
      toast('Os dados do veiculo foram atualizados');
      !sedingData && router.push('ListVehicles/');
      return;
    }
    mainImage.length && (await uploadMainImage(generateId, mainImage, setSendingData));
    images.length && (await uploadImages(generateId, images, setSendingData));
    postVehicles({ ...data, vehicleId: generateId });
    toast('Veiculo registrado!');
    !sedingData && router.push('ListVehicles/');
  };

  return (
    <S.FormContainer>
      {setUpdating && (
        <S.ButtonsContainer>
          <div>
            <button onClick={() => setUpdating(false)} className="leftUpdate">
              <P.ArrowBendDoubleUpLeft size={32} />
              Sair da edição
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
        {activeStep === 1 ? (
          <S.FormButtonsContainer>
            <button className="step" type="button" onClick={handleBack}>
              <P.ArrowFatLeft size={32} />
              Voltar etapa
            </button>
            <button type="submit">
              <P.Check size={32} />
              Atualizar Informações
            </button>
          </S.FormButtonsContainer>
        ) : (
          <S.FormButtonsContainer className="next">
            <button className="step" type="button" onClick={handleNext}>
              Próxima etapa
              <P.ArrowFatRight size={32} />
            </button>
          </S.FormButtonsContainer>
        )}
      </form>
    </S.FormContainer>
  );
};
