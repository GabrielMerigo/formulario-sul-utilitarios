import { api } from '@/utils/axios';
import { ReactNode, createContext, useState, useEffect } from 'react';
import { VehicleProps, ImageFile, UploadzoneProps } from '@/types/VehiclesTypes';

type VehiclesContextType = {
  vehicles: VehicleProps[];
  postVehicles: (vehicleToPost: VehicleProps) => Promise<void>;
  deleteVehicles: (vehicleToDeleteId: string) => Promise<void>;
};

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const VehiclesContext = createContext({} as VehiclesContextType);

export function VehiclesContextProvider({ children }: CyclesContextProviderProps) {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const response = await api.get('Vehicles');
    setVehicles(response.data);
  };

  const postVehicles = async (vehicleToPost: VehicleProps) => {
    const response = await api.post('vehicles', vehicleToPost);
    setVehicles((state) => [response.data, ...state]);
  };

  const deleteVehicles = async (vehicleToDeleteId: string) => {
    const response = await api.delete(`vehicles/${vehicleToDeleteId}`);
    const remainingVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleToDeleteId);
    setVehicles(remainingVehicles);
  };

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        postVehicles,
        deleteVehicles,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}
