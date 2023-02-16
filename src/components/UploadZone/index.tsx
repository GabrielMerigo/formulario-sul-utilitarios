import { SetStateAction, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import * as S from './styles';
import { ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';

export default function UploadZone({ imageType }: UploadzoneProps) {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
    onDrop: (acceptedFiles) => {
      const propsToFile = (props: File) => props;

      const transformedArray = acceptedFiles.map(propsToFile);

      console.log(transformedArray);

      if (imageType === 'Main') {
        setFiles(
          transformedArray.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        return;
      }
      setFiles((state) => [
        ...state,
        ...transformedArray.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const thumbs = files.map((file) => (
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
    <S.Container>
      <h3>{imageType === 'Main' ? 'Imagem principal' : 'Imagens Secundarias'}</h3>
      <S.ZoneContainer {...getRootProps({ isDragAccept, isDragReject })}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {handleDropzoneStatus()}
        </div>
      </S.ZoneContainer>
      <h4>Lista de arquivos</h4>
      {files.length ? (
        <>
          <S.MainImageContainer>{files && thumbs}</S.MainImageContainer>
        </>
      ) : (
        <h4>Sem Arquivos</h4>
      )}
    </S.Container>
  );
}
