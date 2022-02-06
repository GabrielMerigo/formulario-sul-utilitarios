import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField, Text, HStack, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react';
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
import Link from 'next/link';
import cookie from 'js-cookie';
import slugify from 'slugify';

import {
  db,
  addDoc,
  collection,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from "../../services/firebaseConnection";

import SignIn from '../SignIn';

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
  url?: string,
  idMainImage?: string;
}

export interface Files {
  name?: string
  preview?: string,
  readableSize?: string,
  url?: string | void
  id?: string,
  file?: any
}

export const getImage = async (mainImage: string) => {
  const listRef = ref(storage, `vehicles/${mainImage}`)
  const url = await getDownloadURL(listRef)
  return url
}

export default function RegisterVehiculo() {
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState<MainImage>({} as MainImage);
  //Fiels
  const [carOrTruck, setCarOrTruck] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [anoModelo, setAnoModelo] = useState('');
  const [carroceria, setCarroceria] = useState('');
  const [tracao, setTracao] = useState('');
  const [loading, setLoading] = useState(false);
  const [filesIds, setFilesIds] = useState<Files[]>([]);

  function handleUpload(files) {
    const filesUploaded = files.map(async file => {
      const id = uniqueId()
      const timeStamp = new Date().getTime();

      setFilesIds([
        {
          name: slugify(file.name) + timeStamp,
          preview: URL.createObjectURL(file),
          readableSize: filesize(file.size),
          id,
          file
        },
        ...filesIds
      ])

      const obj = {
        file,
        id,
        name: slugify(file.name) + timeStamp,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
      }

      return obj;
    })

    Promise.all(filesUploaded).then(res => {
      setUploadedFiles(uploadedFiles.concat(res));
    })
  }

  async function handleUploadMainImage(files) {
    const timeStamp = new Date().getTime();
    const obj = {
      file: files[0],
      id: uniqueId(),
      name: slugify(files[0].name) + timeStamp,
      readableSize: filesize(files[0].size),
      preview: URL.createObjectURL(files[0]),
      progress: 0,
      uploaded: false,
      error: false,
      idMainImage: `${files[0].name}`,
    }

    setUploadedMainImage(obj)
  }

  function handleDeleteFileMain() {
    setUploadedMainImage({});
  }

  function handleDeleteOtherFiles(id: number) {
    const filesFiltered = uploadedFiles.filter(file => file.id !== id)
    setUploadedFiles(filesFiltered)
  }

  return (
    <>
      {!cookie.get('token-auth') ? (
        <SignIn />
      ) : (
        <>
          <Link href={`listVehicles`} as={`listVehicles`} passHref>
            <Button marginLeft={1150} marginTop={5}  type="button" colorScheme="blue" >
              Listar de Veículos
            </Button>
          </Link>

          <Flex justify="center">
            <Flex
              w="100%"
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
                <ToastContainer />
                <FormControl id='carOrTruck'>
                  <FormLabel>Veículo ou Caminhão?</FormLabel>
                  <Select value={carOrTruck} onChange={(e: any) => {
                    setCarOrTruck(e.target.value)
                  }} bgColor="white" color="black">
                    <option>Selecione</option>
                    <option>Veículo</option>
                    <option>Caminhão</option>
                  </Select>
                </FormControl>

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

                <HStack marginTop={2}>
                  <Input value={marca} onInput={(e: any) => setMarca(e.target.value)} name="text" label="Marca" />
                  <Input value={modelo} onInput={(e: any) => setModelo(e.target.value)} name="text" label="Modelo" />
                  <Input value={anoFabricacao} onInput={(e: any) => setAnoFabricacao(e.target.value)} name="text" label="Ano Fabricação" />
                </HStack>

                <HStack marginTop={2}>
                  <Input value={anoModelo} onInput={(e: any) => setAnoModelo(e.target.value)} name="text" label="Ano Modelo" />
                  <Input value={tracao} onInput={(e: any) => setTracao(e.target.value)} name="text" label="Tração" />
                  <Input value={carroceria} onInput={(e: any) => setCarroceria(e.target.value)} name="text" label="Carroceria" />
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
                <Button isLoading={loading} onClick={async () => {
                  setLoading(true)
                  const dbRef = collection(db, 'vehicles');
                  let nameImages = [];

                  const storageRef = ref(storage, `vehicles/${uploadedMainImage.name}`);
                  await uploadBytes(storageRef, uploadedMainImage.file);
                  const mainImageUrl = await getImage(uploadedMainImage.name);
                  uploadedMainImage.url = mainImageUrl;

                  delete uploadedMainImage.file;


                  for (let child of filesIds) {
                    const vehicleRef = ref(storage, `vehicles/${child.name}`);
                    await uploadBytes(vehicleRef, child.file);
                    const url = await getImage(child.name);
                    child.url = url
                    nameImages.push(child)
                  }

                  const obj = {
                    childImages: nameImages,
                    createdAt: new Date(),
                    description,
                    title: vehicleName,
                    marca,
                    modelo,
                    anoFabricacao,
                    priceFormatted: price,
                    anoModelo,
                    carroceria,
                    tracao,
                    isTruck: carOrTruck === 'Veículo' ? false : true,
                    mainImage: uploadedMainImage,
                  }

                  obj.childImages.map(item => delete item.file);
                  await addDoc(dbRef, obj).then((res) => {
                    toast.success('O veículo foi cadastrado com sucesso!');
                    nameImages = []
                    setUploadedFiles([]);
                    setUploadedMainImage({});
                    setFilesIds([])
                    setCarOrTruck('');
                    setVehicleName('');
                    setDescription('');
                    setMarca('');
                    setModelo('')
                    setAnoFabricacao('');
                    setAnoModelo('')
                    setTracao('')
                    setCarroceria('')
                    setPrice(0);
                  }).catch(() => {
                    toast.error('Ops... Algo de errado aconteceu.');
                  }).finally(() => {
                    setLoading(false);
                  })

                }} type="button" mt="6" colorScheme="blue" size="lg">Cadastar Veículo</Button>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </>
  )
}