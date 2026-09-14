import React, { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { getMyPlants } from '../api/api';

export const PlantsContext = createContext({
  plants: [],
  addPlant: () => {},
});

export function PlantsProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const loadPromiseRef = useRef(null);

  // Keep one stable function reference and coalesce overlapping screen-focus loads.
  // An unstable function here retriggered Main's useFocusEffect after every setPlants,
  // creating a continuous /api/plants/my request loop.
  const loadPlants = useCallback(() => {
    if (loadPromiseRef.current) return loadPromiseRef.current;

    const request = getMyPlants()
      .then((response) => {
        if (Array.isArray(response)) {
          setPlants(response);
        } else if (response && response.data && Array.isArray(response.data)) {
          setPlants(response.data);
        } else {
          setPlants(response || []);
        }
        return response;
      })
      .catch((e) => {
        console.log('PlantsContext: loadPlants failed', e.response?.data || e.message);
        return null;
      })
      .finally(() => {
        loadPromiseRef.current = null;
      });

    loadPromiseRef.current = request;
    return request;
  }, []);

  const addPlant = (plant) => {
    const id = plant?.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
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

  const value = useMemo(
    () => ({ plants, addPlant, updatePlant, removePlant, toggleBookmark, loadPlants }),
    [plants, loadPlants],
  );

  return (
    <PlantsContext.Provider value={value}>
      {children}
    </PlantsContext.Provider>
  );
}

export default PlantsProvider;
