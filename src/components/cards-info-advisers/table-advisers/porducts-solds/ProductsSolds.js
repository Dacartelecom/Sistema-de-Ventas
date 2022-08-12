import React, { useEffect, useState } from 'react';
//import { useRef } from 'react';
import axios from 'axios';
import getConfig from '../../../../utils/getConfig';
import { useSelector } from 'react-redux';
//import { io } from 'socket.io-client';

const ProductsSolds = ({product,adviser}) => {

    const date = useSelector(state=>state.date);
    const [solds,setSolds] = useState([]);
    let total = 0;

    //sockets
    // const socket = useRef();

    // useEffect(()=>{
    //     socket.current = io('ws:https://server-io-dacartelecom.herokuapp.com/');
    // },[]);

    useEffect(()=>{
        if (!date.endDate) {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&productId=${product?.id}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    setSolds([]);
                    console.log(error.response.data);
                };
            };
    
            getSolds();
            
        } else {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&productId=${product?.id}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    setSolds([]);
                    console.log(error.response.data);
                };
            };
    
            getSolds();
        };
    },[adviser,date,product]);

    // useEffect(()=>{
    //     socket.current.on('newSaleUser', (id)=>{
    //         if (adviser?.id === parseInt(id)) {
    //             if (!date.endDate) {
    //                 const getSolds = async ()=>{
    //                     try {
    //                         const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&productId=${product?.id}&userId=${adviser?.id}`,getConfig());
    //                         setSolds(data.data.sales);
    //                     } catch (error) {
    //                         setSolds([]);
    //                         console.log(error.response.data);
    //                     };
    //                 };
            
    //                 getSolds();
                    
    //             } else {
    //                 const getSolds = async ()=>{
    //                     try {
    //                         const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&productId=${product?.id}&userId=${adviser?.id}`,getConfig());
    //                         setSolds(data.data.sales);
    //                     } catch (error) {
    //                         setSolds([]);
    //                         console.log(error.response.data);
    //                     };
    //                 };
            
    //                 getSolds();
    //             };
    //         };
    //     });
    // },[adviser?.id,date,product?.id]);

    solds?.map(sold=>{
        return total = total + sold?.sold
    });

    return (
        <div key={product?.id}>
            <p>{ adviser ? total : product?.name }</p>
        </div>
    );
};

export default ProductsSolds;