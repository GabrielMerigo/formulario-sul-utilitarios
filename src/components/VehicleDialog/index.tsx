import * as S from './styles';
import * as P from 'phosphor-react';
import { FirebaseVehicleProps } from '@/types/VehiclesTypes';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { VehicleForm } from '../VehicleForm';
import ImagesCarrousel from '../ImagesCarrousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { deleteVehicles } from '@/utils/fireStoreDatabase';
import { FormatToCurrency } from '@/utils/FormatNumber';
import { Loading } from '../Loading';

type DialogProps = {
  vehicle: FirebaseVehicleProps;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function VehicleDialog({ vehicle, setOpen }: DialogProps) {
  const { vehicleItemImages, setVehicleItemImages } = useContext(VehiclesContext);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusFormatter = (current: number, total: number) => `Imagem ${current} de ${total}`;

  return (
    <>
      <S.Overlay />
      <S.Content>
        {!updating ? (
          <>
            <S.ButtonsContainer>
              <div>
                <button onClick={() => deleteVehicles(vehicle.vehicleId)} className="delete">
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
            <S.CarrouselContainer>
              {vehicleItemImages && (
                <S.ImagesCarousel
                  statusFormatter={statusFormatter}
                  renderThumbs={() =>
                    vehicleItemImages.map((image) => (
                      <ImagesCarrousel
                        key={image.name}
                        image={image}
                        vehicle={vehicle}
                        thumb={true}
                      />
                    ))
                  }
                >
                  {vehicleItemImages.map((image) => {
                    return (
                      <ImagesCarrousel
                        key={image.name}
                        image={image}
                        vehicle={vehicle}
                        thumb={false}
                      />
                    );
                  })}
                </S.ImagesCarousel>
              )}
              {loading && <Loading />}
              {!loading && !vehicleItemImages.length && <h4>Imagens não encontradas</h4>}
            </S.CarrouselContainer>
            <h3>{vehicle.vehicleName}</h3>
            <S.VehicleInfos>
              <S.VehicleInfosGroup>
                <strong>Tipo:</strong>
                <span>{vehicle.vehicleType}</span>
              </S.VehicleInfosGroup>
              <S.VehicleInfosGroup>
                <strong>Preço:</strong>
                <span>{FormatToCurrency(vehicle.vehiclePrice)}</span>
              </S.VehicleInfosGroup>
              <label>Características do veículo:</label>
              <S.VehiclecharacteristicsContainer>
                <S.VehiclecharacteristicsGroup>
                  <strong>Marca:</strong>
                  <span>{vehicle.brand}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo:</strong>
                  <span>{vehicle.model}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Ano de fabricação:</strong>
                  <span>{vehicle.manufactureYear}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Modelo de fabricação:</strong>
                  <span>{vehicle.manufactureModel}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Tração:</strong>
                  <span>{vehicle.traction}</span>
                </S.VehiclecharacteristicsGroup>
                <S.VehiclecharacteristicsGroup>
                  <strong>Carroceria:</strong>
                  <span>{vehicle.bodywork}</span>
                </S.VehiclecharacteristicsGroup>
              </S.VehiclecharacteristicsContainer>
              <S.VehicleDescriptionContainer>
                <strong>Descrição:</strong>
                <span>{vehicle.description}</span>
              </S.VehicleDescriptionContainer>
            </S.VehicleInfos>
          </>
        ) : (
          <VehicleForm
            setUpdating={setUpdating}
            vehicleData={{ ...vehicle }}
            images={vehicleItemImages}
            setOpen={setOpen}
          />
        )}
      </S.Content>
    </>
  );
}
