import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import * as S from './styles';
import { UploadzoneProps } from '@/types/VehiclesTypes';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { setManyImagesUrls, fetchMainImageUrl } from '@/utils/fireStorage';

const transformArrayType = (acceptedFiles: File[]) => {
  const propsToFile = (props: File) => props;
  return acceptedFiles.map(propsToFile);
};

const acceptedImages = {
  'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
};

export default function UploadZone({
  imageType,
  setUpdating,
  vehicleId,
  cloudMainImage,
  cloudImages,
}: UploadzoneProps) {
  const { setMainImage, setImages, mainImage, images } = useContext(VehiclesContext);
  const [URLCloudMainImage, setCloudMainImage] = useState('');
  const [URLCloudImages, setCloudImages] = useState<string[]>([]);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: acceptedImages,
    onDrop: (acceptedFiles) => {
      const transformedArray = transformArrayType(acceptedFiles);

      if (imageType === 'Main') {
        setMainImage(
          transformedArray.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        return;
      }
      setImages((state) => [
        ...state,
        ...transformedArray.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  useEffect(() => {
    if (setUpdating && cloudMainImage) {
      fetchMainImageUrl(vehicleId!, setCloudMainImage);
    }

    if (setUpdating && cloudImages) {
      setManyImagesUrls(vehicleId!, cloudImages!, setCloudImages);
    }
  }, []);

  const mainThumb = () => {
    if (URLCloudMainImage) {
      return (
        <div key={URLCloudMainImage} style={{ display: 'inline-flex' }}>
          <Image
            src={URLCloudMainImage}
            alt={URLCloudMainImage}
            width={200}
            height={200}
            style={{ margin: 10 }}
          />
        </div>
      );
    }
    if (mainImage.length) {
      return (
        <div key={mainImage[0].name} style={{ display: 'inline-flex' }}>
          <Image
            src={mainImage[0].preview}
            alt={mainImage[0].name}
            width={200}
            height={200}
            style={{ margin: 10 }}
          />
        </div>
      );
    }
    return <h4>Sem Arquivos</h4>;
  };

  const imagesThumbs = () => {
    if (URLCloudImages) {
      return URLCloudImages.map((image) => {
        return (
          <div key={image} style={{ display: 'inline-flex' }}>
            <Image src={image} alt={image} width={200} height={200} style={{ margin: 10 }} />
          </div>
        );
      });
    }
    if (images.length) {
      return images.map((image) => {
        return (
          <div key={image.name} style={{ display: 'inline-flex' }}>
            <Image
              src={image.preview}
              alt={image.name}
              width={200}
              height={200}
              style={{ margin: 10 }}
            />
          </div>
        );
      });
    }
    return <h4>Sem Arquivos</h4>;
  };

  const handleDropzoneStatus = () => {
    if (isDragAccept) {
      return <strong>Arquivo suportado!</strong>;
    }

    if (isDragReject) {
      return <strong>Arquivo não suportado!</strong>;
    }

    return <strong>Arraste ou clique aqui para Inserir as imagens!</strong>;
  };

  return (
    <>
      {imageType === 'Main' ? (
        <S.Container>
          <h3>Imagem principal</h3>
          <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {handleDropzoneStatus()}
            </div>
          </S.ZoneContainer>
          <h4>Lista de arquivos</h4>
          {mainThumb()}
        </S.Container>
      ) : (
        <S.Container>
          <h3>Imagens</h3>
          <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {handleDropzoneStatus()}
            </div>
          </S.ZoneContainer>
          <h4>Lista de arquivos</h4>
          <S.MainImageContainer>{imagesThumbs()}</S.MainImageContainer>
        </S.Container>
      )}
    </>
  );
}
