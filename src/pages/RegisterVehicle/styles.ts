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

export const LinksContainer = styled.div`
  ${({ theme }) => css`
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    top: 0;
    right: 0;

    gap: 2rem;
    margin: 2rem 2rem 0 0;
  `}
`;

export const LinkItem = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    padding: 2rem;
    font-size: 2rem;
    height: 7rem;
    border-radius: 10px;

    color: ${theme['gray-50']};
    background-color: ${theme['gray-500']};

    &:hover {
      transition: background-color ease 0.3s;
      background-color: ${theme['gray-200']};
      color: ${theme['gray-900']};
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

    background-color: ${theme['gray-700']};
    border-radius: 10px;

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
