import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../../../../utils/getConfig';
import { useSelector } from 'react-redux';

const UgiSolds = ({adviser}) => {

    const date = useSelector(state=>state.date);
    const [solds,setSolds] = useState([]);
    let ugi = 0;

    useEffect(()=>{
        if (!date.endDate) {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    console.log(error.response.data);
                }
            }
    
            getSolds();
        } else {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    console.log(error.response.data);
                }
            }
    
            getSolds();
        }
    },[adviser,date]);

    solds?.map(sold=>{
        const product = sold.product.name.split(' ');
        return ugi += sold.sold*parseInt(product[0]);
    });

    return (
        <div style={{
            background: '#02775c'
        }}>
            <p>{ adviser ? ugi : 'UGI' }</p>
        </div>
    );
};

export default UgiSolds;