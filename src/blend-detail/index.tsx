import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Blend } from '../types';
import { useDataContext } from '../hooks/useDataContext';
import { Header } from '../components/Header';

const BlendDetail = () => {
    const { blends, spices, setSpices } = useDataContext();
    const { id } = useParams();
    const [blend, setBlend] = useState<Blend>();
    const [blendSpices, setBlendSpices] = useState<string[]>([]);
    const [blendBlends, setBlendBlends] = useState<string[]>([]);

    const fetchSpices = useCallback(async () => {
        const spicesResponse = await fetch('/api/v1/spices');
        const spices = await spicesResponse.json();

        setSpices(spices);
    }, [setSpices]);

    const fetchBlend = useCallback(async () => {
        const response = await fetch(`/api/v1/blends/${id}`);
        const blend = await response.json();

        setBlend(blend);
    }, [id]);

    useEffect(() => {
        if (blends && blends.length > 0) {
            const blend = blends.find((s) => s.id === Number(id));

            if (blend) {
                setBlend(blend);
            }
        } else {
            fetchSpices();
            fetchBlend();
        }

    }, [id, blends, fetchBlend, fetchSpices, setSpices]);

    useEffect(() => {
        if (blend?.spices && spices?.length > 0) {
            const blendSpiceNames =
                spices
                    .filter(spice => blend.spices.includes(spice.id))
                    .map(spice => spice.name);

            setBlendSpices(blendSpiceNames);
        }
    }, [blend, spices]);

    useEffect(() => {
        if (blend?.blends && blends?.length > 0) {
            const blendBlendNames =
                blends
                    .filter(mix => blend.blends.includes(mix.id))
                    .map(blend => blend.name);

            setBlendBlends(blendBlendNames);

            // Now that we have the blendBlends, we can fetch their spices
            blend?.blends.forEach(id => {
                const blendDetail = blends.find(blend => blend.id === id);

                if (blendDetail?.spices) {
                    const spiceNames =
                        spices
                            .filter(spice => blendDetail.spices.includes(spice.id))
                            .map(spice => spice.name);

                    setBlendSpices(prevSpices => {
                        const updatedSpices = [...prevSpices, ...spiceNames];

                        return Array.from(new Set(updatedSpices)); // Remove duplicates
                    });
                }
            });
        }
    }, [blend, blends, spices]);

    return (
        <div className={`
          m-1.5 text-gray-800
          md:m-2.5
          lg:m-5
        `}>
            <Header text={`Blend - ${blend?.name}`} />
            {blend && (
                <div>
                    <div className='mb-1'>
                        <span className='mr-1 font-bold'>Blend Name:</span> {blend.name || 'None Provided'}
                    </div>
                    <div className='mb-1'>
                        <span className='mr-1 font-bold'>Blends:</span> {blendBlends.length ? blendBlends.join(', ') : 'None'}
                    </div>
                    <div className='mb-1'>
                        <span className='mr-1 font-bold'>Spices:</span> {blendSpices.length ? blendSpices.join(', ') : 'None'}
                    </div>
                    <div className='mb-1'>
                        <span className='mr-1 font-bold'>Description:</span> {blend.description || 'None Provided'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlendDetail;
