import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField, Text, HStack, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react';
import Input from '../../utils/Input';
import FileList from './RegisterVehicle/components/FileList';
import Upload from './RegisterVehicle/components/Upload';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { useState, useEffect, useMemo, useCallback } from 'react';
import UploadMainImage from './RegisterVehicle/components/UploadMainImage';
import FileListMain from './RegisterVehicle/components/FileListMain';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.min.css';
import slugify from 'slugify';
import InputMask from "react-input-mask";
import cookie from 'js-cookie';

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
import { Files, getImage, MainImage } from './RegisterVehicle';
import Link from 'next/link';
import SignIn from './SignIn';

export type FileProps  = {
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

export default function EditVehicle() {
  const router = useRouter();
  const idUrl: string = useMemo(() => router.query.id as string, [router.query]);
  const [uploadedFiles, setUploadedFiles] = useState([] as any);
  const [uploadedMainImage, setUploadedMainImage] = useState<MainImage>({} as MainImage);
  const [carOrTruck, setCarOrTruck] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [price, setPrice] = useState(0);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [anoModelo, setAnoModelo] = useState('');
  const [carroceria, setCarroceria] = useState('');
  const [tracao, setTracao] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [filesIds, setFilesIds] = useState<Files[]>([]);

  const getVehicle = useCallback(async () => {
    if (idUrl) {
      const docRef = doc(db, 'vehicles', idUrl);
      await getDoc(docRef)
        .then((docSnap) => {
          const isTruck = docSnap.data().isTruck === true

          setUploadedMainImage(docSnap.data().mainImage);
          setUploadedFiles(docSnap.data().childImages)
          setPrice(docSnap.data().priceFormatted)
          setDescription(docSnap.data().description)
          setVehicleName(docSnap.data().title)
          setCarOrTruck(isTruck ? 'Caminhão' : 'Carro')
          setAnoModelo(docSnap.data().anoModelo)
          setMarca(docSnap.data().marca)
          setModelo(docSnap.data().modelo)
          setTracao(docSnap.data().tracao)
          setCarroceria(docSnap.data().carroceria)
          setAnoFabricacao(docSnap.data().anoFabricacao)
        })
        .catch(err => console.log)
        .finally(() => setLoading(false))
    }
  }, [idUrl])

  useEffect(() => {
    getVehicle();
  }, [getVehicle])

  function handleUpload(files) {
    const filesUploaded = files.map(async file => {
      const timeStamp = new Date().getTime();
      const nameFile = slugify(file.name) + timeStamp
      const storageRef = ref(storage, `vehicles/${nameFile}`);
      await uploadBytes(storageRef, files[0]);
      const url = await getImage(nameFile);

      setFilesIds([
        {
          name: nameFile,
          preview: URL.createObjectURL(file),
          readableSize: filesize(file.size),
          id: file.id,
          url
        },
        ...filesIds
      ])

      const obj = {
        file,
        id: uniqueId(),
        name: nameFile,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url
      }

      return obj;
    })

    Promise.all(filesUploaded).then((res) => {
      setUploadedFiles(uploadedFiles.concat(res));
      const vehicleRef = doc(db, 'vehicles', idUrl);
      res.forEach((item: FileProps) => delete item.file);

      updateDoc(vehicleRef, {
        childImages: res
      });

    })
  }

  async function handleUploadMainImage(files) {
    const vehicleRef = doc(db, 'vehicles', idUrl);
    const storageRef = ref(storage, `vehicles/${files[0].name}`);
    await uploadBytes(storageRef, files[0])
    const url = await getImage(files[0].name);

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
      url
    }

    setUploadedMainImage(obj)
    delete obj.file
    updateDoc(vehicleRef, {
      mainImage: obj
    });
  }

  function handleDeleteFileMain() {
    const fileName = uploadedMainImage.name;
    const desertRef = ref(storage, `vehicles/${fileName}`);

    deleteObject(desertRef).then(res => {
      console.log('Excluído')
    }).catch((err) => {
      console.log(err)
    })

    setUploadedMainImage({});

    const vehicleRef = doc(db, 'vehicles', idUrl);
    updateDoc(vehicleRef, {
      mainImage: {}
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

    const filesFiltered: FileProps[] = uploadedFiles.filter((file: FileProps) => file.id !== id)
    setUploadedFiles(filesFiltered)

    try{
      filesFiltered.forEach(item => delete item.file)

      const vehicleRef = doc(db, 'vehicles', idUrl);
      updateDoc(vehicleRef, {
        childImages: filesFiltered
      });
    }catch(err){
      console.log('ops... algo deu de errado!')
    }
  }

  async function updateVehicle(payload) {
    const vehicleRef = doc(db, 'vehicles', idUrl);

    delete payload.mainImage.file
    updateDoc(vehicleRef, payload).then(res => {
      toast.success('O veículo foi editado com sucesso!');
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
   {!cookie.get('token-auth') ? (
     <SignIn />
   ) : (
    <>
      <Flex justifyContent="right" margin="20px">
        <Link href={`RegisterVehicle`} as={`RegisterVehicle`} passHref>
          <Button marginRight="10px" type="button" color="blue.500" background="white">
            Cadastrar Veículo
          </Button>
        </Link>
        <Link href={`listVehicles`} as={`listVehicles`} passHref>
          <Button type="button" colorScheme="blue" >
            Listar de Veículos
          </Button>
        </Link>
      </Flex>
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

          <HStack marginTop={2}>
            <Input value={marca} onInput={(e: any) => setMarca(e.target.value)} name="text" label="Marca" />
            <Input value={modelo} onInput={(e: any) => setModelo(e.target.value)} name="text" label="Modelo" />
            <Input as={InputMask} mask="**/**/****" value={anoFabricacao} onInput={(e: any) => setAnoFabricacao(e.target.value)} name="text" label="Ano Fabricação" />
          </HStack>

          <HStack marginTop={2}>
            <Input as={InputMask} mask="**/**/****" value={anoModelo} onInput={(e: any) => setAnoModelo(e.target.value)} name="text" label="Ano Modelo" />
            <Input value={tracao} onInput={(e: any) => setTracao(e.target.value)} name="text" label="Tração" />
            <Input value={carroceria} onInput={(e: any) => setCarroceria(e.target.value)} name="text" label="Carroceria" />
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
            const obj = {
              childImages: uploadedFiles,
              createdAt: new Date(),
              description,
              title: vehicleName,
              priceFormatted: price,
              isTruck: carOrTruck === 'Carro' ? false : true,
              mainImage: uploadedMainImage,
            }

            updateVehicle(obj)

          }} isLoading={loading} type="button" mt="6" colorScheme="blue" size="lg">Editar Veículo</Button>
        </Flex>
      </Flex>
    </>
   )}
   </>
  )
}