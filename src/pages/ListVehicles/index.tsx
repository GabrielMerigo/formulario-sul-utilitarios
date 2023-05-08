import * as S from '../../styles/pages/ListVehicles'
import * as P from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { VehiclesContext } from '@/contexts/VehiclesContext'
import { Vehicleitem } from '@/components/Vehicleitem'

export default function ListVehicles() {
  const { vehicles } = useContext(VehiclesContext)
  return (
    <>
      <S.LinksContainer>
        <S.LinkItem href="/">
          <P.House size={32} />
        </S.LinkItem>
        <S.LinkItem href="/RegisterVehicle">
          <P.Scroll size={32} />
        </S.LinkItem>
      </S.LinksContainer>
      <S.ListVehicleContainer>
        {vehicles.map((vehicle) => {
          return <Vehicleitem key={vehicle.vehicleId} vehicle={vehicle} />
        })}
      </S.ListVehicleContainer>
    </>
  )
}
