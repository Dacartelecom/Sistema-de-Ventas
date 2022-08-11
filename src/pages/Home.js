import React from 'react';
import CardsInfoAdvisers from '../components/cards-info-advisers/CardsInfoAdvisers';
import CardsInfoPercent from '../components/cards-info-percent/CardsInfoPercent';
import TableSales from '../components/table-sales/TableSales';
import { useSelector } from 'react-redux';
import NavLeft from '../components/nav-left/NavLeft';
import NavTop from '../components/nav-top/NavTop';
import Reloj from '../components/reloj/Reloj';

const Home = () => {

  const role = useSelector(state=>state.role);

    return (
      <div className='page-container'>
        <NavTop />
        <div className='body-pages-container'>
          {
            role !== 'viewer' ?
            <NavLeft />
            :
            <></>
          }
          <div className='home'>
            <div className='home-container'>
              <Reloj />
              { 
              role !== 'viewer' ? 
              <></>
              :
              <div className='table-sales'>
                <TableSales />
              </div> 
              }
              <div className='cards-container'>
                <CardsInfoPercent />
                <CardsInfoAdvisers />
              </div>
            </div>  
          </div>
        </div>
      </div>
    );
};

export default Home;