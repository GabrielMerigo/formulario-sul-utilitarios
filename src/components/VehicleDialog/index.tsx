import * as S from './styles';
import * as P from 'phosphor-react';
import { VehicleProps } from '@/types/VehiclesTypes';
import { useContext, useEffect, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { VehicleForm } from '../VehicleForm';
import ImagesCarrousel from '../ImagesCarrousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchImagesReferenceList } from '@/utils/fireStorage';
import { deleteVehicles } from '@/utils/fireStoreDatabase';

export default function VehicleDialog({
  vehicleId,
  vehicleType,
  vehicleName,
  vehiclePrice,
  brand,
  model,
  manufactureYear,
  manufactureModel,
  traction,
  bodywork,
  description,
}: VehicleProps) {
  const { cloudImages, setCloudImages } = useContext(VehiclesContext);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchImagesReferenceList(vehicleId, setCloudImages);
  }, [vehicleId, setCloudImages]);

  return (
    <>
      <S.Overlay />
      <S.Content>
        {!updating ? (
          <>
            <S.ButtonsContainer>
              <div>
                <button onClick={() => deleteVehicles(vehicleId)} className="delete">
                  <P.Trash size={32} />
                </button>
                <button onClick={() => setUpdating(true)} className="update">
                  <P.NotePencil size={32} />
                </button>
              </div>
              <S.CloseDialogButton aria-label="CloseDialogButton">
                <P.X size={32} />
              </S.CloseDialogButton>
            </S.ButtonsContainer>
            {cloudImages ? (
              <S.ImagesCarousel
                renderThumbs={() =>
                  cloudImages.map((cloudImage) => (
                    <ImagesCarrousel
                      key={cloudImage.name}
                      cloudImage={cloudImage}
                      vehicleId={vehicleId}
                      thumb={true}
                    />
                  ))
                }
              >
                {cloudImages.map((cloudImage) => {
                  return (
                    <ImagesCarrousel
                      key={cloudImage.name}
                      cloudImage={cloudImage}
                      vehicleId={vehicleId}
                      thumb={false}
                    />
                  );
                })}
              </S.ImagesCarousel>
            ) : (
              <h3>Sem imagens</h3>
            )}
            <h3>{vehicleName}</h3>
            <S.VehicleInfos>
              <S.VehicleInfosGroup>
                <strong>Tipo:</strong>
                <span>{vehicleType}</span>
              </S.VehicleInfosGroup>
              <S.VehicleInfosGroup>
                <strong>Preço:</strong>
                <span>{vehiclePrice}</span>
              </S.VehicleInfosGroup>
              <label>Características do veículo:</label>
              <S.VehiclecharacteristicsContainer>
                <S.VehiclecharacteristicsGroup>
                  <strong>Marca:</strong>
                  <span>{brand}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo:</strong>
                  <span>{model}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Ano de fabricação:</strong>
                  <span>{manufactureYear}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo de fabricação:</strong>
                  <span>{manufactureModel}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Tração:</strong>
                  <span>{traction}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Carroceria:</strong>
                  <span>{bodywork}</span>
                </S.VehiclecharacteristicsGroup>
              </S.VehiclecharacteristicsContainer>
              <S.VehicleDescriptionContainer>
                <strong>Descrição:</strong>
                <span>{description}</span>
              </S.VehicleDescriptionContainer>
            </S.VehicleInfos>
          </>
        ) : (
          <VehicleForm
            setUpdating={setUpdating}
            vehicleData={{
              vehicleId,
              vehicleType,
              vehicleName,
              vehiclePrice,
              brand,
              model,
              manufactureYear,
              manufactureModel,
              traction,
              bodywork,
              description,
            }}
            cloudImages={cloudImages}
          />
        )}
      </S.Content>
    </>
  );
}
