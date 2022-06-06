import styled from "styled-components";

export const CarList = styled.div`
  max-width: 900px;
  margin:0 auto;

  & > .boxCars{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
  }

  @media(max-width: 900px) {
    & > .boxCars{
      grid-template-columns: 1fr;
    }

    & > .boxCars > div {
      width: 95%;
      margin: 0 auto;
    }
    
    img{
      width: 100%;
    }
  }
`

export const WrapperBtn = styled.div`
  @media(max-width: 900px) {
    margin-right: 12rem;
  }
`;