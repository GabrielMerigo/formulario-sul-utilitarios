import { Container, FileInfo, Preview, Icons } from '../FileList/styles.FileList';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import 'react-circular-progressbar/dist/styles.css';
import { MainImage } from '../../pages/RegisterVehicle';
import { HStack } from '@chakra-ui/react';

interface FileListProps {
  files: MainImage,
  handleDelete: () => void;
}

export default function FileListMain({ files, handleDelete }: FileListProps) {
  return (
    <Container>
      <li>
        <FileInfo>
          <div>
            <strong>{files.name}</strong>
            <span>
              {files.readableSize}{" "}
            </span>
          </div>
        </FileInfo>

        <div>
          {!files.uploaded &&
            !files.error && (
              <Icons>
                <HStack p={4}>
                  <AiFillCheckCircle style={{
                    fontSize: '27px',
                    color: '#78e5d5'
                  }} />
                  <BsFillTrashFill onClick={handleDelete} size={24} color="#e57878" />
                  {files.url && (
                    <a
                      href={files.url}
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
    </Container>
  )
}