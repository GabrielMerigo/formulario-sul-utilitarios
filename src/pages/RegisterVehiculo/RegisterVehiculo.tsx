import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField, HStack } from '@chakra-ui/react';
import Input from '../../components/Input';
import FileList from './components/FileList';
import Upload from './components/Upload';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import React, { useState } from 'react';
import UploadMainImage from './components/UploadMainImage';
import FileListMain from './components/FileListMain';

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
  }

  function handleDeleteFileMain() {
    setUploadedMainImage([])
  }

  function handleDeleteOtherFiles(id: number) {
    const filesFiltered = uploadedFiles.filter(file => file.id !== id)
    setUploadedFiles(filesFiltered)
  }

  return (
    <>
      <Flex
        w="100vw"
        h="100%"
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

          <HStack>
            <Input name="text" label="Nome do Veículo" />
            <FormControl mt={2}>
              <FormLabel style={{ margin: 0 }} htmlFor={'Preço do veículo'}>{'Preço do veículo'}</FormLabel>
              <NumberInput>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </HStack>
          <Input name="text" label="Descrição do Veículo" />

          <FormLabel style={{ marginTop: 10 }} htmlFor={'Foto Principal:'}>{'Foto Principal:'}</FormLabel>
          <HStack>
            <UploadMainImage disabled={!!uploadedMainImage.length} onUpload={handleUploadMainImage} />

            {!!uploadedMainImage.length && (
              <FileListMain handleDelete={handleDeleteFileMain} files={uploadedMainImage} />
            )}
          </HStack>

          <FormLabel style={{ marginTop: 10 }} htmlFor={'Fotos Adicionais:'}>{'Fotos Adicionais:'}</FormLabel>
          <Upload onUpload={handleUpload} />

          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} handleDeleteOtherFiles={handleDeleteOtherFiles} />
          )}
          <Button type="submit" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
        </Flex>
      </Flex>

    </>
  )
}