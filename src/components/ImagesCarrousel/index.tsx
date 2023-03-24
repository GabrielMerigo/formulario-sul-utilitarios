/* eslint-disable @next/next/no-img-element */
import * as S from './styles';
import * as P from 'phosphor-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { FirebaseVehicleProps } from '@/types/VehiclesTypes';
import { useContext } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type ImagesCarrouselProps = {
  image: {
    name: string;
    url: string;
  };
  thumb: boolean;
  vehicle: FirebaseVehicleProps;
};

export default function ImagesCarrousel({ image, thumb, vehicle }: ImagesCarrouselProps) {
  const { handleDeleteSingleImage } = useContext(VehiclesContext);
  return (
    <>
      {thumb ? (
        <S.ThumbContainer>
          {image ? (
            <LazyLoadImage effect="blur" src={image.url} alt={image.name} style={{ margin: 10 }} />
          ) : (
            <></>
          )}
        </S.ThumbContainer>
      ) : (
        <S.CarrouselContainer>
          <S.DeleteImageButton onClick={() => handleDeleteSingleImage(vehicle, image.name)}>
            <P.Trash size={32} />
          </S.DeleteImageButton>
          {image ? (
            <LazyLoadImage effect="blur" src={image.url} alt={image.name} style={{ margin: 10 }} />
          ) : (
            <h3>Sem imagem</h3>
          )}
        </S.CarrouselContainer>
      )}
    </>
  );
}
