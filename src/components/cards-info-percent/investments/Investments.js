import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import getConfig from '../../../utils/getConfig';
import { getInvestments } from '../../../store/slices/investments.slice';
import { setSuccessOrError } from '../../../store/slices/successOrError.slice';
import { setIsLoadding } from '../../../store/slices/isLoadding.slice';

const Investments = () => {

    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    if (month < 10) {
        month = `0${month}`;
    };

    if (day < 10) {
        day = `0${day}`;
    };

    const sectionSelect = useSelector(state=>state.sectionSelect);
    const investments = useSelector(state=>state.investments);
    const solds = useSelector(state=>state.solds);
    const role = useSelector(state=>state.role);
    const date = useSelector(state=>state.date);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const defaultValues = {
        investments: '',
        lead: '',
        google: ''
    };

    let inversion = 0;
    let lead = 0;
    let google = 0;
    let total = 0;
    let updatedAt;

    if (solds.length) {
        solds?.map(sold=>{
            return total += sold.sold;
        });
    };

    if (investments.length) {
        let time = 0;
        investments?.map(investment=>{
            let update = new Date(investment.updatedAt).getTime();

            if (update > time) {
                time = update;
                updatedAt = investment.updatedAt;
            };

            if (investment.name === 'inversion') {
                return inversion += parseFloat(investment.investment);
            };

            if (investment.name === 'lead') {
                return lead += parseFloat(investment.investment);
            };

            if (investment.name === 'google') {
                return google += parseFloat(investment.investment);
            };
            
            return total
        });
    };

    if (updatedAt) {
        updatedAt = updatedAt.split("T").pop();
        updatedAt = updatedAt.split(".").shift();

        let hour;

        if (parseInt(updatedAt.split(":").shift()) !== 0) {
            hour = parseInt(updatedAt.split(":").shift()) - 5;
        } else {
            hour = 24 -5;
        };


        if (hour > 12) {
            hour = hour - 12
        };

        if (hour < 10) {
            hour = `0${hour}`
        };

        updatedAt = `${hour}${updatedAt.slice(2)}`;
    };

    const submit =async (data)=>{
        const actualDay = `${year}-${month}-${day}`;
        let success = false

        if (data.investments.trim() !== '') {
            const body = {
                name: 'inversion',
                investment: data.investments,
                day: actualDay
            };
            try {
                dispatch(setIsLoadding(true));
                await axios.post(`https://api-dacartelecom.herokuapp.com/api/v1/investments/create/${sectionSelect.campaignId}/${sectionSelect.id}`,body,getConfig());
                dispatch(setIsLoadding(false));
                success = true;
                dispatch(setSuccessOrError('success'));
            } catch (error) {
                dispatch(setIsLoadding(false));
                dispatch(setSuccessOrError('error'));
                console.log(error.response.data);
            };
        };

        if (data.lead.trim() !== '') {
            const body = {
                name: 'lead',
                investment: data.lead,
                day: actualDay
            };
            try {
                dispatch(setIsLoadding(true));
                await axios.post(`https://api-dacartelecom.herokuapp.com/api/v1/investments/create/${sectionSelect.campaignId}/${sectionSelect.id}`,body,getConfig());
                dispatch(setIsLoadding(false));
                success = true;
                dispatch(setSuccessOrError('success'));
            } catch (error) {
                dispatch(setIsLoadding(false));
                dispatch(setSuccessOrError('error'));
                console.log(error.response.data);
            };
        };

        if (data.google.trim() !== '') {
            const body = {
                name: 'google',
                investment: data.google,
                day: actualDay
            };
            try {
                dispatch(setIsLoadding(true));
                await axios.post(`https://api-dacartelecom.herokuapp.com/api/v1/investments/create/${sectionSelect.campaignId}/${sectionSelect.id}`,body,getConfig());
                dispatch(setIsLoadding(false));
                success = false;
                dispatch(setSuccessOrError('success'));
            } catch (error) {
                dispatch(setIsLoadding(true));
                dispatch(setSuccessOrError('error'));
                console.log(error.response.data);
            };
        };

        if (success) {
            if (date.endDate) {
                dispatch(getInvestments(date.startDate,sectionSelect.id,date.endDate));
            } else {
                dispatch(getInvestments(date.startDate,sectionSelect.id));
            };
        };
        
        setTimeout(() => {
            dispatch(setSuccessOrError(''));
        }, 1500);

        reset(defaultValues);
    };

    return (
        <div>
            <div className="modal fade" id="investments" aria-hidden="true" aria-labelledby="investmentsLabel" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="investmentsLabel">Inversiones</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={ handleSubmit(submit) }>
                            <div className="modal-body investments-modal">
                                <div className='mb-3 row'>
                                    <div className='col-1'></div>
                                    <div className='col-3'>
                                        <label htmlFor='investment' className="form-label">Inversion</label>
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-4'>
                                        <input type='number' step='any' className='form-control' id='investment' {...register('investments')}/>
                                    </div>
                                    <div className='col-1'></div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col-1'></div>
                                    <div className='col-3'>
                                        <label htmlFor='lead' className="form-label">Lead</label>
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-4'>
                                        <input type='number' step='any' className='form-control' id='lead' {...register('lead')}/>
                                    </div>
                                    <div className='col-1'></div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col-1'></div>
                                    <div className='col-3'>
                                        <label htmlFor='google' className="form-label">Google</label>
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-4'>
                                        <input type='number' step='any' className='form-control' id='google' {...register('google')}/>
                                    </div>
                                    <div className='col-1'></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='investments-container'>
                <div className='investments-title'>
                    <h4>Inversiones</h4>
                    {
                        role !== 'contador' && role !== 'supervisor' ?
                            <div>
                                <a data-bs-toggle="modal" href="#investments" role="button">
                                    <ion-icon name="pencil"></ion-icon>
                                </a>
                            </div>
                        :
                            <></>
                    }
                </div>
                <div className='investments-body'>
                    <div>
                        <p>Inversion: ${inversion.toFixed(2)}</p>
                        <p>Lead: ${lead.toFixed(2)}</p>
                        <p>Google: ${google.toFixed(2)}</p>
                    </div>
                    <div>
                        <p>CPL: { isNaN(inversion/lead) ? '0.00' : (inversion/lead).toFixed(2) }</p>
                        <p>CPA: { isNaN(inversion/total) ? '0.00' : (inversion/total).toFixed(2) }</p>
                        <p>Venta: { isNaN(total/lead) ? '0.00' : (total/lead).toFixed(2) }%</p>
                        <p>WEB: { isNaN(lead/google) ? '0.00' : (lead/google).toFixed(2) }%</p>
                    </div>
                </div>
                <div className='investments-title'>
                    <div></div>
                    <div>
                        <p>Actualizado: { updatedAt ? updatedAt : '00:00:00' }</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investments;