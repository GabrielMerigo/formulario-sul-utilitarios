import { mediaQuery } from '@/styles/ResponsiveStyle';
import styled, { css } from 'styled-components';

export const ThumbContainer = styled.div`
  img {
    max-width: 100%;
    height: auto;
    aspect-ratio: 3/2;
  }
`;

export const CarrouselContainer = styled.div`
  width: 100%;

  img {
    height: 400px;
    width: 200px;
  }

  ${mediaQuery(
    'lg',
    'max'
  )(`
      img {
        height: 250px;
        width: 100px;
      }
    `)}

  ${mediaQuery(
    'sm',
    'max'
  )(`
      img {
        height: 200px;
      }
    `)}
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
