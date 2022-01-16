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
  getDoc,
  updateDoc
} from "../services/firebaseConnection";
import { Files, getImage, MainImage } from './registerVehicle';

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

export default function EditVehicle() {
  const router = useRouter();
  const id: string = useMemo(() => router.query.id as string, [router.query]);
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState<MainImage>({} as MainImage);
  const [carOrTruck, setCarOrTruck] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [filesIds, setFilesIds] = useState<Files[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);

  const getVehicle = useCallback(async () => {
    if (id) {
      const docRef = doc(db, 'vehicles', id);
      await getDoc(docRef)
        .then((docSnap) => {
          const isTruck = docSnap.data().isTruck === true 
          setUploadedMainImage(docSnap.data().mainImage);
          setUploadedFiles(docSnap.data().childImages)
          setPrice(docSnap.data().priceFormatted)
          setDescription(docSnap.data().description)
          setVehicleName(docSnap.data().title)
          setCarOrTruck(isTruck ? 'Caminhão' : 'Carro')
        })
        .catch(err => console.log)
        .finally(() => setLoading(false))
    }
  }, [id])

  useEffect(() => {
    getVehicle();
  }, [getVehicle])

  function handleUpload(files) {
    const filesUploaded = files.map(async file => {
      const storageRef = ref(storage, `vehicles/${file.name}`);
      await uploadBytes(storageRef, files[0])
      const url = await getImage(file.name)

      setFilesIds([
        {
          name: file.name,
          preview: URL.createObjectURL(file),
          readableSize: filesize(file.size),
          url
        },
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
        url
      }

      return obj;
    })

    Promise.all(filesUploaded).then(res => {
      setUploadedFiles(uploadedFiles.concat(res));
    })
  }

  async function handleUploadMainImage(files) {
    const storageRef = ref(storage, `vehicles/${files[0].name}`);
    await uploadBytes(storageRef, files[0])
    const mainImage = await getImage(files[0].name);

    const obj = {
      file: files[0],
      id: uniqueId(),
      name: files[0].name,
      readableSize: filesize(files[0].size),
      preview: URL.createObjectURL(files[0]),
      progress: 0,
      uploaded: false,
      error: false,
      idMainImage: `${files[0].name}`,
      url: mainImage
    }

    setUploadedMainImage(obj)
  }

  function handleDeleteFileMain() {
    const fileName = uploadedMainImage.name;
    console.log(fileName);
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

  function updateVehicle(payload){
    const vehicleRef = doc(db, 'vehicles', id);

    payload.childImages.forEach(item => {
      delete item.file
    })
    delete payload.mainImage.file
    updateDoc(vehicleRef, payload).then(res => {
      console.log(res)
      toast.success('O veículo foi editado com sucesso!');
    }).catch(err => {
      console.log(err)
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
            <UploadMainImage disabled={!!!!uploadedMainImage.name} onUpload={handleUploadMainImage} />

            {!!uploadedMainImage.name && (
              <FileListMain handleDelete={handleDeleteFileMain} files={uploadedMainImage} />
            )}
          </HStack>

          <FormLabel style={{ marginTop: 10 }} htmlFor={'Fotos Adicionais:'}>{'Fotos Adicionais:'}</FormLabel>
          <Upload onUpload={handleUpload} />

          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} handleDeleteOtherFiles={handleDeleteOtherFiles} />
          )}
          <Button onClick={() => {
            updateVehicle({
              childImages: uploadedFiles,
              createdAt: new Date(),
              description,
              title: vehicleName,
              priceFormatted: price,
              isTruck: carOrTruck === 'Carro' ? false : true,
              mainImage: uploadedMainImage,
            })
          }} isLoading={loading} type="button" mt="6" colorScheme="blue" size="lg">Editar Veículo</Button>
        </Flex>
      </Flex>
    </>
  )
}