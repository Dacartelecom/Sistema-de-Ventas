import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getConfig from '../../../../utils/getConfig';

const Products = ({product,id,dayTime}) => {

    const [sale,setSale] = useState(0);
    const [saleId,setSaleId] = useState(0);

    useEffect(()=>{
        if (product) {
            const getSold =async ()=>{
                try {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${dayTime}&userId=${id}&productId=${product?.id}`,getConfig());
                    setSale(res.data.sales[0].sold);
                    setSaleId(res.data.sales[0].id);
                } catch (error) {
                    console.log(error.response.data);
                }
            };

            getSold();
        }
    },[dayTime,id,product]);

    return (
        <div className='row'>
            <div className='col-1'></div>
            <div className='col-4'>
                <label htmlFor={`product-${product?.id}`} className="form-label">{product?.name}</label>
            </div>
            <div className='col-5'>
                <input type="number" className="form-control" id={saleId} value={sale} onChange={e=>setSale(e.target.value)}/>
            </div>
        </div>
    );
};

export default Products;