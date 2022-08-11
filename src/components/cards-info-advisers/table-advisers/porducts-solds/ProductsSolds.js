import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../../../../utils/getConfig';
import { useSelector } from 'react-redux';

const ProductsSolds = ({product,adviser}) => {

    const date = useSelector(state=>state.date);
    const [solds,setSolds] = useState([]);
    let total = 0;


    useEffect(()=>{
        if (!date.endDate) {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&productId=${product?.id}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    console.log(error.response.data);
                }
            }
    
            getSolds();
            
        } else {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&productId=${product?.id}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    console.log(error.response.data);
                }
            }
    
            getSolds();
        }
    },[adviser,date,product]);

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