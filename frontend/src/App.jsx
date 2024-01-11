import React, { useEffect, useState } from "react";

export const App = () => {
  const [facts, setFacts] = useState([]);

  const getFacts = async () => {
    const res = await fetch(`http://localhost:5000/api/facts`);
    const data = await res.json();
    setFacts(data);
  };

  useEffect(() => {
    getFacts();
  }, []);

  return (
    <div>
      <h1>Facts</h1>
      <hr />
      {facts.map((fact) => {
        return (
          <div key={fact?.id}>
            <p>{fact?.description}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};
