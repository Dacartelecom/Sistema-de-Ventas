import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state,action)=>action.payload
    }
})

export const { setProducts } = productsSlice.actions;

export const getProducts = (section) =>async (dispatch) => {
    try {
        if (localStorage.getItem('section')) {
            const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/products/get/querys?sectionId=${localStorage.getItem('section')}`,getConfig());
            dispatch(setProducts(res.data.products));
        } else {
            const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/products/get/querys?sectionId=${section}`,getConfig());
            dispatch(setProducts(res.data.products));
        };
    } catch (error) {
        console.log(error.response.data);
    };
};

export default productsSlice.reducer;
