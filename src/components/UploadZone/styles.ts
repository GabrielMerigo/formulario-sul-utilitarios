import styled, { css } from 'styled-components';

type getColorsProps = {
  isDragAccept: boolean;
  isDragReject: boolean;
};

const getColor = (props: getColorsProps) => {
  if (props.isDragAccept) {
    return '#00875F';
  }
  if (props.isDragReject) {
    return '#AA2834';
  }
  return '#7C7C8A';
};

export const ZoneContainer = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
    background-color: ${(props: getColorsProps) => getColor(props)};
    color: ${theme['gray-700']};
    outline: none;
    transition: border 0.24s ease-in-out;

    strong {
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 2rem;

  h3 {
    width: 100%;
    margin-bottom: 2rem;
    line-height: 4rem;
    border-bottom: 1px solid white;
    border-radius: 10px;
    align-self: flex-start;
    font-size: 2rem;
  }

  h4 {
    width: 100%;
    margin-top: 2rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const ImageContainer = styled.ul`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;

    background-color: ${theme['gray-600']};

    border-radius: 10px;
    margin-bottom: 2rem;

    li {
      list-style: none;
    }
  `}
`;

export const TitleContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding: 1.5rem 2rem;
    width: 100%;
    border-radius: 10px;
    border-bottom: 1px solid ${theme['gray-50']};

    h4 {
      width: initial;
      justify-self: flex-start;
      padding-bottom: 10px;
      margin: 0;
      padding: 0;
    }
  `}
`;

export const ThumbContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1rem 0;
    padding: 1rem;

    width: 100%;

    h4 {
      margin: 0;
    }

    img {
      border-radius: 10px;
    }

    .lds-ring {
      margin: 0 auto;
    }
  `}
`;

export const DeleteImageButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    cursor: pointer;

    height: 4rem;
    width: 4rem;
    border: none;
    border-radius: 50%;
    padding: 4px;

    background-color: ${theme['red-500']};
    color: ${theme['gray-50']};

    svg {
      height: 32px;
    }

    &:hover {
      transition: all ease 0.3s;
      background-color: ${theme['red-400']};
    }
  `}
`;
