import { mediaQuery } from '@/styles/ResponsiveStyle';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const ListVehicleContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 5rem auto 0 auto;
    width: calc(100vw - 20rem);
    background-color: ${theme['gray-800']};
    border-radius: 10px;
    gap: 2rem;
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

export const VehiclesContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    gap: 1rem;

    border-radius: 10px;
    border: 1px solid ${theme['gray-500']};
    background-color: ${theme['gray-700']};

    h3 {
      font-size: 2.4rem;
      font-weight: bolder;
      margin-bottom: 1rem;
    }

    button.delete {
      position: absolute;
      z-index: 1;
      top: -10px;
      right: -10px;
      align-self: flex-end;
      cursor: pointer;
      color: ${theme['gray-50']};
      border: none;
      background-color: ${theme['red-500']};
      border-radius: 50%;
      padding: 0.5rem;

      &:hover {
        transition: background ease 0.7s;
        color: ${theme['red-400']};
      }
    }

    img {
      width: 250px;
      height: 250px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    ${mediaQuery(
      'lg',
      'max'
    )(`
    img {
      width: 150px;
      height: 150px;
    }
    `)}
  `}
`;

export const MainImageContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const CardDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const VehicleInfosGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 1rem;

    span {
      font-size: 1.7rem;
    }

    strong {
      font-size: 1.7rem;
    }
  `}
`;

export const VehicleDetailsButton = styled.button`
  ${({ theme }) => css`
    cursor: pointer;
    font-weight: bold;

    font-size: 1.5rem;
    margin-top: 1rem;
    padding: 2rem 1rem;

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    color: ${theme['gray-50']};
    background-color: ${theme['blue-500']};
    border: none;

    &:hover {
      transition: background-color ease 0.3s;
      background-color: ${theme['blue-400']};
    }
  `}
`;
