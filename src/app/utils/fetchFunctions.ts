export const fetchVehicleType = async () => {
  const response = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
  );
  const data = await response.json();
  return data.Results;
};

export const getModelYears = () => {
  const currentYear = new Date().getFullYear();
  const modelYears = [];
  for (let i = 2015; i <= currentYear; i++) {
    modelYears.push(i);
  }
  return modelYears;
}