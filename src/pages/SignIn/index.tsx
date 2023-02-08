import * as S from './styles';
import Link from 'next/link';

function SignIn() {
  return (
    <S.LoginContainer>
      <S.LoginFormContainer>
        <h2>SUL ULTILITÁRIOS</h2>
        <form>
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <Link href="/" type="submit">
            Entrar
          </Link>
        </form>
      </S.LoginFormContainer>
    </S.LoginContainer>
  );
}

export default SignIn;
