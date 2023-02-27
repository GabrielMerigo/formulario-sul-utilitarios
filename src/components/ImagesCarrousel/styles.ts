import styled, { css } from 'styled-components';

export const ThumbContainer = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const CarrouselContainer = styled.div`
  width: 100%;
`;

export const DeleteImageButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    border: none;
    border-radius: 50%;
    padding: 4px;

    background-color: ${theme['red-500']};
    color: ${theme['gray-50']};

    &:hover {
      transition: all ease 0.3s;
      background-color: ${theme['red-400']};
    }
  `}
`;
