import { Flex, Button, FormControl, FormLabel, Select, NumberInput, NumberInputField, HStack, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react';
import Input from '../../components/Input';
import FileList from '../registerVehicle/components/FileList';
import Upload from '../registerVehicle/components/Upload';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import React, { useState } from 'react';
import UploadMainImage from '../registerVehicle/components/UploadMainImage';
import FileListMain from '../registerVehicle/components/FileListMain';
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

export default function RegisterVehiculo() {


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
        <h1>Teste 2</h1>
      </Flex>
    </>
  )
}