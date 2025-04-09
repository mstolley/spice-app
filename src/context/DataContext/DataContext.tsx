import { createContext } from 'react';
import type { Blend, Spice } from '../../types';

interface DataContextType {
    spices: Spice[];
    blends: Blend[];
    setSpices: React.Dispatch<React.SetStateAction<Spice[]>>;
    setBlends: React.Dispatch<React.SetStateAction<Blend[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export default DataContext;
