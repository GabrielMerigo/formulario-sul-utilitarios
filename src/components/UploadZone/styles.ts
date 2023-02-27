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

export const MainImageContainer = styled.ul`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;

    li {
      list-style: none;
    }
  `}
`;
export const DeleteImageButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
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
