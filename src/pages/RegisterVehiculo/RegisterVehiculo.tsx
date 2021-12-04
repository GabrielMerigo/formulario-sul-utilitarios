import { Flex, Button, FormControl, Textarea as TextareaInput, FormLabel } from '@chakra-ui/react';
import Input from '../../components/Input';
import FileList from './components/FileList';
import Upload from './components/Upload';


export default function RegisterVehiculo() {
  const state = {
    uploadedFiles: []
  }

  function handleUpload(files){
    console.log(files);
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
        
        <Upload onUpload={handleUpload}/>
        <FileList />

        <Button type="submit" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
      </Flex>
    </Flex>
  )
}