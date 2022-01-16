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

export const DropContainer = styled.div.attrs({
  className: 'dropzone'
})`
  border: 1px dashed #ddd;
  border-radius:4px;
  cursor: pointer;
  
  
  transition: height 0.2s ease;

  ${props => props.disabled && disabled}

  ${props => props.isDragActive && dragActive}
  ${props => props.isDragReject && dragReject}
`;

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5'

};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || 'default']};
  justify-content: center;
  align-items:center;
  padding: 15px 0;
`;