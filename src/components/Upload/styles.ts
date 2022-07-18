import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78e5d5;
`;


const dragReject = css`
  border-color: #e57878;
`;

const disabled = css`
  border: 1px dashed #3d3d3d;
  cursor: not-allowed;
`;


export const DropContainer: any = styled.div.attrs<any>({
  className: 'dropzone'
})`
  border: 1px dashed #ddd;
  border-radius:4px;
  cursor: pointer;
  
  
  transition: height 0.2s ease;

  ${(props: any) => props.disabled && disabled}
  ${(props: any) => props.isDragActive && dragActive}
  ${(props: any) => props.isDragReject && dragReject}
`;

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5'
};

type UploadMessageProps = {
  type?: 'default' | 'error' | 'success'
}

export const UploadMessage = styled.p<UploadMessageProps>`
  ${({ type }) => css`
    display: flex;
    color: ${messageColors[type || 'default']};
    justify-content: center;
    align-items:center;
    padding: 15px 0;
  `}
`;