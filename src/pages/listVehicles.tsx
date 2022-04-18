import { Flex, Button, Grid } from '@chakra-ui/react';
import { db, collection, getDocs } from "../services/firebaseConnection";
import { useState, useEffect } from 'react';
import { BoxItem } from './EditVehicle/components/BoxItem';
import { MainImage } from './RegisterVehicle';
import Link from 'next/link';

export interface VehiclesTypes {
  createdAt: string;
  mainImage: MainImage;
  childImages: FileList[];
  title: string;
  description: string;
  priceFormatted: number;
  isTruck: boolean;
  id: string;

}

export default function EditVehicle() {
  const [vehicles, setVehicles] = useState<VehiclesTypes[]>([]);
  async function getVehicles() {
    const vehiclesCol = collection(db, 'vehicles');
    const vehicleSnapshot = await getDocs(vehiclesCol);
    const vehicleList = vehicleSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<VehiclesTypes>;
    return vehicleList
  }

  useEffect(() => {
    getVehicles().then(res => {
      console.log(res)
      setVehicles(res)
    })
      .catch(err => {
        console.log('erro', err)
      })
  }, [])

  return (
    <>
        <>
          <Flex
            isLoading={true}
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
              maxWidth="1000"
              minWidth="800"
              minHeight="700"
              bg="gray.800"
              p="8"
              borderRadius={8}
              flexDir="column"
            >
              <Flex justifyContent="right" marginBottom="10px">
                <Link href={`RegisterVehicle`} as={`RegisterVehicle`} passHref>
                  <Button colorScheme="blue">
                    Cadastrar Veículo
                  </Button>
                </Link>
              </Flex>

              <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                {vehicles.map(({ mainImage, title, description, priceFormatted, id, createdAt, isTruck }) => (
                  <BoxItem
                    isTruck={isTruck}
                    createdAt={createdAt}
                    id={id}
                    mainImage={mainImage}
                    title={title}
                    key={id}
                    description={description}
                    priceFormatted={priceFormatted}
                  />
                 ))}
              </Grid>
            </Flex>
          </Flex>
        </>
    </>
  )
}