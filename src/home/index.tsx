import { useEffect } from 'react';
import { useDataContext } from '@/hooks/useDataContext';
import { Header } from '@/components/Header';
import { Accordion } from '@/components/Accordion';

function Home() {
    const { spices, blends, setSpices, setBlends } = useDataContext();

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
    }, [setSpices, setBlends]);

    return (
        <div className={`
          m-1.5 text-gray-800
          md:m-2.5
          lg:m-5
        `}>
            <Header text='Spice and Blend List' />
            <Accordion text="Spice List" list={spices} />
            <Accordion text="Blend List" list={blends} />
        </div>
    );
}

export default Home;
