import React from 'react';
import { useSelector } from 'react-redux';
import Create from '../components/create/Create';
import NavLeft from '../components/nav-left/NavLeft';
import NavTop from '../components/nav-top/NavTop';
import Reloj from '../components/reloj/Reloj';

const Input = () => {
    
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
            <div className='input'>
                <div className='input-container'>
                    <Reloj />
                    <Create />
                </div>
            </div>
          </div>
        </div>
    );
};

export default Input;