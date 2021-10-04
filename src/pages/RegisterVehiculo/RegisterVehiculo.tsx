import { Flex, Button, Stack, FormLabel, Input as InputFile } from '@chakra-ui/react';
import Input from '../../components/Input';
import styles from './style.module.scss';

export default function RegisterVehiculo() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      styles={styles.container}
    >
    <Flex
        as="form"
        w="100%"
        maxWidth="360"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        id="form"
      >
        <Stack spacing="4">
          <Input name="text" label="Nome do Veículo" />
          <Input name="text" label="Descrição do Veículo" />
          <FormLabel htmlFor="Foto do veículo">Foto do veículo</FormLabel>
          <input type="file" accept="image/*" />
          {/* <InputFile width="100" background="red" type="file" /> */}
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
      </Flex>
    </Flex>
  )
}