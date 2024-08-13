'use client';

import Loading from '@/app/components/loading';
import { VehicleModel } from '@/app/lib/definitions';
import { fetchVehicle } from '@/app/utils/fetchFunctions';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

const Result = ({ params }: any) => {
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchVehicle(params.makeId, params.modelYear);
      setVehicleModels(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      <section className="flex justify-between mb-4 w-full items-baseline border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
          Models
        </h1>
        <div className="flex gap-4">
          <h1 className="text-sm font-medium text-gray-600">
            {params.modelYear}
          </h1>
          <h1 className="text-sm font-medium text-gray-600">
            Make ID: {params.makeId}
          </h1>
        </div>
      </section>
      <button
        className="self-start mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-xs"
        onClick={() => router.back()}
      >
        Back
      </button>
      {loading ? (
        <Loading />
      ) : (
        <>
          {errorMessage ? (
            <h3 className="text-lg font-semibold text-gray-400">
              {errorMessage}
            </h3>
          ) : (
            <section className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
              {vehicleModels &&
                vehicleModels.map((vehicle) => (
                  <div
                    key={vehicle.Model_ID}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 break-words">
                      {vehicle.Model_Name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Model ID: {vehicle.Model_ID}
                    </p>
                  </div>
                ))}
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default Result;
