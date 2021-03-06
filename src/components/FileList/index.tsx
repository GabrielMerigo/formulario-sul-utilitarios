import { Container, FileInfo, Icons } from './styles.FileList';
import { MdLink } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import 'react-circular-progressbar/dist/styles.css';
import { FileProps } from '../../pages/RegisterVehicle';
import { HStack } from '@chakra-ui/react';

interface FileListProps {
  files: FileProps[]
  handleDeleteOtherFiles: (id: number) => void;
}

export default function FileList({ files, handleDeleteOtherFiles }: FileListProps) {
  return (
    <Container>
      {files.map((uploadedFile, index) => (
        <li key={index}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{" "}
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
                    {uploadedFile.url && (
                      <a
                        href={uploadedFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MdLink style={{ marginRight: 8 }} size={24} color="white" />
                      </a>
                    )}
                  </HStack>
                </Icons>
              )}
          </div>
        </li>
      ))}
    </Container>
  )
}