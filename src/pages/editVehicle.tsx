import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField, Text, HStack, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react';
import Input from '../../utils/Input';
import FileList from './registerVehicle/components/FileList';
import Upload from './registerVehicle/components/Upload';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { useState, useEffect, useMemo, useCallback } from 'react';
import UploadMainImage from './registerVehicle/components/UploadMainImage';
import FileListMain from './registerVehicle/components/FileListMain';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  db,
  storage,
  ref,
  uploadBytes,
  deleteObject,
  doc,
  getDoc
} from "../services/firebaseConnection";

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
  createdAt: string;
  mainImage: string;
  childImages: string[];
  priceFormatted: string;
  description: string;
  title: string;
  id: string;
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

export default function EditVehicle() {
  const router = useRouter();
  const id: string = useMemo(() => router.query.id as string, [router.query]);
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState<MainImage[]>([]);
  const [carOrTruck, setCarOrTruck] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [filesIds, setFilesIds] = useState<String[]>([]);

  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);

  const getVehicle = useCallback(async () => {
    if (id) {
      setLoading(true)
      const docRef = doc(db, 'vehicles', id);
      await getDoc(docRef)
        .then((docSnap) => {
          setVehicle({
            createdAt: docSnap.data().createdAt,
            mainImage: docSnap.data().mainImage,
            childImages: docSnap.data().childImages,
            priceFormatted: docSnap.data().priceFormatted,
            description: docSnap.data().description,
            title: docSnap.data().title,
            id
          });
        })
        .catch(err => console.log)
        .finally(() => setLoading(false))
    }
  }, [id])

  useEffect(() => {
    getVehicle();
  }, [getVehicle])

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
          <Text as="b" align="center" fontSize='4xl'>Edite o Veículo</Text>
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
          <Button isLoading={loading} type="button" mt="6" colorScheme="blue" size="lg">Editar Veículo</Button>
        </Flex>
      </Flex>
    </>
  )
}