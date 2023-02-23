import * as S from './styles';
import * as P from 'phosphor-react';
import Image from 'next/image';
import { deleteObject, getDownloadURL, ref, StorageReference } from 'firebase/storage';
import { storage } from 'firebaseEnv';
import { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { VehiclesContext } from '@/contexts/VehiclesContext';

type ImagesCarrouselProps = {
  cloudImage: StorageReference;
  vehicleId: string;
};

export default function ImagesCarrousel({ cloudImage, vehicleId }: ImagesCarrouselProps) {
  const [imageUrl, setImageUrl] = useState('');
  const { deleteImage, fetchImagesUrlList } = useContext(VehiclesContext);

  const fetchImagesUrl = async () => {
    const response = await getDownloadURL(ref(storage, `${vehicleId}/${cloudImage.name}`));
    setImageUrl(response);
  };

  const handleDeleteSingleImage = () => {
    deleteImage(vehicleId, cloudImage.name);
  };

  useEffect(() => {
    fetchImagesUrl();
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
