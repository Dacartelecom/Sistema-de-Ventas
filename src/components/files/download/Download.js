import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../../../store/slices/pagination.slice';

const Download = () => {

    const documents = useSelector(state=>state.documents);
    const pagination = useSelector(state=>state.pagination);
    const dispatch = useDispatch();

    const last = ()=>{
        const index = pagination;
        if (index) {
            if (index - 10 > -1) {
                dispatch(setPagination(index-10));
            }
        };
    };

    const next = ()=>{
        const index = pagination;
        if (documents?.length >= 10) {
            dispatch(setPagination(index+10));
        };
    };

    return (
        <div className='download'>
        <div className='nav-pagination'>
            <div className={ pagination ? 'button-pagination' : 'button-pagination disabled' } onClick={()=>last()}>
                <ion-icon name="arrow-back-outline"></ion-icon>
                Anterior
            </div>
            <div className={ documents?.length >= 10 ? 'button-pagination' : 'button-pagination disabled' } onClick={()=>next()}>
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
                    documents?.map(document=>(  
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