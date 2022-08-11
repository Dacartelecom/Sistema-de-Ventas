import React from 'react';
import { useSelector } from 'react-redux';
import ProductsSolds from './porducts-solds/ProductsSolds';
import TotalSolds from './porducts-solds/TotalSolds';
import UgiSolds from './porducts-solds/UgiSolds';

const TableAdvisers = ({adviser,products}) => {

    const ugiVisible = useSelector(state=>state.ugiVisible);

    return (
        <div className='cards-info-adviser'>
            <div>
                <p>{ adviser ? adviser?.name : 'asesores' }</p>
            </div>
            { products?.map(product=>(
                <ProductsSolds product={product} adviser={adviser} key={product?.id}/>
            )) }
            <TotalSolds adviser={adviser}/>
            {
                ugiVisible ? 
                <UgiSolds adviser={adviser}/> 
                : 
                <></>
            }
        </div>
    );
};

export default TableAdvisers;