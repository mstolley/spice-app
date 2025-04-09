import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Spice } from '../types';
import { useDataContext } from '../hooks/useDataContext';
import { Header } from '../components/Header';

function SpiceDetail() {
  const { spices } = useDataContext();
  const { id } = useParams();
  const [spice, setSpice] = useState<Spice>();

  useEffect(() => {
    async function fetchSpice() {
      const response = await fetch(`/api/v1/spices/${id}`);
      const spice = await response.json();

      setSpice(spice);
    }

    if (spices && spices.length > 0) {
      const spice = spices.find((s) => s.id === Number(id));

      if (spice) {
        setSpice(spice);
      } else {
        fetchSpice();
      }
    } else {
      fetchSpice();
    }
  }, [id, spices]);

  return (
    <div
      className={`
          m-1.5 text-gray-800
          md:m-2.5
          lg:m-5
        `}
    >
      <Header text={`Spice - ${spice?.name}`} />
      {spice && (
        <div>
          <div className="mb-1">
            <span className="mr-1 font-bold">Spice Name:</span>{' '}
            {spice.name || 'None Provided'}
          </div>
          <div className="mb-1">
            <span className="mr-1 font-bold">Spice Color:</span>
            <span
              className={`
                              mr-1 w-4 rounded-xs pt-1 pr-2.5 pb-1 pl-2.5
                              ${
                                spice.color.length === 6
                                  ? `text-white`
                                  : `text-red-500`
                              }
                            `}
              style={{ backgroundColor: `#${spice.color}` }}
            >
              {spice.color.length === 6
                ? spice.color
                : `${spice.color} (incorrect value)`}
            </span>
          </div>
          <div className="mb-1">
            <span className="mr-1 font-bold">Spice Cost:</span>{' '}
            {spice.price || 'None Provided'}
          </div>
          <div className="mb-1">
            <span className="mr-1 font-bold">Spice Heat Level:</span>{' '}
            {spice.heat || 'None Provided'}
          </div>
        </div>
      )}
    </div>
  );
}

export default SpiceDetail;
