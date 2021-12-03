import { Flex, Button, FormControl,  Textarea as TextareaInput, FormLabel, Input as InputFile } from '@chakra-ui/react';
import Input from '../../components/Input';

export default function RegisterVehiculo() {
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
        maxWidth="600"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Input name="text" label="Nome do Veículo" />

        <FormControl> 
          {'Descrição do Veículo' && <FormLabel htmlFor={'Descrição do Veículo'}>Descrição do Veículo</FormLabel>}
          <TextareaInput
            name={'descriptionVehicle'}
            type="text"
            id="descriptionVehicle"
            focusBorderColor="blue.200"
            bgColor="gray.900"
            variant="filled"
            _hover={{
              bgColor: 'gray.900'
            }}
            size="lg"
          />
        </FormControl>
        <FormLabel htmlFor="Foto do veículo">Foto do veículo</FormLabel>
        <InputFile type="file" accept="image/*" />

        <Button type="submit" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
      </Flex>
    </Flex>
  )
}