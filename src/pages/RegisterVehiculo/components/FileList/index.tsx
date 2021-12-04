import { Container, FileInfo, Preview } from './styles.FileList';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import 'react-circular-progressbar/dist/styles.css';

export default function FileList() {
  return (
    <Container>
      <li>
        <FileInfo>
          <Preview src="https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png" />
          <div>
            <strong>Profile.png</strong>
            <span>
              <button onClick={() => { }}>
                Excluir
              </button>
            </span>
          </div>
        </FileInfo>

        <div>
          <CircularProgressbar
            styles={{
              root: { width: 24 },
              path: { stroke: "#7159c1" }
            }}
            strokeWidth={10}
            value={50}
          />

          <a
            href={'https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdLink style={{ marginRight: 8 }} size={24} color="white" />
            <MdCheckCircle size={24} color="#78e5d5" />
            <MdError size={24} color="#e57878" />
          </a>
        </div>
      </li>
    </Container>
  )
}