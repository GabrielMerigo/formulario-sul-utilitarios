/* eslint-disable @next/next/no-img-element */
import * as S from './styles';
import * as P from 'phosphor-react';
import { StorageReference } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { deleteImageByStorageReference, fetchImageUrl } from '@/utils/fireStorage';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

type ImagesCarrouselProps = {
  cloudImage: StorageReference;
  vehicleId: string;
  thumb: boolean;
};

export default function ImagesCarrousel({ cloudImage, vehicleId, thumb }: ImagesCarrouselProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCloudImages, cloudImages } = useContext(VehiclesContext);

  const handleDeleteSingleImage = () => {
    deleteImageByStorageReference(vehicleId, cloudImage.name, cloudImages, setCloudImages);
  };

  useEffect(() => {
    fetchImageUrl(vehicleId, cloudImage, setImageUrl);
  }, []);

  return (
    <>
      {thumb ? (
        <S.ThumbContainer>
          {imageUrl ? (
            <img src={imageUrl} alt="vehicle" width={200} height={400} style={{ margin: 10 }} />
          ) : (
            <></>
          )}
        </S.ThumbContainer>
      ) : (
        <S.CarrouselContainer>
          <S.DeleteImageButton onClick={() => handleDeleteSingleImage()}>
            <P.Trash size={32} />
          </S.DeleteImageButton>
          {imageUrl ? (
            <img src={imageUrl} alt="vehicle" width={200} height={400} style={{ margin: 10 }} />
          ) : (
            <h3>Sem imagem</h3>
          )}
        </S.CarrouselContainer>
      )}
    </>
  );
}
