import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Spice } from '../types';

const SpiceDetail = () => {
  const { id } = useParams();
  const [spice, setSpice] = useState<Spice>();

  useEffect(() => {
    async function fetchSpice() {
      const response = await fetch(`/api/v1/spices/${id}`);
      const spice = await response.json();
      setSpice(spice);
    }

    fetchSpice();
  }, [id]);

  return (
    <div>
      <h2>Spice Detail Page</h2>
      {spice && (
        <div>
          <div>Spice Name: {spice.name}</div>
          <div>Spice Color: {spice.color}</div>
          <div>Spice Cost: {spice.price}</div>
          <div>Spice Heat Level: {spice.heat}</div>
        </div>
      )}
    </div>
  );
};

export default SpiceDetail;
