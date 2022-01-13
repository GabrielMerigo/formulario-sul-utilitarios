import { Flex, Button, Grid, GridItem } from '@chakra-ui/react';
import { db, collection, getDocs } from "../services/firebaseConnection";
import { useState, useCallback, useEffect } from 'react';

export interface VehiclesTypes {
  createdAt: string;
  mainImage: string;
  childImages: String[];
  title: string;
  description: string;
  priceFormatted: number;
  id: string;
}

export default function EditVehicle() {
  const [vehicles, setVehicles] = useState<VehiclesTypes[]>([]);

  async function getVehicles(){
    const vehiclesCol = collection(db, 'vehicles');
    const vehicleSnapshot = await getDocs(vehiclesCol);
    const vehicleList = vehicleSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<VehiclesTypes>;
    return vehicleList
  }

  useEffect(() => {
    getVehicles().then(res => {
      setVehicles(res)
    })
    .catch(err => {
      console.log('erro', err)
    })
  }, [])

  return (
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
        maxWidth="900"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
          <GridItem borderRadius={10} w='100%' h='250' bg='blue.500' />
          <GridItem borderRadius={10} w='100%' h='250' bg='blue.500' />
          <GridItem borderRadius={10} w='100%' h='250' bg='blue.500' />
        </Grid>
      </Flex>
    </Flex>
  )
}