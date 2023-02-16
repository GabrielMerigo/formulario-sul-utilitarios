import styled, { css } from 'styled-components';
import * as D from '@radix-ui/react-dialog';

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

    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 800px;
    min-height: 600px;
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

export const CloseDialogButton = styled(D.Close)`
  ${({ theme }) => css`
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;

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