import * as S from './styles';
import Image from 'next/image';
import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import { storage } from 'firebaseEnv';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

type ImagesCarrouselProps = {
  cloudImage: StorageReference;
  vehicleId: string;
};

export default function ImagesCarrousel({ cloudImage, vehicleId }: ImagesCarrouselProps) {
  const [imageUrl, setImageUrl] = useState('');
  const fetchImagesUrl = async () => {
    const response = await getDownloadURL(ref(storage, `${vehicleId}/${cloudImage.name}`));
    setImageUrl(response);
  };

  fetchImagesUrl();
  return (
    <>
      <Image src={imageUrl} alt="vehicle" width={200} height={400} style={{ margin: 10 }} />
    </>
  );
}
