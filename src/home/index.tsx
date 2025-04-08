import { Link } from 'react-router-dom';
import type { Blend, Spice } from '../types';
import { useEffect, useState } from 'react';

function Home() {
  const [spices, setSpices] = useState<Spice[]>([]);
  const [blends, setBlends] = useState<Blend[]>([]);
  const [searchString, updateSearchString] = useState('');

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
    <div style={{ textAlign: 'center' }}>
      <h4>Spice List</h4>
      <div>
        <input
          value={searchString}
          onChange={(e) => {
            updateSearchString(e.target.value);
          }}
        />
      </div>
      {spices
        .filter((spice) =>
          spice.name.toLowerCase().includes(searchString.toLowerCase()),
        )
        .map((spice) => (
          <div key={spice.id}>
            <Link to={`/spices/${spice.id}`}>{spice.name}</Link>
          </div>
        ))}
      <h4>Blend List</h4>
      {blends
        .filter((blend) =>
          blend.name.toLowerCase().includes(searchString.toLowerCase()),
        )
        .map((blend) => (
          <div key={blend.id}>
            <Link to={`/blends/${blend.id}`}>{blend.name}</Link>
          </div>
        ))}
    </div>
  );
}

export default Home;
