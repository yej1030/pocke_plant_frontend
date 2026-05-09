import React, { createContext, useState } from 'react';

export const PlantsContext = createContext({
  plants: [],
  addPlant: () => {},
});

export function PlantsProvider({ children }) {
  const [plants, setPlants] = useState([]);

  const addPlant = (plant) => {
    setPlants((prev) => [plant, ...prev]);
  };

  const updatePlant = (index, plant) => {
    setPlants((prev) => {
      const copy = [...prev];
      if (index >= 0 && index < copy.length) copy[index] = plant;
      return copy;
    });
  };

  const removePlant = (index) => {
    setPlants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <PlantsContext.Provider value={{ plants, addPlant, updatePlant, removePlant }}>
      {children}
    </PlantsContext.Provider>
  );
}

export default PlantsProvider;
