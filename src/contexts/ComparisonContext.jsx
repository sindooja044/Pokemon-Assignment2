import React, { createContext, useState } from "react";

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [selectedForComparison, setSelectedForComparison] = useState([]);

  const toggleCompare = (pokemon) => {
    setSelectedForComparison((prev) => {
      const exists = prev.find((p) => p.id === pokemon.id);
      if (exists) return prev.filter((p) => p.id !== pokemon.id);
      if (prev.length >= 2) return [prev[1], pokemon]; // max 2
      return [...prev, pokemon];
    });
  };

  const clearComparison = () => setSelectedForComparison([]);

  return (
    <ComparisonContext.Provider
      value={{ selectedForComparison, toggleCompare, clearComparison }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
