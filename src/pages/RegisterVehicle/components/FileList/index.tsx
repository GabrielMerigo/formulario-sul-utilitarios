import { Container, FileInfo, Icons, Preview } from './styles.FileList';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import 'react-circular-progressbar/dist/styles.css';
import { FileProps } from '../../../registerVehicle';
import { HStack } from '@chakra-ui/react';

interface FileListProps {
  files: FileProps[]
  handleDeleteOtherFiles: (id: number) => void;
}

export default function FileList({ files, handleDeleteOtherFiles }: FileListProps) {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{" "}
                {!!uploadedFile.url && (
                  <button>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded &&
              !uploadedFile.error && (
                <Icons>
                  <HStack p={4}>
                    <AiFillCheckCircle style={{
                      fontSize: '27px',
                      color: '#78e5d5'
                    }} />
                    <BsFillTrashFill onClick={() => handleDeleteOtherFiles(uploadedFile.id)} size={24} color="#e57878" />
                  </HStack>
                </Icons>
              )}

            {uploadedFile.url && (
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="white" />
              </a>
            )}

          </div>
        </li>
      ))}
    </Container>
  )
}