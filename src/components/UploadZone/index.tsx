import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as S from './styles';

type FilesProps = {
  path: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
};

type UploadzoneProps = {
  imageType: string;
};

export default function UploadZone({ imageType }: UploadzoneProps) {
  const [files, setFiles] = useState<FilesProps[]>([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((state) => [...state, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
  });

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
          <ul>
            {files?.map((file) => (
              <li key={file.path}>
                <strong>Nome do arquivo: </strong>
                <span>{file.path}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h4>Sem Arquivos</h4>
      )}
    </S.Container>
  );
}
