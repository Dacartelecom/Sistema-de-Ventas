import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loggin } from '../store/slices/loged.slice';
import { setRole } from '../store/slices/role.slice';

const Login = () => {

    const loged = useSelector(state=>state.loged);
    const dispatch = useDispatch();
    const { register,handleSubmit } = useForm();
    const [errorUser,setErrorUser] = useState(false);
    const [errorPassword,setErrorPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if (loged) {
            if (localStorage.getItem("role") !== 'contador') {
                navigate("/home");
            } else {
                navigate("/files");
            };
        };
    },[loged,navigate]);

    const login = async data=>{
        try {
            const response = await axios.post('https://api-dacartelecom.herokuapp.com/api/v1/users/login',data);
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role",response.data.role);
            dispatch(setRole(response.data.role));
            if (response.data.campaign) {
                localStorage.setItem("campaign",response.data.campaign);
            };
            if (response.data.section) {
                localStorage.setItem("section",response.data.section);
            };
            setErrorUser(false);
            setErrorPassword(false);
            dispatch(loggin(true));
            if (response.data.role !== 'contador') {
                navigate("/home");
            } else {
                navigate("/files")
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'Invalid password') {
                setErrorUser(false);
                return setErrorPassword(true)
            }
            setErrorUser(true);
            setErrorPassword(true);
        };
    };
    return (
        <div className='login-container'>
            <div className="login-body" aria-hidden="false" aria-labelledby="modalLabel" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalLabel">Log  In</h3>
                        </div>
                        <form onSubmit={ handleSubmit(login) }>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className={ errorUser ? "form-control bad" : "form-control" } id="exampleInputEmail1" aria-describedby="emailHelp" {...register('email')}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className={ errorPassword ? "form-control bad" : "form-control" } id="exampleInputPassword1" {...register('password')}/>
                                </div>
                                {
                                    errorPassword ?
                                        <div className='margin-top'>
                                            <p className='bad-text'>Contraseña Incorrecta</p>
                                        </div>
                                    :
                                        <></>
                                }
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">LogIn</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;