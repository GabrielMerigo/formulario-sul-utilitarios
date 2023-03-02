import styled, { css } from 'styled-components';
import * as D from '@radix-ui/react-dialog';
import * as R from '@radix-ui/react-radio-group';
import * as M from '@mui/material';

export const FieldInputsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
  `}
`;

export const VehicleType = styled(R.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const VehicleTypeButton = styled(R.Item)`
  ${({ theme }) => css`
    background: ${theme['gray-900']};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    border: 0;
    color: ${theme['gray-300']};

    svg {
      color: ${theme['green-400']};
    }

    &[data-state='unchecked']:hover {
      background: ${({ theme }) => theme['gray-600']};
    }

    &[data-state='checked'] {
      color: ${theme['gray-50']};
      background: ${theme['green-500']};

      svg {
        color: ${theme['gray-50']};
      }
    }
  `}
`;

export const FormContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 1140px;
    flex: 1;
    padding: 2rem;

    form {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      label {
        font-size: 1.5rem;
      }

      button[type='submit'],
      button.step {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 5.6rem;
        margin-bottom: 2.4rem;
        border-radius: 10px;

        border: none;
        font-size: 1.6rem;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;
      }

      button[type='submit'] {
        background-color: ${theme['green-500']};
        color: ${theme['white']};

        &:hover {
          background-color: ${theme['green-400']};
          transition: background-color 0.2s;
        }
      }

      button.step {
        background-color: ${theme['blue-500']};
        color: ${theme['white']};

        &:hover {
          background-color: ${theme['blue-400']};
          transition: background-color 0.2s;
        }
      }
    }
  `}
`;

export const InputGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-direction: column;

    label,
    legend {
      align-self: flex-start;
      font-size: 1.4rem;
    }

    input {
      height: 5rem;
      border-radius: 10px;
      border: none;
      font-size: 1.4rem;
      padding: 2rem;
      text-align: start;
      background-color: ${theme['gray-200']};
      color: ${theme['gray-900']};

      &::placeholder {
        color: ${theme['gray-500']};
        font-size: 1.4rem;
      }
    }

    textarea {
      resize: none;
      width: 100%;
      height: 10rem;
      border-radius: 10px;
      border: none;
      font-size: 1.4rem;
      padding: 2rem;
      text-align: start;
      background-color: ${theme['gray-200']};
      color: ${theme['gray-900']};
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

    button.leftUpdate {
      display: flex;
      align-items: center;
      gap: 1rem;
      align-self: flex-end;
      cursor: pointer;

      padding: 1rem;
      border-radius: 10px;

      background-color: ${theme['red-500']};
      color: ${theme['gray-50']};
      border: none;
      margin-right: 2rem;

      &:hover {
        transition: background ease 0.7s;
        background-color: ${theme['red-400']};
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

export const StepperBox = styled(M.Box)``;

export const StepperComponent = styled(M.Stepper)``;

export const StepComponent = styled(M.Step)``;

export const StepLabelComponent = styled(M.StepLabel)`
  ${({ theme }) => css`
    svg {
      height: 4rem;
      width: 2.5rem;
    }

    text {
      font-size: 1.1rem;
    }

    .MuiStepLabel-label {
      color: ${theme['gray-50']} !important;
      font-size: 2rem;
      font-weight: bold;
    }
  `}
`;

export const StepContentComponent = styled(M.StepContent)`
  width: 1000px;
`;
export const FormButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 3.2rem;

  &.next {
    justify-content: flex-end;
  }

  button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
  }
`;
