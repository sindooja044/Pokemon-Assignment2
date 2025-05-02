import React, { useContext } from "react";
import { ComparisonContext } from "../contexts/ComparisonContext";

const ComparePage = () => {
  const { selectedForComparison } = useContext(ComparisonContext);

  if (selectedForComparison.length !== 2) {
    return <p>Select two Pokémon to compare.</p>;
  }

  const [p1, p2] = selectedForComparison;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      {[p1, p2].map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            width: "200px",
          }}
        >
          <img src={p.image} alt={p.name} style={{ width: "100%" }} />
          <h3>{p.name}</h3>
          <p>ID: {p.id}</p>
          <p>Types: {p.types.join(", ")}</p>
          {/* Extend this with stats/abilities later if available */}
        </div>
      ))}
    </div>
  );
};

export default ComparePage;
