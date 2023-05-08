import * as S from './styles'
import * as P from 'phosphor-react'
import * as Z from 'zod'
import {
  CloudImagesArrayProps,
  CloudMainImageImageProps,
  CreateVehicleProps,
  FirebaseVehicleProps,
} from '@/types/VehiclesTypes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { VehiclesContext } from '@/contexts/VehiclesContext'
import { postVehicles, updateVehicles } from '@/utils/fireStoreDatabase'
import { uploadImages, uploadMainImage } from '@/utils/fireStorage'
import { formatValue } from '@/utils/FormatNumberValue'
import { VehicleData } from './VehicleData'
import { VehicleImages } from './VehicleImages'
import router from 'next/router'
import { toast } from 'react-toastify'
import { Loading } from '../Loading'

type VehicleFormProps = {
  setUpdating?: Dispatch<SetStateAction<boolean>>
  vehicleData?: FirebaseVehicleProps
  images?: {
    name: string
    url: string
  }[]
  setOpen?: Dispatch<SetStateAction<boolean>>
}

type imagesProps = {
  name: string
  url: string
}

const newVehicleFormValidationSchema = Z.object({
  vehicleType: Z.string().min(1, { message: 'Informe o tipo do veículo' }),
  vehicleName: Z.string().min(1, { message: 'Informe o nome do veículo' }),
  vehiclePrice: Z.coerce.string().min(1, { message: 'Informe o valor do veículo' }),
  brand: Z.string().min(1, { message: 'Informe a marca' }),
  model: Z.string().min(1, { message: 'Informe o modelo' }),
  manufactureYear: Z.string().min(4, { message: 'Informe o ano de fabricação' }),
  manufactureModel: Z.string().min(4, 'Informe o ano do modelo'),
  traction: Z.string().min(1, { message: 'Informe o tipo de tração' }),
  bodywork: Z.string().min(1, { message: 'Informe o chassi' }),
  description: Z.coerce.string(),
  created_at: Z.coerce.string(),
})

export const VehicleForm = ({ setUpdating, images, vehicleData, setOpen }: VehicleFormProps) => {
  const { newMainImage, newImages, setNewImages, setNewMainImage, setVehicleItemImages } =
    useContext(VehiclesContext)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [sedingData, setSendingData] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVehicleProps>({
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
      mainImageUrl: vehicleData?.mainImageUrl,
      imagesUrl: vehicleData?.imagesUrl,
    },
  })

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
        <VehicleImages setUpdating={setUpdating} images={images} vehicleData={vehicleData} />
      ),
    },
  ]

  const handleNext = () => {
    if (Object.entries(errors).length > 0) {
      const errorsArray = Object.entries(errors).reduce((acc: string, error, index) => {
        let transletedError = ''
        switch (error[0]) {
          case 'vehicleType':
            transletedError = 'Tipo de Veículo'
            break
          case 'vehicleName':
            transletedError = 'Nome do Veículo'
            break
          case 'vehiclePrice':
            transletedError = 'Valor do Veículo'
            break
          case 'brand':
            transletedError = 'Marca do Veículo'
            break
          case 'model':
            transletedError = 'Modelo do Veículo'
            break
          case 'manufactureYear':
            transletedError = 'Ano de fabricação do Veículo'
            break
          case 'manufactureModel':
            transletedError = 'Ano do modelo do Veículo'
            break
          case 'traction':
            transletedError = 'Tração do Veículo'
            break
          case 'bodywork':
            transletedError = 'Carroceria do Veículo'
            break
        }
        index < Object.entries(errors).length - 1
          ? (acc += `${transletedError},\n`)
          : (acc += `${transletedError}`)
        return acc
      }, '')
      toast(`Houve um erro ou os campos abaixo estão vazios:\n\n${errorsArray}`, {
        className: 'error',
      })
    }
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
  }
  const handleBack = () => setActiveStep((prevActiveStep: number) => prevActiveStep - 1)

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9)
  }

  const onSubmit: SubmitHandler<CreateVehicleProps> = async (data) => {
    setSendingData(true)
    const generateId = generateUniqueId()
    const formattedValue = formatValue(String(data.vehiclePrice))
    data.vehiclePrice = formattedValue

    if (vehicleData) {
      const thereIsAnewMainImage = newMainImage.length > 0
      const thereArenewImages = newImages.length > 0

      const uploadMainImagesAndGetUrl =
        thereIsAnewMainImage && (await uploadMainImage(vehicleData.vehicleId, newMainImage))
      const uploadImagesAndGetUrl =
        thereArenewImages && (await uploadImages(vehicleData.vehicleId, newImages))

      await updateVehicles(vehicleData.vehicleId, {
        ...data,
        vehicleId: vehicleData.vehicleId,
        created_at: vehicleData.created_at,
        mainImageUrl: thereIsAnewMainImage
          ? (uploadMainImagesAndGetUrl as CloudMainImageImageProps)
          : vehicleData.mainImageUrl,
        imagesUrl: thereArenewImages
          ? [...vehicleData.imagesUrl, ...(uploadImagesAndGetUrl as CloudImagesArrayProps)]
          : (vehicleData.imagesUrl as CloudImagesArrayProps),
      })

      setNewImages([])
      setNewMainImage([])
      setSendingData(false)
      setOpen!(false)
      toast('Os dados do veiculo foram atualizados', { className: 'success' })
      return
    }

    const uploadMainImagesAndGetUrl =
      newMainImage.length > 0 && (await uploadMainImage(generateId, newMainImage))
    const uploadImagesAndGetUrl =
      newImages.length > 0 && (await uploadImages(generateId, newImages))

    await postVehicles({
      ...data,
      vehicleId: generateId,
      mainImageUrl: uploadMainImagesAndGetUrl as { name: string; url: string },
      imagesUrl: uploadImagesAndGetUrl as imagesProps[],
      created_at: new Date(),
    })
    toast('Veiculo registrado!', { className: 'success', autoClose: 5000 })
    setNewImages([])
    setNewMainImage([])
    setSendingData(false)
    router.push('ListVehicles/')
  }

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
              const stepProps: { completed?: boolean } = {}
              return (
                <S.StepComponent key={label.label} {...stepProps}>
                  <S.StepLabelComponent>{label.label}</S.StepLabelComponent>
                  <S.StepContentComponent>{label.description}</S.StepContentComponent>
                </S.StepComponent>
              )
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
              {sedingData ? <Loading /> : <P.Check size={32} />}
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
  )
}
