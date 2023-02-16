import styled, { css } from 'styled-components';
import Link from 'next/link';

export const RegisterVehicleContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 0 0 0;
    h2 {
      margin-bottom: 2.4rem;
      font-size: 2.4rem;
      font-weight: 700;
      letter-spacing: 0.5rem;
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

    form {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      button[type='submit'] {
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

        background-color: ${theme['green-500']};
        color: ${theme['white']};

        &:hover {
          background-color: ${theme['green-400']};
          transition: background-color 0.2s;
        }
      }
    }
  `}
`;

export const ListVehiclesButton = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;

    height: 5.6rem;
    width: 20rem;
    margin-bottom: 2.4rem;
    border-radius: 10px;

    border: none;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;

    background-color: ${theme['green-500']};
    color: ${theme['white']};

    &:hover {
      background-color: ${theme['green-400']};
      transition: background-color 0.2s;
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
      height: 5.6rem;
      border-radius: 10px;
      border: none;
      font-size: 1.4rem;
      padding: 0 0 0 5.2rem;
      text-align: start;
      background-color: ${theme['gray-200']};
      color: ${theme['gray-500']};

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
      padding: 0 0 0 5.2rem;
      text-align: start;
      background-color: ${theme['gray-200']};
      color: ${theme['gray-500']};
    }
  `}
`;

export const RadioGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    text-align: center;
    align-self: flex-start;
    gap: 2rem;

    input {
      height: initial;
      padding: 2rem;
      box-shadow: none;
    }
  `}
`;

export const FieldInputsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
  `}
`;
