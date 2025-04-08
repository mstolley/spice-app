import { Link } from 'react-router-dom';
import type { Blend, Spice } from '../types';
import { useEffect, useState } from 'react';

function Home() {
    const [spices, setSpices] = useState<Spice[]>([]);
    const [blends, setBlends] = useState<Blend[]>([]);
    const [searchString, updateSearchString] = useState('');
    const [isSpicesOpen, setIsSpicesOpen] = useState(false);
    const [isBlendsOpen, setIsBlendsOpen] = useState(false);

    useEffect(() => {
        async function fetchSpices() {
            const spicesResponse = await fetch('/api/v1/spices');
            const spices = await spicesResponse.json();
            setSpices(spices);
        }

        async function fetchBlends() {
            const blendsResponse = await fetch('/api/v1/blends');
            const blends = await blendsResponse.json();
            setBlends(blends);
        }

        fetchSpices();
        fetchBlends();
    }, []);

    return (
        <div className='m-1.5 md:m-2.5 lg:m-5'>
            <div>
                <h4
                    className='text-3xl font-bold cursor-pointer mb-2.5'
                    onClick={() => setIsSpicesOpen(!isSpicesOpen)}
                >
                    Spice List
                </h4>
                {isSpicesOpen && (
                    <div className='mb-5 flex flex-col'>
                        <input
                            className='border-2 border-gray-300 rounded-md p-2 mb-2 sm:w-full md:w-1/2'
                            value={searchString}
                            onChange={(e) => {
                                updateSearchString(e.target.value);
                            }}
                        />
                        {spices
                            .filter((spice) =>
                                spice.name
                                    .toLowerCase()
                                    .includes(searchString.toLowerCase()),
                            )
                            .map((spice) => (
                                <div key={spice.id}>
                                    <Link to={`/spices/${spice.id}`}>
                                        {spice.name}
                                    </Link>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            <div>
                <h4
                    className='text-3xl font-bold cursor-pointer mb-2.5'
                    onClick={() => setIsBlendsOpen(!isBlendsOpen)}
                >
                    Blend List
                </h4>
                {isBlendsOpen && (
                    <div className='mb-5 flex flex-col'>
                        {blends
                            .filter((blend) =>
                                blend.name
                                    .toLowerCase()
                                    .includes(searchString.toLowerCase()),
                            )
                            .map((blend) => (
                                <div key={blend.id}>
                                    <Link to={`/blends/${blend.id}`}>
                                        {blend.name}
                                    </Link>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
