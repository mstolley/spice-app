import { useState } from 'react';
import { DataContext } from '../DataContext';
import { Spice, Blend } from '../../types';

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [spices, setSpices] = useState<Spice[]>([]);
  const [blends, setBlends] = useState<Blend[]>([]);

  return (
    <DataContext.Provider value={{ spices, blends, setSpices, setBlends }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
