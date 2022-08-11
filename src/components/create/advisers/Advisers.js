import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccessOrError } from '../../../store/slices/successOrError.slice';
import getConfig from '../../../utils/getConfig';
import Products from './products/Products';

const Advisers = ({adviser,products,hour,date}) => {

    const [hora,setHora] = useState(`${hour}:00`);
    const [day,setDay] = useState(date);
    const dispatch = useDispatch();

    const updateSold =async (id,body)=>{
        try {
            await axios.patch(`https://api-dacartelecom.herokuapp.com/api/v1/solds/update/${id}`,body,getConfig());
            dispatch(setSuccessOrError('success'));
        } catch (error) {
            console.log(error.response.data);
            dispatch(setSuccessOrError('error'));
        };
        
        setTimeout(() => {
            dispatch(setSuccessOrError(''));
        }, 1500);
    };

    const update = e=>{
        e.preventDefault();
        const inputs = e.target.childNodes[0].childNodes; 
        for (let i = 2; i < inputs.length; i++) {
            const body = {
                sold: inputs[i].childNodes[2].childNodes[0].value
            };

            if (inputs[i].childNodes[2].childNodes[0].id) {
                updateSold(inputs[i].childNodes[2].childNodes[0].id,body);
            };
        };
    };

    return (
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
                            <form id={adviser?.id} onSubmit={e=>update(e)}>
                                <div className="mb-3">
                                    <div className='row'>
                                        <div className='col-1'></div>
                                        <div className='col-4'>
                                            <label className='form-label'>Día</label>
                                        </div>
                                        <div className='col-5'>
                                            <input type='date' value={day} className='form-control' onChange={e=>setDay(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-1'></div>
                                        <div className='col-4'>
                                            <label className='form-label'>Hora</label>
                                        </div>
                                        <div className='col-5'>
                                            <input type='time' value={hora} className='form-control' onChange={e=>setHora(e.target.value)}/>
                                        </div>
                                    </div>
                                    {
                                        products?.map(product=>(
                                            <Products product={product} id={adviser?.id} dayTime={`${day} ${hora}`}/>
                                        ))
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advisers;