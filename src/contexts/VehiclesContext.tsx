import { api } from '@/utils/axios';
import { ReactNode, createContext, useState, useEffect } from 'react';
import { VehicleProps, ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';

type VehiclesContextType = {
  vehicles: VehicleProps[];
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const VehiclesContext = createContext({} as VehiclesContextType);

export function VehiclesContextProvider({ children }: CyclesContextProviderProps) {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);

  const fetchVehicles = async () => {
    const response = await api.get('Vehicles');
    setVehicles(response.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}
