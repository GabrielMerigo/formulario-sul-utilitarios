import { Flex, Button, Stack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useState } from 'react';
import Input from '../../utils/Input';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, getAuth } from '../services/firebaseConnection';
import cookie from 'js-cookie';

export default function SignIn() {
  const toast = useToast();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const errors = {
    'auth/invalid-password': 'A senha está incorreta',
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/invalid-email': 'E-mail inválido',
    default: 'Senha ou E-mail incorreto.'
  }

  function signIn() {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        cookie.set('token-auth', user.accessToken, {
          expires: 1
        })

        if (user) {
          toast({
            title: `Login efetuado com sucesso!`,
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });
          router.push('/RegisterVehicle')
        }
      })
      .catch((error) => {
        toast({
          title: `${errors[error.code ? error.code : 'default']}`,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      })
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input onChange={e => setEmail(e.target.value)} name="email" label="E-mail" />
          <Input onChange={e => setPassword(e.target.value)} name="password" label="Senha" />
        </Stack>

        <Button onClick={() => {
          signIn()
        }} mt="6" colorScheme="blue" size="lg">Entrar</Button>
      </Flex>
    </Flex>
  );

}