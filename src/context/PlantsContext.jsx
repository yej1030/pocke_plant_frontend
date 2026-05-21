import React, { createContext, useState } from 'react';

export const PlantsContext = createContext({
  plants: [],
  addPlant: () => {},
});

export function PlantsProvider({ children }) {
  const [plants, setPlants] = useState([]);

  const addPlant = (plant) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setPlants((prev) => [{ ...plant, id, bookmarked: plant.bookmarked ?? false }, ...prev]);
  };

  const updatePlant = (id, plant) => {
    setPlants((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index < 0) return prev;
      const copy = [...prev];
      copy[index] = { ...copy[index], ...plant, id: copy[index].id, bookmarked: copy[index].bookmarked ?? false };
      return copy;
    });
  };

  const removePlant = (id) => {
    setPlants((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleBookmark = (id) => {
    setPlants((prev) => prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item)));
  };

  return (
    <PlantsContext.Provider value={{ plants, addPlant, updatePlant, removePlant, toggleBookmark }}>
      {children}
    </PlantsContext.Provider>
  );
}

export default PlantsProvider;
