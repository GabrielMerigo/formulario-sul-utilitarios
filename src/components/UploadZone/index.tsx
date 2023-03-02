import { useContext, useEffect, useState } from 'react';
import * as P from 'phosphor-react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import * as S from './styles';
import { ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { setManyImagesUrls, fetchMainImageUrl, deleteImageByURL } from '@/utils/fireStorage';
import { Loading } from '../Loading';

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
  const [loadingMainImage, setLoadingMainImage] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
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
      fetchMainImageUrl(vehicleId!, setURLCloudMainImage, setLoadingMainImage);
    }

    if (setUpdating && cloudImages) {
      setManyImagesUrls(vehicleId!, cloudImages!, setURLCloudImages, setLoadingImages);
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
        {!loadingMainImage && !mainImage.length && <h4>Nenhuma imagem principal adicionada</h4>}
        {loadingMainImage && <Loading />}
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
          <S.ImageContainer>
            <S.TitleContainer>
              <P.Star size={32} />
              <h4>Imagem Principal:</h4>
            </S.TitleContainer>
            {mainThumb()}
          </S.ImageContainer>
          <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {handleMainImageDropzoneStatus()}
            </div>
          </S.ZoneContainer>
        </S.Container>
      ) : (
        <S.Container>
          {setUpdating && (
            <>
              <S.ImageContainer>
                <S.TitleContainer>
                  <P.Scroll size={32} />
                  <h4>Imagens Registradas:</h4>
                </S.TitleContainer>
                <S.ThumbContainer>
                  {URLCloudImages.length &&
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
                    })}
                  {loadingImages && <Loading />}
                  {!loadingImages && !URLCloudImages.length && <h4>Sem imagens registradas</h4>}
                </S.ThumbContainer>
              </S.ImageContainer>
            </>
          )}
          <S.ImageContainer>
            <S.TitleContainer>
              <P.PlusCircle size={32} />
              <h4>Adicionando imagens:</h4>
            </S.TitleContainer>
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
          <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {handleImagesDropzoneStatus()}
            </div>
          </S.ZoneContainer>
        </S.Container>
      )}
    </>
  );
}
