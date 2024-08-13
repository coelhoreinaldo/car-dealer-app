'use client';

import React, { useEffect, useState } from 'react';
import { VehicleType } from './lib/definitions';
import { fetchVehicleType, getModelYears } from './utils/fetchFunctions';

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[] | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchVehicleType();
      setVehicleTypes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <section className="flex w-full">
        <select name="vehicleType" id="vehicleType">
          {vehicleTypes &&
            vehicleTypes.map((vehicleType) => (
              <option key={vehicleType.MakeId} value={vehicleType.MakeName}>
                {vehicleType.MakeName}
              </option>
            ))}
        </select>
        <select name="modelYear" id="modelYear">
          {getModelYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </section>
    </main>
  );
}
