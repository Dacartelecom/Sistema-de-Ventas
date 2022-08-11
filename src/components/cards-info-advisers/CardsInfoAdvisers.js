import React from 'react';
import TableAdvisers from './table-advisers/TableAdvisers';
import { useSelector } from 'react-redux';

const CardsInfoAdvisers = () => {

    const products = useSelector(state=>state.products);
    const advisers = useSelector(state=>state.advisers);

    return (
        <div className='cards-info'>
            <TableAdvisers products={products}/>
            { advisers?.map(adviser=>(
                <TableAdvisers adviser={adviser} products={products} key={adviser?.id}/>
            )) }
        </div>
    );
};

export default CardsInfoAdvisers;