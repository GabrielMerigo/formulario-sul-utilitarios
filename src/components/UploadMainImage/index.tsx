import { DropContainer, UploadMessage } from '../Upload/styles';
import Dropzone from 'react-dropzone';
import { UploadProps } from '../Upload';

export default function UploadMainImage({ onUpload, disabled }: UploadProps) {
  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  }

  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          style={{ width: '60%' }}
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
          disabled={disabled}
        >
          <input disabled={disabled} {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  )

}