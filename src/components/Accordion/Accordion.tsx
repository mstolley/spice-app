
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Blend, Spice } from '../../types';

interface AccordionProps {
    text: string;
    list: (Spice | Blend)[];
    isOpenInitially?: boolean;
}

function Accordion({ text, list, isOpenInitially = false }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(isOpenInitially);
    const [searchString, updateSearchString] = useState('');

    // Determine if the list is "blends" based on the presence of 'spices'
    const isBlend = list.length > 0 && 'spices' in list[0];

    return (
        <div>
            <h4
                className={`
                  mb-2.5 cursor-pointer text-2xl font-bold transition-colors
                  delay-100 duration-300 ease-in-out
                  hover:text-gray-600
                `}
                onClick={() => setIsOpen(!isOpen)}
            >
                {text}
            </h4>
            {isOpen && (
                <div className='mb-5 flex flex-col'>
                    {!isBlend && (
                        <input
                            className={`
                              mb-2.5 rounded-md border-2 border-gray-400 p-2.5
                              sm:w-full
                              md:w-1/2
                            `}
                            value={searchString}
                            onChange={(e) => {
                                updateSearchString(e.target.value);
                            }}
                        />
                    )}
                    {list
                        .filter((spice) =>
                            spice.name
                                .toLowerCase()
                                .includes(searchString.toLowerCase()),
                        )
                        .map((item) => (
                            <div key={item.id}>
                                <Link to={`/${isBlend ? 'blends' : 'spices'}/${item.id}`}>
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Accordion;
