import styled, { css } from 'styled-components';

export const LoginContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    h2 {
      margin-bottom: 2.4rem;
      font-size: 2.4rem;
      font-weight: 700;
      letter-spacing: 0.5rem;
    }
  `}
`;
export const LoginFormContainer = styled.div`
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
      width: 34rem;
      gap: 2rem;

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

      a[type='submit'] {
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
