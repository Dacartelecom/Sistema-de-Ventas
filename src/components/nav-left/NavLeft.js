import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLocation } from '../../store/slices/location.slice';

const NavLeft = () => {

    const location = window.location;
    const role = localStorage.getItem('role');
    const sections = document.getElementsByClassName('nav-left__section');
    const dispatch = useDispatch();

    useEffect(()=>{
        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.remove('select');
        };
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].hash === location.hash) {
                sections[i].classList.add('select');
            }
        };

        dispatch(setLocation(location.hash));
    },[location,sections,dispatch]);

    return (
        <div className='nav-left__body'>
            <div className='nav-left__container'>
                {
                    role !== 'contador' ?
                        <Link to='/home' className='nav-left__section'>
                            <ion-icon name="home-outline"></ion-icon>
                        </Link>
                    :
                        <></>
                }
                {
                    role !== 'asesor' && role !== 'contador' ?
                        <Link to='/input' className='nav-left__section'>
                            <ion-icon name="pencil"></ion-icon>
                        </Link>
                    :
                        <></>
                }
                {
                    role !== 'supervisor' ?
                        role !== 'asesor'?
                        <Link to='/files' className='nav-left__section'>
                            <ion-icon name="folder-outline"></ion-icon>
                        </Link>
                        :
                        <></>
                    :
                        <></> 
                }
            </div> 
        </div>
    );
};

export default NavLeft;