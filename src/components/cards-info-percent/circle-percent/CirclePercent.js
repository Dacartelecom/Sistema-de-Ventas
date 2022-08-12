import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useRef } from 'react';
import { useSelector } from 'react-redux';
import getConfig from '../../../utils/getConfig';
//import { io } from 'socket.io-client';

const CirclePercent = ({radio,color,percent = 0,size = 1,product,goal}) => {
    let total = 0;
    let newPercent = 0;

    const date = useSelector(state=>state.date);
    const advisers = useSelector(state=>state.advisers);
    const [solds,setSolds] = useState([]);

    //web sockets
    // const socket = useRef();

    // useEffect(()=>{
    //     socket.current = io('ws:https://server-io-dacartelecom.herokuapp.com/');
    // },[]);

    useEffect(()=>{
        if (product) {
            if (localStorage.getItem('role') !== 'asesor') {
                if (!date.endDate) {
                    const getData = async ()=>{
                        try {
                            const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&productId=${product.id}`,getConfig());
                            setSolds(data.data.sales);
                        } catch (error) {
                            setSolds([]);
                            console.log(error.response.data);
                        }
                    }
        
                    getData();
                } else {
                    const getData = async ()=>{
                        try {
                            const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&productId=${product.id}`,getConfig());
                            setSolds(data.data.sales);
                        } catch (error) {
                            setSolds([]);
                            console.log(error.response.data);
                        }
                    }
        
                    getData();
                };
            } else {
                if (!date.endDate) {
                    const getData = async ()=>{
                        try {
                            const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&userId=${advisers[0]?.id}&productId=${product.id}`,getConfig());
                            setSolds(data.data.sales);
                        } catch (error) {
                            setSolds([]);
                            console.log(error.response.data);
                        }
                    }
        
                    getData();
                } else {
                    const getData = async ()=>{
                        try {
                            const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&userId=${advisers[0]?.id}&productId=${product.id}`,getConfig());
                            setSolds(data.data.sales);
                        } catch (error) {
                            setSolds([]);
                            console.log(error.response.data);
                        }
                    }
        
                    getData();
                };
            };
        };
    },[product,date,advisers]);

    // useEffect(()=>{

    //     socket.current.on('newSaleProduct', prodct=>{
    //         if (product?.id === parseInt(prodct)) { 
    //             if (localStorage.getItem('role') !== 'asesor') {
    //                 if (!date.endDate) {
    //                     const getData = async ()=>{
    //                         try {
    //                             const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&productId=${product.id}`,getConfig());
    //                             setSolds(data.data.sales);
    //                         } catch (error) {
    //                             setSolds([]);
    //                             console.log(error.response.data);
    //                         }
    //                     }
            
    //                     getData();
    //                 } else {
    //                     const getData = async ()=>{
    //                         try {
    //                             const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&productId=${product.id}`,getConfig());
    //                             setSolds(data.data.sales);
    //                         } catch (error) {
    //                             setSolds([]);
    //                             console.log(error.response.data);
    //                         }
    //                     }
            
    //                     getData();
    //                 };
    //             } else {
    //                 if (!date.endDate) {
    //                     const getData = async ()=>{
    //                         try {
    //                             const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&userId=${advisers[0]?.id}&productId=${product.id}`,getConfig());
    //                             setSolds(data.data.sales);
    //                         } catch (error) {
    //                             setSolds([]);
    //                             console.log(error.response.data);
    //                         }
    //                     }
            
    //                     getData();
    //                 } else {
    //                     const getData = async ()=>{
    //                         try {
    //                             const data = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&userId=${advisers[0]?.id}&productId=${product.id}`,getConfig());
    //                             setSolds(data.data.sales);
    //                         } catch (error) {
    //                             setSolds([]);
    //                             console.log(error.response.data);
    //                         }
    //                     }
            
    //                     getData();
    //                 };
    //             };
    //         };
    //     });

    // },[advisers,date,product?.id]);

    if (solds.length) {
        solds.map(sold=>{
            total += sold.sold;
            return newPercent = ((total/goal)*100).toFixed(2);
        });
    };

    if (percent) {
        newPercent = percent;
    };

    return (
        <div className='circle-percent'>
            <div className="cicle-percent__container">
                <div className="circle-percent__card">
                    <div className="box">
                        <div className="percent" id="measurer-sup" style={{
                            background: color,
                            width:`${Math.round(radio*2.14)}px`,
                            height:`${Math.round(radio*2.14)}px`
                        }}>
                            <svg style={{
                                width:`${Math.round(radio*2.17)}px`,
                                height:`${Math.round(radio*2.17)}px`
                            }}>
                                <circle cx={radio} cy={radio} r={radio} style={{
                                    strokeWidth: Math.round(radio*0.14),
                                    transform: `translate(${Math.round(radio*0.07)}px,${Math.round(radio*0.07)}px)`,
                                }}></circle>
                                <circle cx={radio} cy={radio} r={radio} style={{
                                    strokeWidth: Math.round(radio*0.14),
                                    transform: `translate(${Math.round(radio*0.07)}px,${Math.round(radio*0.07)}px)`,
                                    strokeDasharray: Math.round(radio*6.3),
                                    strokeDashoffset: Math.round(radio*6.3) - (Math.round(radio*6.3) * parseInt(newPercent)) / 100,
                                    stroke: color
                                    }}></circle>
                            </svg>
                            <div className="number">
                                <h2 style={{fontSize:`${size}em`}}>{ percent ? percent : newPercent }<span>%</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CirclePercent;