import Link from 'next/link';
import styled, { css } from 'styled-components';

export const IndexContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: calc(100vw - 20rem);
    max-width: 800px;
    height: 100%;
    margin: 0 auto;

    h1 {
      font-size: 3rem;
      letter-spacing: 2px;
      margin: 2rem 0 2rem 0;
    }
  `}
`;
export const LinksContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 5rem;
    gap: 2rem;
    border-radius: 10px;
    border: 1px solid ${theme['gray-500']};
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
    height: 15rem;
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
