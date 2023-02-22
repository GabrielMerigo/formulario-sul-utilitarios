import { SetStateAction, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import * as S from './styles';
import { ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';
import { VehiclesContext } from '@/contexts/VehiclesContext';

const transformArrayType = (acceptedFiles: File[]) => {
  const propsToFile = (props: File) => props;
  return acceptedFiles.map(propsToFile);
};

const acceptedImages = {
  'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
};

export default function UploadZone({ imageType }: UploadzoneProps) {
  const { setMainImage, setImages, mainImage, images } = useContext(VehiclesContext);
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

  const mainThumb = () => (
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

  const imagesThumbs = images.map((file) => (
    <div key={file.name} style={{ display: 'inline-flex' }}>
      <Image src={file.preview} alt={file.name} width={200} height={200} style={{ margin: 10 }} />
    </div>
  ));

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
          {mainImage.length ? (
            <>
              <S.MainImageContainer>{mainThumb()}</S.MainImageContainer>
            </>
          ) : (
            <h4>Sem Arquivos</h4>
          )}
        </S.Container>
      ) : (
        <S.Container>
          <h3>Imagem principal</h3>
          <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {handleDropzoneStatus()}
            </div>
          </S.ZoneContainer>
          <h4>Lista de arquivos</h4>
          {images.length ? (
            <>
              <S.MainImageContainer>{imagesThumbs}</S.MainImageContainer>
            </>
          ) : (
            <h4>Sem Arquivos</h4>
          )}
        </S.Container>
      )}
    </>
  );
}
