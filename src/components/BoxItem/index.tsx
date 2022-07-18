import { Box, Badge, Image, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { deleteDoc, doc, db, getDoc, ref, storage, deleteObject } from '../../services/firebaseConnection';
import { Files, MainImage } from '../../pages/RegisterVehicle';

export interface BoxItemProps {
  createdAt: string;
  mainImage: MainImage;
  title: string;
  description: string;
  priceFormatted: number;
  id: number | string
  isTruck: boolean;
}

export function BoxItem({ mainImage, title, description, priceFormatted, id: idDb }: BoxItemProps) {
  const router = useRouter();
  const formattedPrice: any = isNaN(priceFormatted)
    ? priceFormatted
    : Number(priceFormatted).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  async function deleteVehicle(id) {
    const vehicleRef = doc(db, 'vehicles', id);
    const docSnap = await getDoc(vehicleRef);

    docSnap.data().childImages.map((file: Files) => {
      const desertRef = ref(storage, `vehicles/${file.name}`);
      deleteObject(desertRef)
    });

    const refMainImage = ref(storage, `vehicles/${docSnap.data().mainImage.name}`);
    deleteObject(refMainImage)

    await deleteDoc(vehicleRef)
    router.push('/RegisterVehicle')
  }

  return (
    <Box borderColor="white" shadow={'lg'} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image height="15rem" width="30rem" src={mainImage.url} alt={description} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            fontWeight="semibold"
            as="h4"
            letterSpacing="wide"
            textTransform="uppercase"
            ml="2"
            style={{ fontSize: '1rem', margin: 0 }}
          >
            {title}
          </Box>
        </Box>

        <Box style={{ marginTop: '3px' }}>
          R$ {formattedPrice}
        </Box>

        <Box
          color="gray.500"
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {description}
        </Box>
        <Link href={`editVehicle?id=${idDb}`} as={`editVehicle?id=${idDb}`} passHref>
          <Button margin={'10px auto'} background={'blue.500'}> Editar </Button>
        </Link>
        <Button onClick={() => deleteVehicle(idDb)} margin={'10px'} background={'red.500'}> Excluir </Button>

      </Box>
    </Box>
  )

}