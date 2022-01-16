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
import slugify from 'slugify';

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
  file?: string
  id?: number,
  name?: string,
  readableSize?: () => void,
  preview?: () => void,
  progress?: number,
  uploaded?: boolean,
  mainImage?: string,
  error?: boolean,
  url?: string
  idMainImage?: string;
}

export interface Vehicle {
  createdAt: Date;
  mainImage: MainImage;
  childImages: Files[];
  priceFormatted: number;
  description: string;
  title: string;
  isTruck: boolean;
}

export interface MainImage {
  file?: any,
  id?: string | number,
  name?: any,
  readableSize?: string,
  preview?: string,
  progress?: number,
  uploaded?: boolean,
  mainImage?: string,
  error?: boolean,
  url?: string | void,
  idMainImage?: string;
}

export interface Files {
  name?: string
  preview?: string,
  readableSize?: string,
  url?: string | void
}

export const getImage = async (mainImage: string) => {
  const listRef = ref(storage, `vehicles/${mainImage}`)
  const url = await getDownloadURL(listRef)
  return url
}

export default function RegisterVehiculo() {
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState<MainImage>({} as MainImage);
  const [carOrTruck, setCarOrTruck] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [filesIds, setFilesIds] = useState<Files[]>([]);

  function handleUpload(files) {
    const filesUploaded = files.map(async file => {
      const storageRef = ref(storage, `vehicles/${file.name}`);
      await uploadBytes(storageRef, files[0])
      const url = await getImage(file.name)

      setFilesIds([
        {
          name: slugify(file.name),
          preview: URL.createObjectURL(file),
          readableSize: filesize(file.size),
          url
        },
        ...filesIds
      ])

      const obj = {
        file,
        id: uniqueId(),
        name: slugify(file.name),
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url
      }

      return obj;
    })

    Promise.all(filesUploaded).then(res => {
      setUploadedFiles(uploadedFiles.concat(res));
    })
  }

  async function handleUploadMainImage(files) {
    const storageRef = ref(storage, `vehicles/${files.name}`);
    await uploadBytes(storageRef, files[0])
    const url = await getImage(files.name);

    const obj = {
      file: files[0],
      id: uniqueId(),
      name: slugify(files[0].name),
      readableSize: filesize(files[0].size),
      preview: URL.createObjectURL(files[0]),
      progress: 0,
      uploaded: false,
      error: false,
      idMainImage: `${files[0].name}`,
      url
    }

    setUploadedMainImage(obj)
  }

  function handleDeleteFileMain() {
    const fileName = uploadedMainImage.name;
    const desertRef = ref(storage, `vehicles/${fileName}`);
    deleteObject(desertRef).then(res => {
      console.log('Excluído')
    }).catch((err) => {
      console.log(err)
    })

    setUploadedMainImage({
      file: '',
      id: 0,
      name: '',
      readableSize: '',
      preview: '',
      progress: 0,
      uploaded: null,
      mainImage: '',
      error: null,
      url: '',
      idMainImage: ''
    });
  }

  function handleDeleteOtherFiles(id: number) {
    const fileName = uploadedFiles.filter(fileId => {
      if(fileId.id === id){
        return fileId
      }
    });

    const desertRef = ref(storage, `vehicles/${fileName[0].name}`);
    deleteObject(desertRef).then(res => {
      console.log('Excluído')
    }).catch((err) => {
      console.log(err)
    })

    const filesFiltered = uploadedFiles.filter(file => file.id !== id)
    setUploadedFiles(filesFiltered)
  }

  async function createVehicle(payload: Vehicle) {
    setLoading(true);
    const dbRef = collection(db, 'vehicles');

    const storageRef = ref(storage, `vehicles/${payload.mainImage.name}`);
    await uploadBytes(storageRef, payload.mainImage.name);
    const mainImage = await getImage(payload.mainImage.name);
    console.log(mainImage)
    
    payload.mainImage.url = mainImage;
    delete payload.mainImage.file;
    addDoc(dbRef, payload).then((res) => {
      toast.success('O veículo foi cadastrado com sucesso!');

      setUploadedFiles([]);
      setUploadedMainImage({});
      setCarOrTruck('');
      setVehicleName('');
      setDescription('');
      setPrice(0);
    }).catch(() => {
      toast.error('Ops... Algo de errado aconteceu.');
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
              <NumberInput value={price} step={0.2}>
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
            <UploadMainImage disabled={!!uploadedMainImage.name} onUpload={handleUploadMainImage} />

            {!!uploadedMainImage.name && (
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
              mainImage: uploadedMainImage,
            })

          }} type="button" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
        </Flex>
      </Flex>
    </>
  )
}