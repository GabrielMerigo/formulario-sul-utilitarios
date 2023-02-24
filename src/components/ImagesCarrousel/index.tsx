import * as S from './styles';
import * as P from 'phosphor-react';
import Image from 'next/image';
import { StorageReference } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { deleteImage, fetchImageUrl, fetchImagesReferenceList } from '@/utils/fireStorage';

type ImagesCarrouselProps = {
  cloudImage: StorageReference;
  vehicleId: string;
};

export default function ImagesCarrousel({ cloudImage, vehicleId }: ImagesCarrouselProps) {
  const [imageUrl, setImageUrl] = useState('');
  const { setCloudImages, cloudImages } = useContext(VehiclesContext);

  fetchImageUrl(vehicleId, cloudImage, setImageUrl);

  const handleDeleteSingleImage = () => {
    deleteImage(vehicleId, cloudImage.name, cloudImages, setCloudImages);
  };

  useEffect(() => {
    fetchImageUrl(vehicleId, cloudImage, setImageUrl);
  }, []);

  return (
    <S.CarrouselContainer>
      <S.DeleteImageButton onClick={() => handleDeleteSingleImage()}>
        <P.Trash size={32} />
      </S.DeleteImageButton>
      <Image src={imageUrl} alt="vehicle" width={200} height={400} style={{ margin: 10 }} />
    </S.CarrouselContainer>
  );
}
