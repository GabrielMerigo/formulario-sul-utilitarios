import styled, { css } from 'styled-components';
import * as D from '@radix-ui/react-dialog';
import * as R from '@radix-ui/react-radio-group';
import { Carousel } from 'react-responsive-carousel';

export const Overlay = styled(D.Overlay)`
  ${({ theme }) => css`
    background: rgba(0 0 0 / 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    overflow-y: auto;
  `}
`;

export const Content = styled(D.Content)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow-y: auto;

    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 1100px;
    max-height: 800px;
    padding: 50px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    background-color: ${theme['gray-700']};

    &:focus {
      outline: none;
    }

    h3 {
      font-size: 2.4rem;
      font-weight: bolder;
      margin-bottom: 1rem;
    }
  `}
`;

export const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 2rem;

    button.delete {
      align-self: flex-end;
      cursor: pointer;
      background-color: transparent;
      color: ${theme['gray-50']};
      border: none;
      margin-right: 2rem;
      &:hover {
        transition: background ease 0.7s;
        color: ${theme['red-400']};
      }
    }

    button.update {
      align-self: flex-end;
      cursor: pointer;
      background-color: transparent;
      color: ${theme['gray-50']};
      border: none;
      margin-right: 2rem;
      &:hover {
        transition: background ease 0.7s;
        color: ${theme['blue-500']};
      }
    }
  `}
`;

export const CloseDialogButton = styled(D.Close)`
  ${({ theme }) => css`
    cursor: pointer;

    margin: 2rem 2rem 0 0;

    background-color: transparent;
    border: none;

    color: ${theme['gray-900']};
  `}
`;

export const VehicleInfos = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: start;
  gap: 1.5rem;

  label {
    font-size: 2rem;
  }
`;

export const VehicleInfosGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;

  span {
    font-size: 2rem;
  }

  strong {
    font-size: 2rem;
  }
`;

export const VehiclecharacteristicsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem;

    border: 1px solid ${theme['gray-500']};
    border-radius: 10px;
  `}
`;

export const VehiclecharacteristicsGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    background-color: ${theme['gray-900']};
    border-radius: 30px;

    span {
      font-size: 2rem;
    }

    strong {
      font-size: 2rem;
    }
  `}
`;

export const VehicleDescriptionContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 1rem;

    width: 100%;

    span {
      font-size: 2rem;
      width: 100%;
      padding: 2rem;
      border-radius: 10px;
      background-color: ${theme['gray-900']};
    }

    strong {
      font-size: 2rem;
    }
  `}
`;

export const ImagesCarousel = styled(Carousel)`
  ${({ theme }) => css`
    padding-top: 30px;

    img {
      margin: 0 !important;
      border-radius: 10px;
    }

    .slider-wrapper {
      width: 50%;
    }

    .carousel .thumbs {
      display: flex;
      justify-content: center;
    }

    .carousel .thumb {
      border: 3px solid ${theme['gray-50']};
      border-radius: 10px;
    }

    .carousel .thumb.selected,
    .carousel .thumb:hover {
      border: 3px solid ${theme['gray-900']};
    }

    .carousel.carousel-slider .control-arrow {
      width: 200px;
      height: 200px;
      top: 25%;
      margin: 0 10px;
      background-color: ${theme['gray-900']};
      border-radius: 10px;

      background-color: ;
    }

    .carousel .carousel-status {
      top: initial;
      bottom: 0;
      right: 0;

      font-size: 2rem;
    }
  `}
`;

export const CarrouselContainer = styled.div`
  width: 100%;
  height: 100rem;

  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    padding: 20rem;
    font-size: 2rem;
    font-weight: bold;
  }
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
