import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField, HStack, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react';
import Input from '../../components/Input';
import FileList from './components/FileList';
import Upload from './components/Upload';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import React, { useState } from 'react';
import UploadMainImage from './components/UploadMainImage';
import FileListMain from './components/FileListMain';
import { db, addDoc, collection, storage, ref, uploadBytes } from "../../services/firebaseConnection";

export interface FileProps {
  file: string
  id: number,
  name: string,
  readableSize: () => void,
  preview: () => void,
  progress: number,
  uploaded: boolean,
  mainImage: string,
  error: boolean,
  url: string
}

interface Vehicle {
  createdAt: Date;
  mainImage: string;
  childImages: String[];
  priceFormatted: number;
  description: string;
  title: string;
  isTruck: boolean;
}

interface MainImage {
  file: string
  id: number,
  name: string,
  readableSize: () => void,
  preview: () => void,
  progress: number,
  uploaded: boolean,
  mainImage: string,
  error: boolean,
  url: string
  idMainImage: string;
}

export default function RegisterVehiculo() {
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState<MainImage[]>([]);
  const [carOrTruck, setCarOrTruck] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const [filesIds, setFilesIds] = useState<String[]>([]);

  function handleUpload(files) {

    const filesAlready = files.map(file => {
      const storageRef = ref(storage, `vehicles/${file.name}-${uniqueId()}`);
      uploadBytes(storageRef, files[0]).then((snapshot) => {
        console.log(snapshot);
      });

      setFilesIds([
        `${file.name}-${uniqueId()}`,
        ...filesIds
      ])

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
      const storageRef = ref(storage, `vehicles/${file.name}-${uniqueId()}`);
      uploadBytes(storageRef, files[0]).then((snapshot) => {
        console.log(snapshot);
      });
  
      const obj = {
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        idMainImage:`${file.name}-${uniqueId()}`,
        url: null
      }

      return obj;
    })
    setUploadedMainImage(uploadedMainImage.concat(filesAlready));
  }

  function handleDeleteFileMain() {
    setUploadedMainImage([]);
  }

  function handleDeleteOtherFiles(id: number) {
    const filesFiltered = uploadedFiles.filter(file => file.id !== id)
    setUploadedFiles(filesFiltered)
  }

  async function createVehicle(payload: Vehicle, truckOrVehicle) {
    const dbRef = collection(db, truckOrVehicle);
    console.log(payload)
    await addDoc(dbRef, payload)
  }

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        align="center"
        justify="center"
        marginTop={5}
        marginBottom={5}
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
            <Select onChange={(e: any) => {
              setCarOrTruck(e.target.value)
            }} bgColor="white" color="black">
              <option>Selecione</option>
              <option>Carro</option>
              <option>Caminhão</option>
            </Select>
          </FormControl>

          <HStack>
            <Input onInput={(e: any) => setVehicleName(e.target.value)} name="text" label="Nome do Veículo" />
            <FormControl mt={2}>
              <FormLabel style={{ margin: 0 }} htmlFor={'Preço do veículo'}>{'Preço do veículo'}</FormLabel>
              <NumberInput defaultValue={0} precision={2} step={0.2}>
                <NumberInputField onInput={(e: any) => setPrice(e.target.value)} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </HStack>
          <Input onInput={(e: any) => setDescription(e.target.value)} name="text" label="Descrição do Veículo" />

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
          <Button onClick={() => {
            createVehicle({
              childImages: filesIds,
              createdAt: new Date(),
              description,
              title: vehicleName,
              priceFormatted: price,
              isTruck: carOrTruck === 'Carro' ? false : true,
              mainImage: uploadedMainImage[0].idMainImage,
            }, carOrTruck === 'Carro' ? 'vehicles' : 'truck')

          }} type="button" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
        </Flex>
      </Flex>
    </>
  )
}