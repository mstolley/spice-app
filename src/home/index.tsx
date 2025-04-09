import { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import { Header } from '../components/Header';
import { Accordion } from '../components/Accordion';

function Home() {
    const { spices, blends, setSpices, setBlends } = useDataContext();
    const [newBlendName, setNewBlendName] = useState('');
    const [selectedBlend1, setSelectedBlend1] = useState<number | null>(null);
    const [selectedBlend2, setSelectedBlend2] = useState<number | null>(null);

    const [error, setError] = useState<string | null>(null);

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

        if (!spices || spices.length === 0) fetchSpices();
        if (!blends || blends.length === 0) fetchBlends();
    }, [blends, spices, setSpices, setBlends]);

    async function handleAddBlend(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await fetch('/api/v1/blends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newBlendName,
                    spices: [],
                    blends: [selectedBlend1, selectedBlend2],
                    description: 'A new blend created from selected blends',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add blend');
            }

            const newBlend = await response.json();

            // Update the blends state with the new blend
            setBlends((prevBlends) => [...prevBlends, newBlend]);

            // Clear the form input
            setNewBlendName('');
            setSelectedBlend1(null);
            setSelectedBlend2(null);
            setError(null);
        } catch (err) {
            setError((err as Error).message);
        }
    }

    return (
        <div className={`
          m-1.5 text-gray-800
          md:m-2.5
          lg:m-5
        `}>
            <Header text='Spice and Blend List' />
            <Accordion text='Spice List' list={spices} />
            <Accordion text='Blend List' list={blends} />

            <form onSubmit={handleAddBlend} className={`
              mt-5 rounded-lg border p-5 shadow-md
              sm:w-full
              md:w-1/2
            `}>
                <h2 className="mb-3 text-xl font-bold">Add a New Blend</h2>
                <div className="mb-3">
                    <label htmlFor="blendName" className={`
                      mb-1 block font-medium
                    `}>Blend Name:</label>
                    <input
                        id="blendName"
                        type="text"
                        value={newBlendName}
                        onChange={(e) => setNewBlendName(e.target.value)}
                        className="w-full rounded-md border p-2"
                        placeholder="Enter blend name"
                        required
                    />
                </div>
                <div className="mt-3">
                    <h2 className="mb-3 text-xl font-bold">Select Blends</h2>
                    <div className="mb-3">
                        <label htmlFor="blend1" className={`
                          mb-1 block font-medium
                        `}>Blend 1:</label>
                        <select
                            id="blend1"
                            value={selectedBlend1 ?? ''}
                            onChange={(e) => setSelectedBlend1(e.target.value ? parseInt(e.target.value, 10) : null)}
                            className="w-full rounded-md border p-2"
                            required
                        >
                            <option value="" disabled>Select a blend</option>
                            {blends
                                .filter(blend => blend.id !== selectedBlend2)
                                .map(blend => (
                                    <option key={blend.id} value={blend.id}>
                                        {blend.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="blend2" className={`
                          mb-1 block font-medium
                        `}>Blend 2:</label>
                        <select
                            id="blend2"
                            value={selectedBlend2 ?? ''}
                            onChange={(e) => setSelectedBlend2(e.target.value ? parseInt(e.target.value, 10) : null)}
                            className="w-full rounded-md border p-2"
                            required
                        >
                            <option value="" disabled>Select a blend</option>
                            {blends
                                .filter(blend => blend.id !== selectedBlend1)
                                .map(blend => (
                                    <option key={blend.id} value={blend.id}>
                                        {blend.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                {error && <p className="mb-3 text-red-500">{error}</p>}
                <button
                    type="submit"
                    className={`
                      rounded-md bg-blue-500 px-4 py-2 text-white
                      transition-colors delay-100 duration-300 ease-in-out
                      hover:bg-blue-600
                    `}
                >
                    Add Blend
                </button>
            </form>
        </div>
    );
}

export default Home;
