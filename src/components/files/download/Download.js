import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments } from '../../../store/slices/documents.slice';
import { setIsLoadding } from '../../../store/slices/isLoadding.slice';
import getConfig from '../../../utils/getConfig';

const Download = () => {

    const [page,setPage] = useState(0);
    const [limit] = useState(10);
    const documents = useSelector(state=>state.documents);
    const [actualDocuments,setActualDocuments] = useState([]);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const last = ()=>{
        if (page > 0) {
            setPage(page - 10);
        };
    };

    const next = ()=>{
        if (documents?.length >= limit) {
            setPage(page + 10);
        };
    };

    const search =async data=>{
        if (data.name.trim()) {
            try {
                dispatch(setIsLoadding(true));
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/files/get/querys?name=${data.name.trim()}`,getConfig());
                dispatch(setIsLoadding(false));
                setActualDocuments(res.data.data);
                setPage(0);
            } catch (error) {
                console.log(error.response.data);
                dispatch(setIsLoadding(false));      
            };
        };
    };

    const reset = (value)=>{
        if (!value.trim()) {
            setPage(0);
            dispatch(getDocuments(0,limit));
        };
    };

    useEffect(()=>{
        dispatch(getDocuments(page,limit));
    },[dispatch,page,limit]);

    useEffect(()=>{
        setActualDocuments(documents);
    },[documents]);

    return (
        <div className='download'>
            <div className='shared-container'>
                <form className='row' onSubmit={handleSubmit(search)}>
                    <div className='col-1'>
                        <label className='form-label'>Nombre del Archivo:</label>
                    </div>
                    <div className='col-2'>
                        <input className='form-control' type='text' {...register('name')} onChange={(e)=>reset(e.target.value)}/>
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-primary'>Buscar</button>
                    </div>
                </form>
            </div>
            <div className='nav-pagination'>
                <div className={ page ? 'button-pagination' : 'button-pagination disabled' } onClick={()=>last()}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                    Anterior
                </div>
                <div className={ actualDocuments?.length >= limit ? 'button-pagination' : 'button-pagination disabled' } onClick={()=>next()}>
                    Siguiente
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
            </div>
            <div className='download-container'>
                <div className='row'>
                    <div className='col-4 strong'>Usuario</div>
                    <div className='col-6 strong'>Archivo</div>
                    <div className='col-2 download-btn strong'>Descargar</div>
                </div>
                {
                    actualDocuments?.map(document=>(  
                        <div className='row' key={document?.id}>
                            <div className='col-4'>{document?.user?.name} {document?.user?.lastName}</div>
                            <div className='col-6'>{document?.fileName}.{document?.url.split('.').pop().split('?').shift()}</div>
                            <div className='col-2 download-btn'>
                                <a className='btn btn-success' href={document?.url}>
                                    <ion-icon name="cloud-download-outline"></ion-icon>
                                    Descargar
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Download;