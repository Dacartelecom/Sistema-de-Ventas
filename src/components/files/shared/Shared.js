import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments } from '../../../store/slices/documents.slice';
import { setIsLoadding } from '../../../store/slices/isLoadding.slice';
import { getSharedDocuments } from '../../../store/slices/sharedDocuments.slice';
import { setSuccessOrError } from '../../../store/slices/successOrError.slice';
import getConfig from '../../../utils/getConfig';
//import { io } from 'socket.io-client';

const Shared = () => {

    const roles = useSelector(state=>state.roles);
    const documents = useSelector(state=>state.documents);
    const sharedDocuments = useSelector(state=>state.sharedDocuments);
    const [actualDocuments,setActualDocuments] = useState([]);
    const [page,setPage] = useState(0);
    const [limit] = useState(10);
    const [file,setFile] = useState();
    const [users,setUSers] = useState([]);
    const [selectRol,setSelectRol] = useState({name:'Area'});
    const selectRole = [];
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const validRoles = ['administrador','marketing','contador'];

    //sockets
    // const socket = useRef();

    // useEffect(()=>{
    //     socket.current = io('ws:https://server-io-dacartelecom.herokuapp.com/');
    // },[]);

    useEffect(()=>{
        setActualDocuments(documents);
    },[documents]);
    
    useEffect(()=>{
        dispatch(getDocuments(page,limit));
    },[dispatch,page,limit]);

    const search =async data=>{
        if (data.name.trim()) {
            try {
                dispatch(setIsLoadding(true));
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/files/get/querys?name=${data.name.trim()}`,getConfig());
                dispatch(setIsLoadding(false));
                setActualDocuments(res.data.data);
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

    const searchUsers =async data=>{
        if (data.userName.trim()) {
            try {
                dispatch(setIsLoadding(true));
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=${selectRol?.id}&name=${data.userName.trim()}`,getConfig());
                dispatch(setIsLoadding(false))
                setUSers(res.data.users);
            } catch (error) {
                dispatch(setIsLoadding(false));
                console.log(error);
            };
        };
    };

    const shareFile =async id=>{
        const body = {
            permission: id
        };

        try {
            dispatch(setIsLoadding(true));
            const res = await axios.patch(`https://api-dacartelecom.herokuapp.com/api/v1/files/update/${file}`,body,getConfig());
            dispatch(setIsLoadding(false));
            dispatch(setSuccessOrError('success'));
            //socket.current.emit('sendFile',id);
            console.log(res);
        } catch (error) {
            dispatch(setIsLoadding(false));
            dispatch(setSuccessOrError('error'));
            console.log(error.response.data);
        }
        
        setTimeout(() => {
            dispatch(setSuccessOrError(''));
        }, 1500);
    };

    // useEffect(()=>{

    //     socket.current.on('reciveFile',id=>{
    //         if (id === parseInt(localStorage.getItem('id'))) {
    //           dispatch(getSharedDocuments());  
    //         };
    //     });

    // },[dispatch]);

    const downloadFile =async id=>{
        try {
            await axios.delete(`https://api-dacartelecom.herokuapp.com/api/v1/files/permission/${id}`,getConfig());
            dispatch(getSharedDocuments());
        } catch (error) {
            console.log(error.response.data);
        }
    };

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

    roles.map(role=>{
        if (validRoles.includes(role.name)) {
            selectRole.push(role);
        };

        return selectRole;
    });

    return (
        <div className='shared'>
            <div className="modal fade" id="modalSearchUsers" aria-hidden="true" aria-labelledby="modalSearchUsersLabel" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalSearchUsersLabel">Buscar Usuarios</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='row' onSubmit={handleSubmit(searchUsers)}>
                                <div className='row select-area'>
                                    <div className='col-1'></div>
                                    <div className='col-2'>
                                        <label htmlFor='roles' className='form-label'>Area: </label>
                                    </div>
                                    <div className="dropdown col-3" id='roles'>
                                        <button className="btn btn-info dropdown-toggle" type="button" id="dropdownCampaign" data-bs-toggle="dropdown" aria-expanded="false">
                                            {selectRol?.name}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownCampaign">
                                            {selectRole?.map(role=>(
                                                <li key={role.id}>
                                                    <button type='button' className="dropdown-item" onClick={()=>setSelectRol(role)}>{role?.name}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-5'>
                                    <label className='form-label'>Nombre de Usuario:</label>
                                </div>
                                <div className='col-4'>
                                    <input type='text' className='form-control' {...register('userName')}/>
                                </div>
                                <div className='col-2'>
                                    <button className='btn btn-primary'>Buscar</button>
                                </div>
                            </form>
                            <div className='row users-content'>
                                <div className='col-1'></div>
                                <div className='col-3'>
                                    <h5>Usuarios: </h5>
                                </div>
                            </div>
                            <div className='row users-content'>
                            {
                                users.length ?
                                    <>
                                        {
                                            users.map(user=>(
                                                <div key={user.id} className='user-shared'>
                                                    <div>Nombre: {user.name} {user.lastName}</div>
                                                    <div>
                                                        <button type='button' className='btn btn-success' onClick={()=>shareFile(user.id)}>
                                                            Compartir
                                                            <ion-icon name="document-outline"></ion-icon>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                :
                                    <>
                                        <div className='col-1'></div>
                                        <div className='col-5'>Usuarios no Encontrados</div>
                                    </>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <div className='download-container'>
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
                <div className='row'>
                    <h2>Mis Archivos</h2>
                </div>
                {
                    actualDocuments.length ?
                        <>
                            <div className='row'>
                                <div className='col-4 strong'>Usuario</div>
                                <div className='col-6 strong'>Archivo</div>
                                <div className='col-2 download-btn strong'>Compartir</div>
                            </div>
                            {
                                actualDocuments?.map(document=>(  
                                    <div className='row' key={document?.id}>
                                        <div className='col-4'>{document?.user?.name} {document?.user?.lastName}</div>
                                        <div className='col-6'>{document?.fileName}.{document?.url.split('.').pop().split('?').shift()}</div>
                                        <div className='col-2 download-btn'>
                                            <button type='button' className={ document?.userId === parseInt(localStorage.getItem('id')) ? 'btn btn-primary' : 'btn btn-primary disabled'} data-bs-toggle="modal" href="#modalSearchUsers" onClick={()=>setFile(document?.id)}>
                                                Compartir
                                                <ion-icon name="arrow-redo-outline"></ion-icon>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    :
                        <div className='row'>
                            <h3>Archivos no encontrados</h3>
                        </div>
                }
            </div>
            <div className='download-container'>
                <div className='row'>
                    <h2>Archivos Compartidos</h2>
                </div>
                {
                    sharedDocuments.length ?
                        <>
                            <div className='row'>
                                <div className='col-4 strong'>Usuario</div>
                                <div className='col-6 strong'>Archivo</div>
                                <div className='col-2 download-btn strong'>Descargar</div>
                            </div>
                            {
                                sharedDocuments?.map(document=>(  
                                    <div className='row' key={document?.id}>
                                        <div className='col-4'>{document?.user?.name} {document?.user?.lastName}</div>
                                        <div className='col-6'>{document?.fileName}.{document?.url.split('.').pop().split('?').shift()}</div>
                                        <div className='col-2 download-btn'>
                                            <a className='btn btn-success' href={document?.url} onClick={()=>downloadFile(document?.id)}>
                                                <ion-icon name="cloud-download-outline"></ion-icon>
                                                Descargar
                                            </a>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    :
                        <div className='row'>
                            <h3>No hay Archivos Compartidos</h3>
                        </div>
                }
            </div>
        </div>
    );
};

export default Shared;