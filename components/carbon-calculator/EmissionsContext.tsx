import React, { useState, createContext, useContext } from "react";

interface TransportationData {
  longFlights?: number;
  shortFlights?: number;
  carType?: string;
  milesPerWeek?: string;
  useTrain?: string;
  trainFrequency?: string;
  useBus?: string;
  busFrequency?: string;
  walkBike?: string;
  walkBikeFrequency?: string;
  flightEmissions?: number;
  carEmissions?: number;
  publicTransportEmissions?: number;
  transportationEmissions?: number;
}

interface DietData {
  diet?: string;
  dietEmissions?: number;
}

interface EnergyData {
  state?: string;
  electricBill?: string;
  waterBill?: string;
  propaneBill?: string;
  gasBill?: string;
  useWoodStove?: string;
  peopleInHome?: number;
  electricEmissions?: number;
  waterEmissions?: number;
  otherEnergyEmissions?: number;
  energyEmissions?: number;
}

interface TotalData {
  transportationEmissions: number;
  dietEmissions: number;
  energyEmissions: number;
  totalEmissions: number;
}

interface EmissionsData {
  transportationData: TransportationData;
  dietData: DietData;
  energyData: EnergyData;
  totalData: TotalData;
}

interface EmissionsContextType extends EmissionsData {
  updateTransportationData: (data: Partial<TransportationData>) => void;
  updateDietData: (data: Partial<DietData>) => void;
  updateEnergyData: (data: Partial<EnergyData>) => void;
  updateTotalData: (data: Partial<TotalData>) => void;
  getAllData: () => EmissionsData;
}

const EmissionsContext = createContext<EmissionsContextType>({
  transportationData: {},
  dietData: {},
  energyData: {},
  totalData: {
    transportationEmissions: 0,
    dietEmissions: 0,
    energyEmissions: 0,
    totalEmissions: 0,
  },
  updateTransportationData: () => {},
  updateDietData: () => {},
  updateEnergyData: () => {},
  updateTotalData: () => {},
  getAllData: () => ({
    transportationData: {},
    dietData: {},
    energyData: {},
    totalData: {
      transportationEmissions: 0,
      dietEmissions: 0,
      energyEmissions: 0,
      totalEmissions: 0,
    },
  }),
});

export function EmissionsProvider({ children }: { children: React.ReactNode }) {
  const [transportationData, setTransportationData] =
    useState<TransportationData>({});
  const [dietData, setDietData] = useState<DietData>({});
  const [energyData, setEnergyData] = useState<EnergyData>({});
  const [totalData, setTotalData] = useState<TotalData>({
    transportationEmissions: 0,
    dietEmissions: 0,
    energyEmissions: 0,
    totalEmissions: 0,
  });

  const updateTransportationData = (data: Partial<TransportationData>) => {
    setTransportationData((prev) => ({ ...prev, ...data }));
  };

  const updateDietData = (data: Partial<DietData>) => {
    setDietData((prev) => ({ ...prev, ...data }));
  };

  const updateEnergyData = (data: Partial<EnergyData>) => {
    setEnergyData((prev) => ({ ...prev, ...data }));
  };

  const updateTotalData = (data: Partial<TotalData>) => {
    setTotalData((prev) => ({ ...prev, ...data }));
  };

  const getAllData = (): EmissionsData => {
    return {
      transportationData,
      dietData,
      energyData,
      totalData,
    };
  };

  return (
    <EmissionsContext.Provider
      value={{
        transportationData,
        dietData,
        energyData,
        totalData,
        updateTransportationData,
        updateDietData,
        updateEnergyData,
        updateTotalData,
        getAllData,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
}

export const useEmissions = () => useContext(EmissionsContext);
