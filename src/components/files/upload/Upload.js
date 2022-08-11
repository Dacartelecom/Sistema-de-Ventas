import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setDocuments } from '../../../store/slices/documents.slice';
import { setIsLoadding } from '../../../store/slices/isLoadding.slice';
import { setSuccessOrError } from '../../../store/slices/successOrError.slice';
import getConfig from '../../../utils/getConfig';

const Upload = () => {

    const [badName,setBadName] = useState(false);
    const [badFile,setBadFile] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const defaultValues = {
        file: '',
        fileName: ''
    }
    const pagination = useSelector(state=>state.pagination);
    const dispatch = useDispatch();

    const uploadFile =async (body)=>{
        try {
            dispatch(setIsLoadding(true));
            await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/files/create',body,getConfig());
            dispatch(setIsLoadding(false));
            dispatch(setSuccessOrError('success'));
            const documents = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/files?offSet=${pagination}&limit=10`,getConfig());
            dispatch(setDocuments(documents.data.data));
            reset(defaultValues);
        } catch (error) {
            dispatch(setIsLoadding(false));
            console.log(error.response.data);
            dispatch(setSuccessOrError('error'));
        };
        
        setTimeout(() => {
            dispatch(setSuccessOrError(''));
        }, 1500);
    };

    const upload = data=>{
        if (data.fileName.trim() && data.file.length) {
            setBadName(false);
            setBadFile(false);
            const form = document.getElementById('form-data');
            const body = new FormData(form);
            uploadFile(body);
        };
        if (!data.fileName.trim()) {
            setBadName(true);
        } else {
            setBadName(false);
        };
        if (!data.file.length) {
            setBadFile(true);
        } else {
            setBadFile(false);
        };
    };

    return (
        <div className='upload'>
            <form className='upload-container' onSubmit={handleSubmit(upload)} id='form-data' encType='multipart/form-data'>
                <h2>Subir un Archivo</h2>
                <label htmlFor='name-file' className='form-label'>Nombre del Archivo</label>
                <input className={ !badName ? 'form-control' : 'form-control bad' } id='name-file' type='text' {...register('fileName')} name='fileName'/>
                <label htmlFor="formFileLg" class="form-label">Archivo</label>
                <input className={ !badFile ? "form-control" : "form-control bad" } id="formFileLg" type="file" {...register('file')} name='file'/>
                <div className='col-2'>
                    <button type='submit' className='btn btn-primary'>
                        <ion-icon name="cloud-upload-outline"></ion-icon>
                        Subir
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Upload;