import { useContext, useEffect, useState } from 'react';
import * as P from 'phosphor-react';
import { useDropzone } from 'react-dropzone';
import * as S from './styles';
import { ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';
import { VehiclesContext } from '@/contexts/VehiclesContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const transformArrayType = (acceptedFiles: File[]) => {
  const propsToFile = (props: File) => props;
  return acceptedFiles.map(propsToFile);
};

const acceptedImages = {
  'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
};

export default function UploadZone({ setUpdating, vehicle, imageType }: UploadzoneProps) {
  const {
    vehicleItemImages,
    newMainImage,
    newImages,
    setNewImages,
    setNewMainImage,
    handleDeleteSingleImage,
  } = useContext(VehiclesContext);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: acceptedImages,
    onDrop: (acceptedFiles) => {
      const transformedArray = transformArrayType(acceptedFiles);

      if (imageType === 'Main') {
        setNewMainImage(
          transformedArray.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        return;
      }
      setNewImages((state) => [
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
    setNewImages([]);
    setNewMainImage([]);
  }, []);

  const mainThumb = () => {
    if (imageType === 'Main' && vehicle?.mainImageUrl.url && !newMainImage.length) {
      return (
        <S.ThumbContainer key={vehicle?.mainImageUrl.url} style={{ display: 'inline-flex' }}>
          <LazyLoadImage
            effect="blur"
            src={vehicle?.mainImageUrl.url}
            alt={vehicle?.mainImageUrl.name}
            width={200}
            height={200}
            style={{ margin: 10 }}
          />
        </S.ThumbContainer>
      );
    }
    if (newMainImage.length) {
      return (
        <S.ThumbContainer key={newMainImage[0].name} style={{ display: 'inline-flex' }}>
          <LazyLoadImage
            effect="blur"
            src={newMainImage[0].preview}
            alt={newMainImage[0].name}
            width={200}
            height={200}
            style={{ margin: 10 }}
          />
        </S.ThumbContainer>
      );
    }
    return (
      <S.ThumbContainer>
        {!newMainImage.length && <h4>Nenhuma imagem principal adicionada</h4>}
        {/* {loadingMainImage && <Loading />} */}
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
      return <strong>Arraste ou clique aqui para substituir a imagem principal</strong>;
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

  const handleDeleteSingleImageToAdd = (imageToRemove: ImageFile) => {
    const remainingImages = newImages.filter((image) => image.name !== imageToRemove.name);
    setNewImages(remainingImages);
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
                  {vehicle?.imagesUrl.length &&
                    vehicle?.imagesUrl.map((image) => {
                      return (
                        <div key={image.url} style={{ display: 'inline-flex' }}>
                          <S.DeleteImageButton
                            type="button"
                            onClick={() => handleDeleteSingleImage(vehicle, image.name)}
                          >
                            <P.Trash size={32} />
                          </S.DeleteImageButton>
                          <LazyLoadImage
                            effect="blur"
                            src={image.url}
                            alt={image.name}
                            width={200}
                            height={200}
                            style={{ margin: 10 }}
                          />
                        </div>
                      );
                    })}
                  {/* {loadingImages && <Loading />} */}
                  {!vehicle?.imagesUrl.length && <h4>Sem imagens registradas</h4>}
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
              {newImages.length ? (
                newImages.map((image, index) => {
                  return (
                    <div key={index} style={{ display: 'inline-flex' }}>
                      <S.DeleteImageButton
                        type="button"
                        onClick={() => handleDeleteSingleImageToAdd(image)}
                      >
                        <P.Trash size={32} />
                      </S.DeleteImageButton>
                      <LazyLoadImage
                        effect="blur"
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
