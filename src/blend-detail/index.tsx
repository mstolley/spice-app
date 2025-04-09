import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Blend } from '../types';
import { useDataContext } from '../hooks/useDataContext';
import { Header } from '../components/Header';

const BlendDetail = () => {
    const { blends } = useDataContext();
    const { id } = useParams();
    const [blend, setBlend] = useState<Blend>();

    useEffect(() => {
        async function fetchBlend() {
            const response = await fetch(`/api/v1/blends/${id}`);
            const blend = await response.json();

            setBlend(blend);
        }

        if (blends && blends.length > 0) {
            const blend = blends.find((s) => s.id === Number(id));

            if (blend) {
                setBlend(blend);
            } else {
                fetchBlend();
            }
        } else {
            fetchBlend();
        }

    }, [id, blends]);

    console.log('BlendDetail blends:', blend?.blends);
    console.log('BlendDetail spices:', blend?.spices);

    return (
        <div className={`
          m-1.5 text-gray-800
          md:m-2.5
          lg:m-5
        `}>
            <Header text={`Spice - ${blend?.name}`} />
            {blend && (
                <div>
                    <div>Blend Name: {blend.name}</div>
                    <div>Blends: {blend.blends}</div>
                    <div>Spices: {blend.spices}</div>
                    <div>Description: {blend.description}</div>
                </div>
            )}
        </div>
    );
};

export default BlendDetail;
