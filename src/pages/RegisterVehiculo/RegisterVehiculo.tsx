import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField } from '@chakra-ui/react';
import Input from '../../components/Input';
import FileList from './components/FileList';
import Upload from './components/Upload';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import React, { useState } from 'react';
import Textarea from '../../components/Textarea';
import UploadMainImage from './components/UploadMainImage';

export interface FileProps {
  file: string
  id: number,
  name: string,
  readableSize: () => void,
  preview: () => void,
  progress: number,
  uploaded: boolean,
  error: boolean,
  url: string
}

export default function RegisterVehiculo() {
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState([] as any);

  function handleUpload(files) {
    const filesAlready = files.map(file => {
      const obj = {
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null
      }

      return obj;
    })
    setUploadedFiles(uploadedFiles.concat(filesAlready));

    uploadedFiles.forEach(processUpload)
  }

  function handleUploadMainImage(files) {
    const filesAlready = files.map(file => {
      const obj = {
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null
      }

      return obj;
    })
    setUploadedMainImage(uploadedMainImage.concat(filesAlready));

    uploadedMainImage.forEach(processUpload)
  }

  function processUpload(uploadedFile) {
    
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
        maxWidth="700"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <FormControl id='carOrTruck'>
          <FormLabel>Carro ou Caminhão?</FormLabel>
          <Select bgColor="white" color="black">
            <option>Selecione</option>
            <option>Carro</option>
            <option>Caminhão</option>
          </Select>
        </FormControl>

        <Input name="text" label="Nome do Veículo" />
        <Textarea name="text" label="Descrição do Veículo" />

        <FormControl mt={2}>
          <FormLabel style={{ margin: 0 }} htmlFor={'Preço do veículo'}>{'Preço do veículo'}</FormLabel>
          <NumberInput>
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormLabel style={{ marginTop: 10 }} htmlFor={'Fotos adicionais'}>{'Fotos adicionais'}</FormLabel>
        <Upload onUpload={handleUpload} />

        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} />
        )}

        <FormLabel style={{ marginTop: 10 }} htmlFor={'Foto Principal'}>{'Foto Principal'}</FormLabel>
        <UploadMainImage disabled={!!uploadedMainImage.length} onUpload={handleUploadMainImage} />

        {!!uploadedMainImage.length && (
          <FileList files={uploadedMainImage} />
        )}

        <Button type="submit" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
      </Flex>
    </Flex>
  )
}