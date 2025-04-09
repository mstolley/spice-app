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
        }

    }, [id, spices]);

    return (
        <div className={`
          m-1.5 text-gray-800
          md:m-2.5
          lg:m-5
        `}>
            <Header text={`Spice - ${spice?.name}`} />
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
