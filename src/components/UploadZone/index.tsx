import { useContext, useEffect, useState } from 'react';
import * as P from 'phosphor-react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import * as S from './styles';
import { ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { setManyImagesUrls, fetchMainImageUrl, deleteImageByURL } from '@/utils/fireStorage';

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
  const [URLCloudMainImage, setURLCloudMainImage] = useState('');
  const [URLCloudImages, setURLCloudImages] = useState<string[]>([]);
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
    setURLCloudMainImage('');
    setURLCloudImages([]);

    if (setUpdating && cloudMainImage) {
      fetchMainImageUrl(vehicleId!, setURLCloudMainImage);
    }

    if (setUpdating && cloudImages) {
      setManyImagesUrls(vehicleId!, cloudImages!, setURLCloudImages);
    }
  }, []);

  const mainThumb = () => {
    if (URLCloudMainImage && !mainImage.length) {
      return (
        <S.ThumbContainer key={URLCloudMainImage} style={{ display: 'inline-flex' }}>
          <Image
            src={URLCloudMainImage}
            alt={URLCloudMainImage}
            width={200}
            height={200}
            style={{ margin: 10 }}
          />
        </S.ThumbContainer>
      );
    }
    if (mainImage.length) {
      return (
        <S.ThumbContainer key={mainImage[0].name} style={{ display: 'inline-flex' }}>
          <Image
            src={mainImage[0].preview}
            alt={mainImage[0].name}
            width={200}
            height={200}
            style={{ margin: 10 }}
          />
        </S.ThumbContainer>
      );
    }
    return (
      <S.ThumbContainer>
        <h4>Nenhuma imagem principal adicionada</h4>
      </S.ThumbContainer>
    );
  };

  const handleMainImageDropzoneStatus = () => {
    if (isDragAccept) {
      return <strong>Arquivo suportado!</strong>;
    }

    if (isDragReject) {
      return <strong>Arquivo não suportado!</strong>;
    }

    if (setUpdating) {
      return <strong>Arraste ou clique aqui para subistituir a imagem principal</strong>;
    }

    return <strong>Arraste ou clique aqui para inserir a imagem principal</strong>;
  };

  const handleImagesDropzoneStatus = () => {
    if (isDragAccept) {
      return <strong>Arquivo suportado!</strong>;
    }

    if (isDragReject) {
      return <strong>Arquivo não suportado!</strong>;
    }

    if (setUpdating) {
      return <strong>Arraste ou clique aqui para adicionar mais imagens</strong>;
    }

    return <strong>Arraste ou clique aqui para Inserir as imagens!</strong>;
  };

  const handleDeleteRegistredSingleImage = (cloudImageName: string[]) => {
    deleteImageByURL(vehicleId!, cloudImageName, URLCloudImages, setURLCloudImages);
  };

  const handleDeleteSingleImageToAdd = (imageToRemove: ImageFile) => {
    const remainingImages = images.filter((image) => image.name !== imageToRemove.name);
    setImages(remainingImages);
  };

  return (
    <>
      {imageType === 'Main' ? (
        <S.Container>
          <h3>Imagem principal</h3>
          <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {handleMainImageDropzoneStatus()}
            </div>
          </S.ZoneContainer>
          {mainThumb()}
        </S.Container>
      ) : (
        <S.Container>
          <h3>Imagens</h3>
          {setUpdating && (
            <>
              <h4>Imagens Registradas:</h4>
              <S.ImageContainer>
                <S.ThumbContainer>
                  {URLCloudImages.length ? (
                    URLCloudImages.map((image) => {
                      return (
                        <div key={image} style={{ display: 'inline-flex' }}>
                          <S.DeleteImageButton
                            onClick={() => handleDeleteRegistredSingleImage(image.split('||'))}
                          >
                            <P.Trash size={32} />
                          </S.DeleteImageButton>
                          <Image
                            src={image}
                            alt={image}
                            width={200}
                            height={200}
                            style={{ margin: 10 }}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <h4>Nenhuma imagem registrada</h4>
                  )}
                </S.ThumbContainer>
              </S.ImageContainer>
            </>
          )}
          <h4>Adicionando Imagens:</h4>
          <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {handleImagesDropzoneStatus()}
            </div>
          </S.ZoneContainer>
          <S.ImageContainer>
            <S.ThumbContainer>
              {images.length ? (
                images.map((image, index) => {
                  return (
                    <div key={index} style={{ display: 'inline-flex' }}>
                      <S.DeleteImageButton
                        type="button"
                        onClick={() => handleDeleteSingleImageToAdd(image)}
                      >
                        <P.Trash size={32} />
                      </S.DeleteImageButton>
                      <Image
                        src={image.preview}
                        alt={image.name}
                        width={200}
                        height={200}
                        style={{ margin: 10 }}
                      />
                    </div>
                  );
                })
              ) : (
                <S.ThumbContainer>
                  <h4>Nenhuma imagem nova sendo adicionada</h4>
                </S.ThumbContainer>
              )}
            </S.ThumbContainer>
          </S.ImageContainer>
        </S.Container>
      )}
    </>
  );
}
