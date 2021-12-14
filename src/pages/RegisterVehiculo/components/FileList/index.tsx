import { Container, FileInfo, Preview } from './styles.FileList';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import 'react-circular-progressbar/dist/styles.css';
import { FileProps } from '../../RegisterVehiculo';
import { HStack } from '@chakra-ui/react';

interface FileListProps {
  files: FileProps[]
}

export default function FileList({ files }: FileListProps) {
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
                  <button onClick={() => { }}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded &&
              !uploadedFile.error && (
                <HStack p={4}>
                  <AiFillCheckCircle style={{
                    fontSize: '27px',
                    color: '#78e5d5'
                  }} />
                  <BsFillTrashFill onClick={() => {}} size={24} color="#e57878" />
                </HStack>
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