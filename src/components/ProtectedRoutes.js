import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const loged = useSelector(state=>state.loged)

    if (loged) {
        return <Outlet />
    }

    return <Navigate to='/' />
};

export default ProtectedRoutes;