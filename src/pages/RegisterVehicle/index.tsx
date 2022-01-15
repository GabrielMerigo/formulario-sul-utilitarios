import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField, HStack, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react';
import Input from '../../../utils/Input';
import FileList from './components/FileList';
import Upload from './components/Upload';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import React, { useState } from 'react';
import UploadMainImage from './components/UploadMainImage';
import FileListMain from './components/FileListMain';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  db,
  addDoc,
  collection,
  storage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL
} from "../../services/firebaseConnection";

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

const getImage = async mainImage => {
  const listRef = ref(storage, `vehicles/${mainImage}`)
  const url = await getDownloadURL(listRef)
  return url
}

export default function RegisterVehiculo() {
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState<MainImage[]>([]);
  const [carOrTruck, setCarOrTruck] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [filesIds, setFilesIds] = useState<String[]>([]);

  function handleUpload(files) {
    const filesAlready = files.map(file => {
      const storageRef = ref(storage, `vehicles/${file.name}`);
      uploadBytes(storageRef, files[0]).then((snapshot) => {
        console.log(snapshot);
      });

      setFilesIds([
        `${file.name}`,
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
      const storageRef = ref(storage, `vehicles/${file.name}`);
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
        idMainImage: `${file.name}`,
        url: null
      }

      return obj;
    })
    setUploadedMainImage(uploadedMainImage.concat(filesAlready));
  }

  function handleDeleteFileMain() {
    const fileName = uploadedMainImage[0].name;
    const desertRef = ref(storage, `vehicles/${fileName}`);
    deleteObject(desertRef).then(res => {
      console.log('Excluído')
    }).catch((err) => {
      console.log(err)
    })

    setUploadedMainImage([]);
  }

  function handleDeleteOtherFiles(id: number) {
    const file = uploadedFiles.filter(file => file.id === id);
    const fileName = file[0].name;
    const desertRef = ref(storage, `vehicles/${fileName}`);
    deleteObject(desertRef).then(res => {
      console.log('Excluído')
    }).catch((err) => {
      console.log(err)
    })

    const filesFiltered = uploadedFiles.filter(file => file.id !== id)
    setUploadedFiles(filesFiltered)
  }

  async function createVehicle(payload: Vehicle, truckOrVehicle: string) {
    setLoading(true);
    const dbRef = collection(db, truckOrVehicle);
    const nameImages = payload.childImages.map(async (file: string) => await getImage(file));
    const mainImage = await getImage(payload.mainImage)

    Promise.all(nameImages).then(arrayUrls => {
      payload.childImages = arrayUrls;
      payload.mainImage = mainImage

      addDoc(dbRef, payload)
      toast.success('O veículo foi cadastrado com sucesso!');

      setUploadedFiles([])
      setUploadedMainImage([])
      setCarOrTruck('')
      setVehicleName('')
      setDescription('')
      setPrice(0)
    }).catch(() => {
      toast.error('Ops! Ocorreu algum problema para cadastrar o veículo...');
    }).finally(() => {
      setLoading(false);
    })

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
            <Select value={carOrTruck} onChange={(e: any) => {
              setCarOrTruck(e.target.value)
            }} bgColor="white" color="black">
              <option>Selecione</option>
              <option>Carro</option>
              <option>Caminhão</option>
            </Select>
          </FormControl>
          <ToastContainer />

          <HStack>
            <Input value={vehicleName} onInput={(e: any) => setVehicleName(e.target.value)} name="text" label="Nome do Veículo" />
            <FormControl mt={2}>
              <FormLabel style={{ margin: 0 }} htmlFor={'Preço do veículo'}>{'Preço do veículo'}</FormLabel>
              <NumberInput value={price} precision={2} step={0.2}>
                <NumberInputField onInput={(e: any) => setPrice(e.target.value)} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </HStack>

          <Input value={description} onInput={(e: any) => setDescription(e.target.value)} name="text" label="Descrição do Veículo" />

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
          <Button isLoading={loading} onClick={() => {
            createVehicle({
              childImages: filesIds,
              createdAt: new Date(),
              description,
              title: vehicleName,
              priceFormatted: price,
              isTruck: carOrTruck === 'Carro' ? false : true,
              mainImage: uploadedMainImage[0].idMainImage,
            }, 'vehicles')

          }} type="button" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
        </Flex>
      </Flex>
    </>
  )
}