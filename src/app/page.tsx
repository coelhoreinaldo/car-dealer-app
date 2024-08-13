'use client';

import React, { useEffect, useState } from 'react';
import { VehicleType } from './lib/definitions';
import { fetchVehicleType, getModelYears } from './utils/fetchFunctions';
import { useRouter } from 'next/navigation';
import Loading from './components/loading';

export default function Home() {
  const router = useRouter();

  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[] | null>(null);
  const [vehicleInput, setVehicleInput] = useState({
    vehicleType: '',
    modelYear: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const data = await fetchVehicleType();
      setVehicleTypes(data.Results);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicleInput({ ...vehicleInput, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500 mb-2 justify-self-start">
        Car Dealer App
      </h1>
      {errorMessage ? (
        <h3 className="text-lg font-semibold text-red-500">{errorMessage}</h3>
      ) : (
        <>
          <section className="flex flex-col w-full max-w-md gap-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col">
              <label
                htmlFor="vehicleType"
                className="text-gray-700 font-semibold mb-2 flex w-full gap-2"
              >
                Vehicle Type <span>{loading ? <Loading /> : null}</span>
              </label>
              <select
                name="vehicleType"
                id="vehicleType"
                onChange={handleVehicleTypeChange}
                className="p-2 border rounded-md"
              >
                <option value="">Select a vehicle type</option>
                {vehicleTypes &&
                  vehicleTypes.map((vehicleType) => (
                    <option key={vehicleType.MakeId} value={vehicleType.MakeId}>
                      {vehicleType.MakeName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="modelYear"
                className="text-gray-700 font-semibold mb-2"
              >
                Model Year
              </label>
              <select
                name="modelYear"
                id="modelYear"
                onChange={handleVehicleTypeChange}
                className="p-2 border rounded-md"
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
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200 transition duration-300"
            disabled={!vehicleInput.modelYear || !vehicleInput.vehicleType}
            onClick={() =>
              router.push(
                `result/${vehicleInput.vehicleType}/${vehicleInput.modelYear}`
              )
            }
          >
            Next
          </button>
        </>
      )}
    </main>
  );
}
