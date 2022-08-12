import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useRef } from 'react';
import Dacar from '../../img/dacartelecom-logo.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRole } from '../../store/slices/role.slice';
import { getCampaigns, setCampaigns } from '../../store/slices/campaigns.slice';
import { getSections, setSections } from '../../store/slices/sections.slice';
import { getAdvisers, setAdvisers } from '../../store/slices/advisers.slice';
import { getProducts, setProducts } from '../../store/slices/products.slice';
import { getSolds, setSolds } from '../../store/slices/solds.slice';
import { getGoals, setGoals } from '../../store/slices/goals.slice';
import { getInvestments, setInvestments } from '../../store/slices/investments.slice';
import { setUgi } from '../../store/slices/ugiVisible.slice';
import { setSectionSelect } from '../../store/slices/sectionSelect.slice';
import { setDates } from '../../store/slices/date.slice';
import { loggin } from '../../store/slices/loged.slice';
import getConfig from '../../utils/getConfig';
import { getRoles, setRoles } from '../../store/slices/roles.slice';
import { setLocation } from '../../store/slices/location.slice';
import { setDocuments } from '../../store/slices/documents.slice';
import { setIsLoadding } from '../../store/slices/isLoadding.slice';
import { setSharedDocuments } from '../../store/slices/sharedDocuments.slice';
import { useForm } from 'react-hook-form';
import { setSuccessOrError } from '../../store/slices/successOrError.slice';
import { setPagination } from '../../store/slices/pagination.slice';
//import { io } from 'socket.io-client';

const NavTop = () => {

    let day = new Date().getDate();
    let month = new Date().getMonth()+1;
    const year = new Date().getFullYear();
    
    if (month<10) {
        month = `0${month}`;
    };

    if (day<10) {
        day = `0${day}`
    };
    
    const role = useSelector(state=>state.role);
    const roles = useSelector(state=>state.roles);
    const campaigns = useSelector(state=>state.campaigns);
    const sections = useSelector(state=>state.sections);
    const location = useSelector(state=>state.location);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectCamp,setSelectCamp] = useState('campaigns');
    const [selectSect,setSelectSect] = useState('sections');
    const [date,setDate] = useState(`${year}-${month}-${day}`);
    const [errorPass,setErrorPass] = useState(false);
    const [lastPassError,setLastPassError] = useState(false);
    const [samePass,setSamePass] = useState(false);
    const [selectRole,setSelectRole] = useState({name:'roles'});
    const [userCamp,setUserCamp] = useState({name:'campañas'});
    const [userSect,setUserSect] = useState({name:'secciones'});
    const [optionsSect,setOptionsSect] = useState([]);
    const [isSame,setIsSame] = useState(false);
    const [isSelectRole,setIsSelectRole] = useState(false);
    const [users,setUsers] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const rolesFilter = ['supervisor','asesor'];
    const defaultValues = {
        lastPassword: '',
        password: '',
        repeatPassword: '',
        email: '',
        name: '',
        lastName: '',
        passwordCreate: '',
        passwordRepeat: ''
    };

    //sockets
    //const socket = useRef();

    // useEffect(()=>{
    //     socket.current = io('ws:https://server-io-dacartelecom.herokuapp.com/');
    // },[]);

    // useEffect(()=>{
    //     socket.current.on('newGoal',section=>{
    //         if (selectSect?.id === parseInt(section)) {
    //             dispatch(getGoals(date,section));
    //         }
    //     });

    //     socket.current.on('newSale', section=>{
    //         if (selectSect?.id === parseInt(section)) {
    //             dispatch(getSolds(date,section));  
    //         };
    //     });
    // },[dispatch,date,selectSect?.id]);

    useEffect(()=>{
        dispatch(setRole(localStorage.getItem("role")));
        dispatch(getRoles());
        dispatch(getCampaigns());
    },[dispatch]);

    useEffect(()=>{
        dispatch(getSections(campaigns[0]?.id));
        dispatch(getProducts(campaigns[0]?.sections[0]?.id));
        dispatch(getAdvisers(campaigns[0]?.sections[0]?.id));
        setSelectCamp(campaigns[0]?.name);
        setSelectSect(campaigns[0]?.sections[0]);
        setUserCamp(campaigns[0]);
        setOptionsSect(campaigns[0]?.sections);
        setUserSect(campaigns[0]?.sections[0]);
    },[dispatch,campaigns]);

    useEffect(()=>{
        dispatch(setDates({
            startDate: date,
            endDate: ''
        }));
        dispatch(getSolds(date,selectSect?.id));
        dispatch(getGoals(date,selectSect?.id));
        dispatch(getInvestments(date,selectSect?.id));
    },[dispatch,date,selectSect]);

    const setCampaign = camp=>{
        dispatch(setSections(camp.sections));
        dispatch(setSectionSelect(camp.sections[0]));
        dispatch(getProducts(camp.sections[0].id));
        dispatch(getSolds(date,camp.sections[0].id));
        dispatch(getGoals(date,camp.sections[0].id));
        dispatch(getInvestments(date,camp.sections[0].id));
        dispatch(getAdvisers(camp.sections[0]?.id));
        setSelectCamp(camp.name);
        setSelectSect(camp.sections[0]);
        camp.sections[0].name.toLowerCase().includes('hogar') ? dispatch(setUgi(true)) : dispatch(setUgi(false));
    };

    const setSect = sect=>{
        dispatch(setSectionSelect(sect));
        dispatch(getProducts(sect.id));
        dispatch(getSolds(date,sect.id));
        dispatch(getGoals(date,sect.id));
        dispatch(getInvestments(date,sect.id));
        dispatch(getAdvisers(sect.id));
        setSelectSect(sect);
        sect.name.toLowerCase().includes('hogar') ? dispatch(setUgi(true)) : dispatch(setUgi(false));
    };

    const endDate = (end)=>{
        dispatch(setDates({
            startDate: date,
            endDate: end
        }));
        if (localStorage.getItem('role') !== 'asesor') {
            dispatch(getSolds(date,selectSect?.id,end));
            dispatch(getGoals(date,selectSect?.id,end));
            dispatch(getInvestments(date,selectSect?.id,end));
        } else {
            dispatch(getSolds(date,selectSect?.id,end));
            dispatch(getGoals(date,selectSect?.id,end));
        };
    };

    const updateMyPass =async data=>{
        const lastPass = document.getElementById('last-password');
        const pass = document.getElementById('new-password');
        const repeatPass = document.getElementById('repeat-password');

        if (data.lastPassword.trim()) {
            lastPass.classList.remove('bad');
        } else {
            lastPass.classList.add('bad');
        };

        if (data.password.trim()) {
            pass.classList.remove('bad');
        } else {
            pass.classList.add('bad');
        };

        if (data.repeatPassword.trim()) {
            repeatPass.classList.remove('bad');
        } else {
            repeatPass.classList.add('bad');
        };

        if (data.lastPassword.trim() && data.password.trim() && data.repeatPassword.trim()) {
            lastPass.classList.remove('bad');
            pass.classList.remove('bad');
            repeatPass.classList.remove('bad');
            if (data.password.trim() !== data.repeatPassword.trim()) {
                pass.classList.add('bad');
                repeatPass.classList.add('bad');
                setErrorPass(true);
                return
            };
            setErrorPass(false);
            const body = {
                lastPassword: data.lastPassword.trim(),
                password: data.password.trim()
            };

            try {
                dispatch(setIsLoadding(true));
                await axios.patch(`https://api-dacartelecom.herokuapp.com/api/v1/users/update/password/${localStorage.getItem('id')}`,body,getConfig());
                dispatch(setIsLoadding(false));
                setLastPassError(false);
                setSamePass(false);
                lastPass.classList.remove('bad');
                reset(defaultValues);
            } catch (error) {
                if (error.response.data.message === 'Invalid password') {
                    setLastPassError(true)
                    lastPass.classList.add('bad');
                } else {
                    setLastPassError(false);
                    lastPass.classList.remove('bad');
                };

                if (error.response.data.message === 'Password same as your previous password') {
                    setSamePass(true);
                    pass.classList.add('bad');
                } else {
                    setSamePass(false);
                    pass.classList.remove('bad');
                };

                dispatch(setIsLoadding(false));
                console.log(error.response.data);
            };
        };
    };

    const createUser =async data=>{
        const email = document.getElementById('email');
        const name = document.getElementById('name');
        const lastName = document.getElementById('lastName');
        const password = document.getElementById('password');
        const passwordRepeat = document.getElementById('passwordRepeat');

        if (data.email.trim()) {
            email.classList.remove('bad');
        } else {
            email.classList.add('bad');
        };

        if (data.name.trim()) {
            name.classList.remove('bad');
        } else {
            name.classList.add('bad');
        };

        if (data.lastName.trim()) {
            lastName.classList.remove('bad');
        } else {
            lastName.classList.add('bad');
        };

        if (data.passwordCreate.trim()) {
            password.classList.remove('bad');
        } else {
            password.classList.add('bad');
        };

        if (data.passwordRepeat.trim()) {
            passwordRepeat.classList.remove('bad');
        } else {
            passwordRepeat.classList.add('bad');
        };

        if (selectRole?.name !== 'roles') {
            setIsSelectRole(false);
        } else {
            setIsSelectRole(true);
        };

        if (data.email.trim() && data.name.trim() && data.lastName.trim() && data.passwordCreate.trim() && data.passwordRepeat.trim() && selectRole?.name !== 'roles') {
            if (data.passwordCreate.trim() !== data.passwordRepeat.trim()) {
                password.classList.add('bad');
                passwordRepeat.classList.add('bad');
                setIsSame(true);
                return
            };
            password.classList.remove('bad');
            passwordRepeat.classList.remove('bad');
            setIsSame(false);
            
            const body = {
                email: data.email.trim(),
                password: data.passwordCreate.trim(),
                name: data.name.trim(),
                lastName: data.lastName.trim(),
                roleId: selectRole?.id
            };

            if (rolesFilter.includes(selectRole?.name)) {
                body.campaignId = userCamp?.id;
                body.sectionId = userSect?.id;
            } else {
                body.campaignId = null;
                body.sectionId = null;
            };

            try {
                dispatch(setIsLoadding(true));
                await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/users/create',body,getConfig());
                dispatch(setIsLoadding(false));
                dispatch(setSuccessOrError('success'));
                reset(defaultValues);
            } catch (error) {
                dispatch(setIsLoadding(false));
                dispatch(setSuccessOrError('error'));
                console.log(error.response.data);
            };

            setTimeout(() => {
                dispatch(setSuccessOrError(''));
            }, 1500);
        };
    };

    const searchUser =async ()=>{

        if (selectRole?.name !== 'roles') {
            setIsSelectRole(false);
        } else {
            setIsSelectRole(true);
        };
        

        if (selectRole?.name !== 'roles') {
            if (rolesFilter.includes(selectRole?.name)) {
                try {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=${selectRole?.id}&campaignId=${userCamp?.id}&sectionId=${userSect?.id}`,getConfig());
                    setUsers(res.data.users);
                } catch (error) {
                    console.log(error.response.data);
                };
            } else {
                try {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=${selectRole?.id}`,getConfig());
                    setUsers(res.data.users);
                } catch (error) {
                    console.log(error.response.data);
                };
            };
        };
    };

    const logout = ()=>{
        localStorage.clear();
        dispatch(setAdvisers([]));
        dispatch(setCampaigns([]));
        dispatch(setDates({
            startDate: '',
            endDate: ''
        }));
        dispatch(setGoals([]));
        dispatch(setInvestments([]));
        dispatch(setLocation(''));
        dispatch(setProducts([]));
        dispatch(setRole(""));
        dispatch(setRoles([]));
        dispatch(setSections([]));
        dispatch(setSectionSelect({}));
        dispatch(setSolds([]));
        dispatch(setDocuments([]));
        dispatch(setSharedDocuments([]));
        dispatch(setUgi(false));
        dispatch(loggin(false));
        dispatch(setPagination(0));
        navigate("/");
    };
    
    return (
        <div className='nav-top'>
            {
                role !== 'administrador' ?
                    <></>
                :
                    <>
                        <div class="modal fade" id="updateInfoUser" aria-hidden="true" aria-labelledby="updateInfoUserLabel" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="updateInfoUserLabel">Actualizar Iformacion de un Usuario</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div className='row margin-top'>
                                                <div className='col-3'>
                                                    <label htmlFor='roles' className={isSelectRole ? 'form-label bad-text' : 'form-label'}>Roles:</label>
                                                    <div className="dropdown" id='roles'>
                                                        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownRoles" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {selectRole?.name}
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownRoles">
                                                            {roles?.map(role=>(
                                                                <li key={role.id}>
                                                                    <button type='button' className="dropdown-item" onClick={()=>{setSelectRole(role)}}>{role.name}</button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {
                                                    rolesFilter.includes(selectRole?.name) ?
                                                        <>
                                                            <div className='col-3'>
                                                                <label htmlFor='roles' className='form-label'>Campañas:</label>
                                                                <div className="dropdown" id='roles'>
                                                                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownRoles" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        {userCamp?.name}
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownRoles">
                                                                        {campaigns?.map(campaign=>(
                                                                            <li key={campaign.id}>
                                                                                <button type='button' className="dropdown-item" onClick={()=>{
                                                                                    setUserCamp(campaign);
                                                                                    setOptionsSect(campaign?.sections);
                                                                                    setUserSect(campaign?.sections[0]);
                                                                                }}>{campaign.name}</button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className='col-3'>
                                                                <label htmlFor='roles' className='form-label'>Secciones:</label>
                                                                <div className="dropdown" id='roles'>
                                                                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownRoles" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        {userSect?.name}
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownRoles">
                                                                        {optionsSect?.map(section=>(
                                                                            <li key={section.id}>
                                                                                <button type='button' className="dropdown-item" onClick={()=>{setUserSect(section)}}>{section.name}</button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </>
                                                    :
                                                        <></>
                                                }
                                                <div className='col-3 button-search'>
                                                    <button type='button' className='btn btn-primary' onClick={()=>searchUser()}>Buscar</button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className='users-accordion-container margin-top'>
                                            {
                                                users?.map(user=>(
                                                    <div className="accordion margin-top" id="accordion">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id={ user?.id }>
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle={`collapse`} data-bs-target={`#collapse${user?.id}`} aria-expanded="false" aria-controls={`collapse${user?.id}`}>
                                                                    <div className='title'>
                                                                        <p>Nombre: { user?.name } { user?.lastName }</p>
                                                                        <p>Area: { user?.role?.name }</p>
                                                                        <p>Campaña: { user?.campaign?.name }</p>
                                                                        <p>Seccion: { user?.section?.name }</p>
                                                                    </div>
                                                                </button>
                                                            </h2>
                                                            <div id={`collapse${user?.id}`} className={`accordion-collapse collapse`} aria-labelledby={ user?.id } data-bs-parent="#accordion">
                                                                <div className="accordion-body">
                                                                    <form className='margin-top'>
                                                                        <div className='margin-top row'>
                                                                            <div className='col-3'>
                                                                                <label className='form-label'>Nombre:</label>
                                                                            </div>
                                                                            <div className='col-5'>
                                                                                <input className='form-control' type='text'/>
                                                                            </div>
                                                                            <div className='col-3'>
                                                                                <button className='btn btn-primary'>Actualizar</button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='margin-top row'>
                                                                            <div className='col-3'>
                                                                                <label className='form-label'>Apellido:</label>
                                                                            </div>
                                                                            <div className='col-5'>
                                                                                <input className='form-control' type='text'/>
                                                                            </div>
                                                                            <div className='col-3'>
                                                                                <button className='btn btn-primary'>Actualizar</button>
                                                                            </div>
                                                                        </div>
                                                                        <div className='margin-top row'>
                                                                            <div className='col-3'>
                                                                                <label className='form-label'>Contraseña:</label>
                                                                            </div>
                                                                            <div className='col-5'>
                                                                                <input className='form-control' type='text'/>
                                                                            </div>
                                                                            <div className='col-3'>
                                                                                <button className='btn btn-primary'>Actualizar</button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-success" data-bs-target="#createUser" data-bs-toggle="modal">Crear Usuario</button>
                                        <button class="btn btn-primary" data-bs-target="#usersOptions" data-bs-toggle="modal">Opciones de Usuario</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="createUser" aria-hidden="true" aria-labelledby="createUserLabel" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="createUserLabel">Crear un Usuario</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form onSubmit={handleSubmit(createUser)}>
                                            <div>
                                                <label className='form-label' htmlFor='email'>Email</label>
                                                <input className='form-control' type='email' id='email' {...register('email')}/>
                                            </div>
                                            <div className='margin-top'>
                                                <label className='form-label' htmlFor='name'>Nombre</label>
                                                <input className='form-control' type='text' id='name' {...register('name')}/>
                                            </div>
                                            <div className='margin-top'>
                                                <label className='form-label' htmlFor='lastName'>Apellido</label>
                                                <input className='form-control' type='text' id='lastName' {...register('lastName')}/>
                                            </div>
                                            <div className='margin-top'>
                                                <label className='form-label' htmlFor='password'>Contraseña</label>
                                                <input className='form-control' type='password' id='password' {...register('passwordCreate')}/>
                                            </div>
                                            <div className='margin-top'>
                                                <label className='form-label' htmlFor='passwordRepeat'>Repita la Contraseña</label>
                                                <input className='form-control' type='password' id='passwordRepeat' {...register('passwordRepeat')}/>
                                            </div>
                                            {
                                                isSame ?
                                                    <div className='margin-top'>
                                                        <p className='bad-text'>Las contraseñas no coinciden</p>
                                                    </div>
                                                :
                                                    <></>
                                            }
                                            <div className='row margin-top'>
                                                <div className='col-4'>
                                                    <label htmlFor='roles' className={isSelectRole ? 'form-label bad-text' : 'form-label'}>Roles:</label>
                                                    <div className="dropdown" id='roles'>
                                                        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownRoles" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {selectRole?.name}
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownRoles">
                                                            {roles?.map(role=>(
                                                                <li key={role.id}>
                                                                    <button type='button' className="dropdown-item" onClick={()=>{setSelectRole(role)}}>{role.name}</button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {
                                                    rolesFilter.includes(selectRole?.name) ?
                                                        <>
                                                            <div className='col-4'>
                                                                <label htmlFor='roles' className='form-label'>Campañas:</label>
                                                                <div className="dropdown" id='roles'>
                                                                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownRoles" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        {userCamp?.name}
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownRoles">
                                                                        {campaigns?.map(campaign=>(
                                                                            <li key={campaign.id}>
                                                                                <button type='button' className="dropdown-item" onClick={()=>{
                                                                                    setUserCamp(campaign);
                                                                                    setOptionsSect(campaign?.sections);
                                                                                    setUserSect(campaign?.sections[0]);
                                                                                }}>{campaign.name}</button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className='col-4'>
                                                                <label htmlFor='roles' className='form-label'>Secciones:</label>
                                                                <div className="dropdown" id='roles'>
                                                                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownRoles" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        {userSect?.name}
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownRoles">
                                                                        {optionsSect?.map(section=>(
                                                                            <li key={section.id}>
                                                                                <button type='button' className="dropdown-item" onClick={()=>{setUserSect(section)}}>{section.name}</button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </>
                                                    :
                                                        <></>
                                                }
                                            </div>
                                            <div className='margin-top'>
                                                <button className='btn btn-success' type='submit'>Crear</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-info" data-bs-target="#updateInfoUser" data-bs-toggle="modal">Informacion de otro Usuario</button>
                                        <button class="btn btn-primary" data-bs-target="#usersOptions" data-bs-toggle="modal">Opciones de Usuario</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
            <div class="modal fade" id="usersOptions" aria-hidden="true" aria-labelledby="usersOptionsLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="usersOptionsLabel">Opciones de Usuario</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
                                reset(defaultValues);
                            }}></button>
                        </div>
                        <div class="modal-body">
                            <h5>Actualizar Contraseña</h5>
                            <form onSubmit={handleSubmit(updateMyPass)}>
                                <div className='margin-top'>
                                    <label className='form-label' htmlFor='last-password'>Contraseña Actual:</label>
                                    <input type='password' className='form-control' id='last-password' {...register('lastPassword')}/>
                                </div>
                                {
                                    lastPassError ?
                                        <div className='margin-top'>
                                            <p className='bad-text'>Contraseña Incorrecta</p>
                                        </div>
                                    :
                                        <></>
                                }
                                <div className='margin-top'>
                                    <label className='form-label' htmlFor='new-password'>Nueva Contraseña:</label>
                                    <input type='password' className='form-control' id='new-password' {...register('password')}/>
                                </div>
                                {
                                    samePass ?
                                        <div className='margin-top'>
                                            <p className='bad-text'>La Nueva Contraseña es igual que tu antigua Contraseña</p>
                                        </div>
                                    :
                                        <></>
                                }
                                <div className='margin-top'>
                                    <label className='form-label' htmlFor='repeat-password'>Repita la Nueva Contraseña:</label>
                                    <input type='password' className='form-control' id='repeat-password' {...register('repeatPassword')}/>
                                </div>
                                {
                                    errorPass ?
                                        <div className='margin-top'>
                                            <p className='bad-text'>Las contraseñas no coinciden</p>
                                        </div>
                                    :
                                        <></>
                                }
                                <div className='margin-top'>
                                    <button className='btn btn-primary'>Actualizar</button>
                                </div>
                            </form>
                        </div>
                        {
                            role !== 'administrador' ?
                                <></>
                            :
                            <div class="modal-footer">
                                <button class="btn btn-info" data-bs-target="#updateInfoUser" data-bs-toggle="modal">Informacion de otro Usuario</button>
                                <button class="btn btn-success" data-bs-target="#createUser" data-bs-toggle="modal">Crear Usuario</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='nav-top__container'>
                <div className='nav-top__img'>
                    <img src={Dacar} alt='dacartelecom-logo'/>
                </div>
                <div className='nav-top__options'>
                    {
                        location !== '#/home' ?
                            <></>
                        :
                            <>
                                {
                                    role !== 'viewer' ?
                                        <>
                                            <div className='nav-top__date'>
                                                <label htmlFor="startDate" className="form-label">Inicio</label>
                                                <input type='date' className="form-control" id='startDate' value={date} onChange={e=>setDate(e.target.value)}/>
                                            </div>
                                            <div className='nav-top__date'>
                                                <label htmlFor="endDate" className="form-label">Final</label>
                                                <input type='date' className="form-control" id='endDate' onChange={e=>endDate(e.target.value)}/>
                                            </div>
                                        </>
                                    :
                                        <></>
                                }
                                {
                                    role !== 'supervisor' && role !== 'asesor' ? 
                                        <>
                                            <div className='nav-top__campaign'>
                                                <label htmlFor='campaigns' className='form-label'>Campañas</label>
                                                <div className="dropdown" id='campaigns'>
                                                    <button className="btn btn-light dropdown-toggle" type="button" id="dropdownCampaign" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {selectCamp}
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownCampaign">
                                                        {campaigns?.map(campaign=>(
                                                            <li key={campaign.id}>
                                                                <button className="dropdown-item" onClick={()=>setCampaign(campaign)}>{campaign?.name}</button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='nav-top__section'>
                                                <label htmlFor='sections' className='form-label'>Secciones</label>
                                                <div className="dropdown" id='sections'>
                                                    <button className="btn btn-light dropdown-toggle" type="button" id="dropdownSection" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {selectSect?.name}
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownSection">
                                                        {sections?.map(section=>(
                                                            <li key={section?.id}>
                                                                <button className="dropdown-item" onClick={()=>setSect(section)}>{section?.name}</button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    :
                                        <></>
                                }
                            </>
                    }
                    {
                        role !== 'viewer' ?
                            <>
                                <div className='nav-top__user' data-bs-toggle="modal" href="#usersOptions">
                                    <div className='user-container'>
                                        <ion-icon name="person-circle-outline"></ion-icon>
                                    </div>
                                </div>
                            </>
                        :
                            <></>
                    }
                    <div className='nav-top__logout'>
                        <button type="button" className="btn btn-danger" onClick={()=>logout()}>
                            <div>
                                <p>logOut</p>
                                <ion-icon name="log-out-outline"></ion-icon>
                            </div>
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default NavTop;