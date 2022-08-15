import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setRoles } from '../../../store/slices/roles.slice';
import { setSuccessOrError } from '../../../store/slices/successOrError.slice';
import getConfig from '../../../utils/getConfig';

const CreateNew = ({campaigns,sections}) => {

    const [createSections,setCreateSections] = useState(sections);
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

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
            const res = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/sections/get/query?campaignId=${key}`,getConfig());
            setCreateSections(res.data.sections);
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
                await axios.post('https://sistema-de-ventas-api.herokuapp.com/api/v1/roles/create',body,getConfig());
                const res = await axios.get('https://sistema-de-ventas-api.herokuapp.com/api/v1/roles',getConfig());
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
                await axios.post('https://sistema-de-ventas-api.herokuapp.com/api/v1/campaigns/create',body,getConfig());
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
                await axios.post('https://sistema-de-ventas-api.herokuapp.com/api/v1/sections/create',body,getConfig());
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
                await axios.post('https://sistema-de-ventas-api.herokuapp.com/api/v1/products/create',body,getConfig());
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

    useEffect(()=>{
        setCreateSections(sections);
    },[sections]);

    return (
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
        </>
    );
};

export default CreateNew;