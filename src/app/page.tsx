'use client';

import React, { useEffect, useState } from 'react';
import { VehicleType } from './lib/definitions';
import { fetchVehicleType, getModelYears } from './utils/fetchFunctions';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[] | null>(null);
  const [vehicleInput, setVehicleInput] = useState({
    vehicleType: '',
    modelYear: '',
  });

  const fetchData = async () => {
    try {
      const data = await fetchVehicleType();
      setVehicleTypes(data);
    } catch (error) {
      console.error(error); // TODO: show something
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicleInput({ ...vehicleInput, [e.target.name]: e.target.value });
  };

  console.log(vehicleInput);
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <section className="flex flex-col w-full gap-2">
        <div className="flex flex-col">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            name="vehicleType"
            id="vehicleType"
            onChange={(e) => handleVehicleTypeChange(e)}
          >
            <option value="">Select a vehicle type</option>
            {vehicleTypes &&
              vehicleTypes.map((vehicleType) => (
                <option key={vehicleType.MakeId} value={vehicleType.MakeName}>
                  {vehicleType.MakeName}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="modelYear">Model Year</label>
          <select
            name="modelYear"
            id="modelYear"
            onChange={(e) => handleVehicleTypeChange(e)}
          >
            <option value="">Select a model year</option>
            {getModelYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </section>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-100"
        disabled={!vehicleInput.modelYear || !vehicleInput.vehicleType}
        onClick={() =>
          router.push(
            `result/${vehicleInput.vehicleType}/${vehicleInput.modelYear} `
          )
        }
      >
        Next
      </button>
    </main>
  );
}
