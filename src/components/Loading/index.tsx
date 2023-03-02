import * as S from './styles';

export const Loading = () => {
  return (
    <S.LoadingContainer className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </S.LoadingContainer>
  );
};
