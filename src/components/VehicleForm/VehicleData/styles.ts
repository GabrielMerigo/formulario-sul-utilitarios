import styled, { css } from 'styled-components';
import * as R from '@radix-ui/react-radio-group';
import { mediaQuery } from '@/styles/ResponsiveStyle';

export const VehicleTypeLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

    margin: 2rem 0;

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

export const FieldInputsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 1rem 0;
  `}
`;

export const InputGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
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

    ${mediaQuery(
      'lg',
      'max'
    )(`

      label,
      legend {
        font-size: 1.1rem;
      }
    
      input {
        height: 4rem;
        font-size: 1rem;SSSSS

        &::placeholder {
          font-size: 1.2rem;
        }
      }

        textarea {
          height: 10rem;
          font-size: 1.2rem;
          padding: 2rem;
        }
    `)}

    ${mediaQuery(
      'sm',
      'max'
    )(`
    width:100%;
    
      input {
        width:100%;
      }

    `)}
  `}
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => css`
    font-size: 1.1rem;

    color: ${theme['red-500']};
    font-weight: bold;
  `}
`;
