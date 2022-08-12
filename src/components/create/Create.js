import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import getConfig from '../../utils/getConfig';
import { setRoles } from '../../store/slices/roles.slice';
import { setSections } from '../../store/slices/sections.slice';
import { setProducts } from '../../store/slices/products.slice';
import { setAdvisers } from '../../store/slices/advisers.slice';
import { setSuccessOrError } from '../../store/slices/successOrError.slice';
import Advisers from './advisers/Advisers';
//import { io } from 'socket.io-client';

const Create = () => {
    let total = 0;

    const section = localStorage.getItem('section');
    const { register, handleSubmit, reset } = useForm();
    const role = useSelector(state=>state.role);
    const roles = useSelector(state=>state.roles);
    const campaigns = useSelector(state=>state.campaigns);
    const sections = useSelector(state=>state.sections);
    const products = useSelector(state=>state.products);
    const advisers = useSelector(state=>state.advisers);
    const dispatch = useDispatch();
    const [createSections,setCreateSections] = useState([]);
    const [createProducts,setCreateProducts] = useState([]);
    const [goals,setGoals] = useState([]);
    const [hour,setHour] = useState(new Date().getHours());

    //web sockets
    // const socket = useRef();

    // useEffect(()=>{
    //     socket.current = io('ws:https://server-io-dacartelecom.herokuapp.com/');
    // },[]);

    let day = new Date().getDate();
    let month = new Date().getMonth()+1;
    const year = new Date().getFullYear();
    
    if (month<10) {
        month = `0${month}`;
    };

    if (day<10) {
        day = `0${day}`
    };

    if (hour < 10) {
        setHour(`0${hour}`)
    };

    const date = `${year}-${month}-${day}`;

    const defaultValues = {
        role: '',
        campaign: '',
        section: '',
        product: '',
        descriptionRole: '',
        descriptionCampaign: '',
        descriptionSection: '',
        descriptionProduct: ''
    };

    const change =async value=>{

        let key;

        for (let i = 0; i < value.target.childNodes.length; i++) {
            if (value.target.childNodes[i].value === value.target.value) {
                key = value.target.childNodes[i].id
            };
        };

        try {
            const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/sections/get/query?campaignId=${key}`,getConfig());
            setCreateSections(res.data.sections);
            const product = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/products/get/querys?sectionId=${res.data.sections[0].id}`,getConfig());
            setCreateProducts(product.data.products);
        } catch (error) {
            console.log(error.response.data);
        };
    };

    const changeSect =async value=>{
        let key;

        for (let i = 0; i < value.target.childNodes.length; i++) {
            if (value.target.childNodes[i].value === value.target.value) {
                key = value.target.childNodes[i].id
            };
        };

        try {
            const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/products/get/querys?sectionId=${key}`,getConfig());
            setCreateProducts(res.data.products);
        } catch (error) {
            console.log(error.response.data);
        };
    };

    const selectCamp =async value=>{
        let key;

        for (let i = 0; i < value.target.childNodes.length; i++) {
            if (value.target.childNodes[i].value === value.target.value) {
                key = value.target.childNodes[i].id
            };
        };

        try {
            const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/sections/get/query?campaignId=${key}`,getConfig());
            dispatch(setSections(res.data.sections));
            const product = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/products/get/querys?sectionId=${res.data.sections[0].id}`,getConfig());
            dispatch(setProducts(product.data.products));
            const adviser = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=5&sectionId=${res.data.sections[0].id}`,getConfig());
            dispatch(setAdvisers(adviser.data.users));
        } catch (error) {
            console.log(error.response.data);
        };
    };

    const selectSect =async value=>{
        let key;

        for (let i = 0; i < value.target.childNodes.length; i++) {
            if (value.target.childNodes[i].value === value.target.value) {
                key = value.target.childNodes[i].id
            };
        };

        try {
            const product = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/products/get/querys?sectionId=${key}`,getConfig());
            dispatch(setProducts(product.data.products));
            const adviser = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=5&sectionId=${key}`,getConfig());
            dispatch(setAdvisers(adviser.data.users));
        } catch (error) {
            console.log(error.response.data);
        };
    };

    const create =async (data)=>{

        if (data.role.trim() && data.descriptionRole.trim()) {
            const name = document.getElementById('name-role');
            const description = document.getElementById('description-role');

            const body = {
                name: data.role.trim(),
                description: data.descriptionRole.trim()
            };

            name.classList.remove('bad');
            description.classList.remove('bad');

            try {
                await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/roles/create',body,getConfig());
                const res = await axios.get('https://api-dacartelecom.herokuapp.com/api/v1/roles',getConfig());
                dispatch(setRoles(res.data.data));
                dispatch(setSuccessOrError('success'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            } catch (error) {
                console.log(error.response.data);
                dispatch(setSuccessOrError('error'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            }

            reset(defaultValues);
        } else {
            if (!data.role.trim()) {
                const bad = document.getElementById('name-role');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('name-role');
                bad.classList.remove('bad');
            };

            if (!data.descriptionRole.trim()) {
                const bad = document.getElementById('description-role');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('description-role');
                bad.classList.remove('bad');
            };
        };

        if (data.campaign.trim() && data.descriptionCampaign.trim()) {
            const name = document.getElementById('name-campaign');
            const description = document.getElementById('description-campaign');
            const body = {
                name: data.campaign.trim(),
                description: data.descriptionCampaign.trim()
            };

            name.classList.remove('bad');
            description.classList.remove('bad');

            try {
                await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/campaigns/create',body,getConfig());
                dispatch(setSuccessOrError('success'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            } catch (error) {
                console.log(error.response.data);
                dispatch(setSuccessOrError('error'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            };

            reset(defaultValues);
        } else {
            if (!data.campaign.trim()) {
                const bad = document.getElementById('name-campaign');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('name-campaign');
                bad.classList.remove('bad');
            };

            if (!data.descriptionCampaign.trim()) {
                const bad = document.getElementById('description-campaign');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('description-campaign');
                bad.classList.remove('bad');
            };
        };

        if (data.section.trim() && data.descriptionSection.trim()) {
            let key;

            const name = document.getElementById('name-section');
            const description = document.getElementById('description-section');
            const campaign = document.getElementById('select-section').value;
            const campaigns = document.getElementById('select-section').childNodes;

            name.classList.remove('bad');
            description.classList.remove('bad');

            for (let i = 0; i < campaigns.length; i++) {
                if (campaign === campaigns[i].value) {
                    key = campaigns[i].id
                };
            };

            const body = {
                name: data.section.trim(),
                description: data.descriptionSection.trim(),
                campaignId: key
            };

            try {
                await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/sections/create',body,getConfig());
                dispatch(setSuccessOrError('success'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            } catch (error) {
                console.log(error.response.data);
                dispatch(setSuccessOrError('error'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            };

            reset(defaultValues);
        } else {
            if (!data.section.trim()) {
                const bad = document.getElementById('name-section');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('name-section');
                bad.classList.remove('bad');
            };

            if (!data.descriptionSection.trim()) {
                const bad = document.getElementById('description-section');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('description-section');
                bad.classList.remove('bad');
            };
        };

        if (data.product.trim() && data.descriptionProduct.trim()) {
            let campId;
            let sectId;

            const name = document.getElementById('name-product');
            const description = document.getElementById('description-product');
            const campaign = document.getElementById('select-product-campaign').value;
            const section = document.getElementById('select-product-section').value;
            const campaigns = document.getElementById('select-product-campaign').childNodes;
            const sections = document.getElementById('select-product-section').childNodes;

            name.classList.remove('bad');
            description.classList.remove('bad');

            for (let i = 0; i < campaigns.length; i++) {
                if (campaign === campaigns[i].value) {
                    campId = campaigns[i].id;
                };
            };

            for (let i = 0; i < sections.length; i++) {
                if (section === sections[i].value) {
                    sectId = sections[i].id;
                };
            };

            const body = {
                name: data.product.trim(),
                description: data.descriptionProduct.trim(),
                campaignId: campId,
                sectionId: sectId
            };

            try {
                await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/products/create',body,getConfig());
                dispatch(setSuccessOrError('success'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            } catch (error) {
                console.log(error.response.data);
                dispatch(setSuccessOrError('error'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            };

            reset(defaultValues);
        } else {
            if (!data.product.trim()) {
                const bad = document.getElementById('name-product');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('name-product');
                bad.classList.remove('bad');
            };

            if (!data.descriptionProduct.trim()) {
                const bad = document.getElementById('description-product');
                bad.classList.add('bad');
            } else {
                const bad = document.getElementById('description-product');
                bad.classList.remove('bad');
            };
        };
    };

    const update =async (data)=>{

        if (data.role.trim() || data.descriptionRole.trim()) {
            let id;

            const role = document.getElementById('select-roles').value;
            const roles = document.getElementById('select-roles').childNodes;
            const body = {};

            for (let i = 0; i < roles.length; i++) {
                if (role === roles[i].value) {
                    id = roles[i].id
                };
            };


            if (data.role.trim()) {
                body.name = data.role.trim();
            };

            if (data.descriptionRole.trim()) {
                body.description = data.descriptionRole.trim();
            };

            try {
                await axios.patch(`https://api-dacartelecom.herokuapp.com/api/v1/roles/update/${id}`,body,getConfig());
                const res = await axios.get('https://api-dacartelecom.herokuapp.com/api/v1/roles',getConfig());
                dispatch(setRoles(res.data.data));
            } catch (error) {
                console.log(error.response.data);
            }

            reset(defaultValues);
        };

        if (data.campaign.trim() || data.descriptionCampaign.trim()) {
            let id;

            const campaign = document.getElementById('select-campaign').value;
            const campaigns = document.getElementById('select-campaign').childNodes;
            const body = {};

            for (let i = 0; i < campaigns.length; i++) {
                if (campaign === campaigns[i].value) {
                    id = campaigns[i].id;
                };
            };

            if (data.campaign.trim()) {
                body.name = data.campaign.trim();
            };

            if (data.descriptionCampaign.trim()) {
                body.description = data.descriptionCampaign.trim();
            };

            try {
                await axios.patch(`https://api-dacartelecom.herokuapp.com/api/v1/campaigns/update/${id}`,body,getConfig());
            } catch (error) {
                console.log(error.response.data);
            };

            reset(defaultValues);
        };

        if (data.section.trim() || data.descriptionSection.trim()) {
            let id;

            const section = document.getElementById('select-section-section').value;
            const sections = document.getElementById('select-section-section').childNodes;
            const body = {};

            for (let i = 0; i < sections.length; i++) {
                if (section === sections[i].value) {
                    id = sections[i].id
                };
            };

            if (data.section.trim()) {
                body.name = data.section.trim();
            };

            if (data.descriptionSection.trim()) {
                body.description = data.descriptionSection.trim();
            };

            try {
                await axios.patch(`https://api-dacartelecom.herokuapp.com/api/v1/sections/update/${id}`,body,getConfig());
            } catch (error) {
                console.log(error.response.data);
            };

            reset(defaultValues);
        };

        if (data.product.trim() || data.descriptionProduct.trim()) {
            let id;

            const product = document.getElementById('select-products-product').value;
            const products = document.getElementById('select-products-product').childNodes;
            const body = {};

            for (let i = 0; i < products.length; i++) {
                if (product === products[i].value) {
                    id = products[i].id;
                };
            };

            if (data.product.trim()) {
                body.name = data.product.trim();
            };

            if (data.descriptionProduct.trim()) {
                body.description = data.descriptionProduct.trim();
            };

            try {
                await axios.patch(`https://api-dacartelecom.herokuapp.com/api/v1/products/update/${id}`,body,getConfig());
            } catch (error) {
                console.log(error.response.data);
            };

            reset(defaultValues);
        };
    };

    const goal =async data=>{

        if (data.goal.trim()) {
            const id = localStorage.getItem('id');
            const body = {
                goal: data.goal.trim(),
                day: date
            };

            try {
                await axios.post(`https://api-dacartelecom.herokuapp.com/api/v1/goals/create/${id}`,body,getConfig());
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                setGoals(res.data.goals);
                dispatch(setSuccessOrError('success'));
                //socket.current.emit('createGoal',section);
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            } catch (error) {
                console.log(error.response.data);
                dispatch(setSuccessOrError('error'));
                setTimeout(() => {
                    dispatch(setSuccessOrError(''));
                }, 1500);
            };
        }
    };

    const solds =async e=>{
        e.preventDefault();
        const id = e.target.id;
        const dateTime = `${year}-${month}-${day} ${hour}:00`;

        for (let i = 0; i < e.target.childNodes[0].childNodes.length; i++) {
            const sale = e.target.childNodes[0].childNodes[i].childNodes[2].childNodes[0];
            if (sale.value.trim()) {
                const body = {
                    sold: parseInt(sale.value),
                    dayTime: dateTime
                };
                try {
                    const res = await axios.post(`https://api-dacartelecom.herokuapp.com/api/v1/solds/create/${id}/${sale.id}`,body,getConfig());
                    sale.value = "";
                    console.log(res.data);
                    //socket.current.emit('createSale',section);
                    //socket.current.emit('createSaleUser',id);
                    //socket.current.emit('cerateSaleProduct',sale.id);
                    dispatch(setSuccessOrError('success'));
                } catch (error) {
                    console.log(error.response.data);
                    dispatch(setSuccessOrError('error'));
                    break
                }
            };
        };
        
        setTimeout(() => {
            dispatch(setSuccessOrError(''));
        }, 1500);
    };

    useEffect(()=>{
        setCreateSections(sections);
        setCreateProducts(products);
    },[sections,products]);

    useEffect(()=>{
        const getGoals =async ()=>{
            try {
                const section = localStorage.getItem('section');
                const res =await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${date}&sectionId=${section}`,getConfig());
                setGoals(res.data.goals);
            } catch (error) {
                console.log(error.response.data);
            };
        };

        getGoals();
    },[date]);

    if (goals.length) {
        goals?.map(goal=>{
            return total += goal.goal;
        });
    };

    return (
        <div className='create-container'>
            {
                !(role !== 'administrador') ?
                    <>
                        <div>
                            <h3>Crear</h3>
                        </div>
                        <div className='create-body'>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='Roles'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseRoles' aria-expanded="false" aria-controls='collapseRoles'>
                                            <div className='title'>
                                                <p>Roles</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseRoles' className='accordion-collapse collapse' aria-labelledby='Roles' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(create)}>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-role" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-role" aria-describedby="emailHelp" {...register("role")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-role" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-role" {...register("descriptionRole")}/>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Crear</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='Campaigns'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseCampaigns' aria-expanded="false" aria-controls='collapseCampaigns'>
                                            <div className='title'>
                                                <p>Campañas</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseCampaigns' className='accordion-collapse collapse' aria-labelledby='Campaigns' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(create)}>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-campaign" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-campaign" aria-describedby="emailHelp" {...register("campaign")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-campaign" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-campaign" {...register("descriptionCampaign")}/>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Crear</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='Secciones'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseSecciones' aria-expanded="false" aria-controls='collapseSecciones'>
                                            <div className='title'>
                                                <p>Secciones</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseSecciones' className='accordion-collapse collapse' aria-labelledby='Secciones' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(create)}>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-section" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-section" aria-describedby="emailHelp" {...register("section")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-section" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-section" {...register("descriptionSection")}/>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-section" className="form-label">Campañas</label>
                                                        <select id="select-section" className="form-select">
                                                            {
                                                                campaigns?.map(campaign=>(
                                                                    <option key={campaign?.id} id={campaign?.id}>{campaign?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Crear</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='Productos'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseProductos' aria-expanded="false" aria-controls='collapseProductos'>
                                            <div className='title'>
                                                <p>Productos</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseProductos' className='accordion-collapse collapse' aria-labelledby='Productos' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(create)}>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-products" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-product" aria-describedby="emailHelp" {...register("product")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-products" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-product" {...register("descriptionProduct")}/>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-products-campaign" className="form-label">Campañas</label>
                                                        <select id="select-product-campaign" className="form-select"  onChange={e=>change(e)}>
                                                            {
                                                                campaigns?.map(campaign=>(
                                                                    <option key={campaign?.id} id={campaign?.id}>{campaign?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-products-section" className="form-label">Secciones</label>
                                                        <select id="select-product-section" className="form-select">
                                                            {
                                                                createSections?.map(section=>(
                                                                    <option key={section?.id} id={section?.id}>{section?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Crear</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Actualizar</h3>
                        </div>
                        <div className='update-body'>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='RolesUpdated'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseRolesUpdated' aria-expanded="false" aria-controls='collapseRolesUpdated'>
                                            <div className='title'>
                                                <p>Roles</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseRolesUpdated' className='accordion-collapse collapse' aria-labelledby='RolesUpdated' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(update)}>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-roles" className="form-label">Roles</label>
                                                        <select id="select-roles" className="form-select">
                                                            {
                                                                roles?.map(role=>(
                                                                    <option key={role?.id} id={role?.id}>{role?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-update-role" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-update-role" aria-describedby="emailHelp" {...register("role")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-update-role" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-update-role" {...register("descriptionRole")}/>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Actualizar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='CampaignsUpdated'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseCampaignsUpdated' aria-expanded="false" aria-controls='collapseCampaignsUpdated'>
                                            <div className='title'>
                                                <p>Campañas</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseCampaignsUpdated' className='accordion-collapse collapse' aria-labelledby='CampaignsUpdated' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(update)}>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-campaign" className="form-label">Campañas</label>
                                                        <select id="select-campaign" className="form-select">
                                                            {
                                                                campaigns?.map(campaign=>(
                                                                    <option key={campaign?.id} id={campaign?.id}>{campaign?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-update-campaign" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-update-campaign" aria-describedby="emailHelp" {...register("campaign")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-campaign" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-campaign" {...register("descriptionCampaign")}/>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Actualizar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='SeccionesUpdated'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseSeccionesUpdated' aria-expanded="false" aria-controls='collapseSeccionesUpdated'>
                                            <div className='title'>
                                                <p>Secciones</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseSeccionesUpdated' className='accordion-collapse collapse' aria-labelledby='SeccionesUpdated' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(update)}>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-section-campaign" className="form-label">Campañas</label>
                                                        <select id="select-section-campaign" className="form-select"  onChange={e=>change(e)}>
                                                            {
                                                                campaigns?.map(campaign=>(
                                                                    <option key={campaign?.id} id={campaign?.id}>{campaign?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-section-section" className="form-label">Secciones</label>
                                                        <select id="select-section-section" className="form-select">
                                                            {
                                                                createSections?.map(section=>(
                                                                    <option key={section?.id} id={section?.id}>{section?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-update-section" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-update-section" aria-describedby="emailHelp" {...register("section")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-update-section" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-update-section" {...register("descriptionSection")}/>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Actualizar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion create-form-body" id="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id='ProductosUpdated'>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target='#collapseProductosUpdated' aria-expanded="false" aria-controls='collapseProductosUpdated'>
                                            <div className='title'>
                                                <p>Productos</p>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id='collapseProductosUpdated' className='accordion-collapse collapse' aria-labelledby='ProductosUpdated' data-bs-parent="#accordion">
                                        <div className="accordion-body">
                                            <div className='create-form-body'>
                                                <form onSubmit={handleSubmit(update)}>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-products-campaign" className="form-label">Campañas</label>
                                                        <select id="select-product-campaign" className="form-select"  onChange={e=>change(e)}>
                                                            {
                                                                campaigns?.map(campaign=>(
                                                                    <option key={campaign?.id} id={campaign?.id}>{campaign?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-products-section" className="form-label">Secciones</label>
                                                        <select id="select-product-section" className="form-select" onChange={e=>changeSect(e)}>
                                                            {
                                                                createSections?.map(section=>(
                                                                    <option key={section?.id} id={section?.id}>{section?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label htmlFor="select-products-product" className="form-label">Productos</label>
                                                        <select id="select-products-product" className="form-select">
                                                            {
                                                                createProducts?.map(product=>(
                                                                    <option key={product?.id} id={product?.id}>{product?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="name-update-products" className="form-label">Nombre</label>
                                                        <input type="text" className="form-control" id="name-update-product" aria-describedby="emailHelp" {...register("product")}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-update-products" className="form-label">Descripcion</label>
                                                        <textarea className="form-control" id="description-update-product" {...register("descriptionProduct")}/>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Actualizar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='title'>
                            <h3>Ventas:</h3>
                            <div className="mb-3">
                                <label htmlFor="campaign" className="form-label">Campañas</label>
                                <select id="campaign" className="form-select" onChange={e=>selectCamp(e)}>
                                    {
                                        campaigns?.map(campaign=>(
                                            <option key={campaign?.id} id={campaign?.id}>{campaign?.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="campaign" className="form-label">Secciones</label>
                                <select id="campaign" className="form-select" onChange={e=>selectSect(e)}>
                                    {
                                        sections?.map(section=>(
                                            <option key={section?.id} id={section?.id}>{section?.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='solds-body'>
                            {
                                advisers?.map(adviser=>(
                                    <Advisers adviser={adviser} products={products} hour={hour} date={date}/>
                                ))
                            }
                        </div>
                    </>
                :
                    !(role !== 'marketing') ?
                        <>
                            <div className='title'>
                                <h3>Ventas:</h3>
                                <div className="mb-3">
                                    <label htmlFor="campaign" className="form-label">Campañas</label>
                                    <select id="campaign" className="form-select" onChange={e=>selectCamp(e)}>
                                        {
                                            campaigns?.map(campaign=>(
                                                <option key={campaign?.id} id={campaign?.id}>{campaign?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="campaign" className="form-label">Secciones</label>
                                    <select id="campaign" className="form-select" onChange={e=>selectSect(e)}>
                                        {
                                            sections?.map(section=>(
                                                <option key={section?.id} id={section?.id}>{section?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='solds-body'>
                                {
                                    advisers?.map(adviser=>(
                                        <Advisers adviser={adviser} products={products} hour={hour} date={date}/>
                                    ))
                                }
                            </div>
                        </>
                    :
                        <>
                            <div className='mb-3'>
                                <div className='goal row'>
                                    <div className='col-4'></div>
                                    <div className='col-4'>
                                        <form className='row' onSubmit={handleSubmit(goal)}>
                                            <div className='col-1'></div>
                                            <div className='col-3'>
                                                <label htmlFor='goal' className="form-label">Meta:</label>
                                            </div>
                                            <div className='col-3'>
                                                {
                                                    goals.length ?
                                                        <input type="number" value={total} className="form-control" id='goal' disabled/>
                                                    :
                                                        <input type="number" className="form-control" id='goal' {...register('goal')}/>
                                                }
                                            </div>
                                            <div className='col-1'></div>
                                            <div className='col-3'>
                                                <button type={ goals.length ? "button" : "submit" } className="btn btn-primary">Guardar</button>
                                            </div>
                                            <div className='col-1'></div>
                                        </form>
                                    </div>
                                    <div className='col-4'></div>
                                </div>
                            </div>
                            <div className='title'>
                                <h3>Ventas:</h3>
                            </div>
                            <div className='solds-body'>
                                {
                                    advisers?.map(adviser=>(
                                        <div className="accordion create-form-body" id="accordion">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id={adviser?.id}>
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle='collapse' data-bs-target={`#collapse${adviser?.id}`} aria-expanded="false" aria-controls={`collapseRoles${adviser?.id}`}>
                                                        <div className='title'>
                                                            <p>{adviser?.name}</p>
                                                        </div>
                                                    </button>
                                                </h2>
                                                <div id={`collapse${adviser?.id}`} className='accordion-collapse collapse' aria-labelledby={adviser?.id} data-bs-parent="#accordion">
                                                    <div className="accordion-body">
                                                        <div className='create-form-body'>
                                                            <form id={adviser?.id} onSubmit={e=>solds(e)}>
                                                                <div className="mb-3">
                                                                    {
                                                                        products?.map(product=>(
                                                                            <div className='row'>
                                                                                <div className='col-1'></div>
                                                                                <div className='col-4'>
                                                                                    <label htmlFor={`product-${product?.id}`} className="form-label">{product?.name}</label>
                                                                                </div>
                                                                                <div className='col-5'>
                                                                                    <input type="number" className="form-control" id={product?.id} aria-describedby="emailHelp"/>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <button type="submit" className="btn btn-primary">Enviar</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
            }
        </div>
    );
};

export default Create;