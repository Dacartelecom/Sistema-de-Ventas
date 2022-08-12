import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const soldsSlice = createSlice({
    name: 'solds',
    initialState: [],
    reducers: {
        setSolds: (state,action)=>action.payload
    }
})

export const { setSolds } = soldsSlice.actions;

export const getSolds = (start,section,end) =>async (dispatch) => {
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            if (end) {
                if (localStorage.getItem('section')) {
                    if (localStorage.getItem('role') !== 'asesor') {
                        const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&finishDate=${end}&sectionId=${localStorage.getItem('section')}`,getConfig());
                        dispatch(setSolds(res.data.sales));
                    } else {
                        const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&finishDate=${end}&userId=${localStorage.getItem('id')}`,getConfig());
                        dispatch(setSolds(res.data.sales));
                    };
                } else {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&finishDate=${end}&sectionId=${section}`,getConfig());
                    dispatch(setSolds(res.data.sales));
                };
            } else {
                if (localStorage.getItem('section')) {
                    if (localStorage.getItem('role') !== 'asesor') {
                        const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&sectionId=${localStorage.getItem('section')}`,getConfig());
                        dispatch(setSolds(res.data.sales));
                    } else {
                        const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&userId=${localStorage.getItem('id')}`,getConfig());
                        dispatch(setSolds(res.data.sales));
                    };
                } else {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${start}&sectionId=${section}`,getConfig());
                    dispatch(setSolds(res.data.sales));
                };
            };
        } catch (error) {
            dispatch(setSolds([]));
            console.log(error.response.data);
        };
    };
};

export default soldsSlice.reducer;
