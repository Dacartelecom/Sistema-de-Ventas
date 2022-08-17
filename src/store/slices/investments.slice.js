import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getConfig from '../../utils/getConfig';

export const investmentsSlice = createSlice({
    name: 'investments',
    initialState: [],
    reducers: {
        setInvestments: (state,action)=>action.payload
    }
})

export const { setInvestments } = investmentsSlice.actions;

export const getInvestments = (start,section,end) =>async (dispatch) => {
    const navigate = useNavigate();
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            if (end) {
                if (localStorage.getItem('section')) {
                    const res = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/investments/get/querys?startDate=${start}&finishDate=${end}&sectionId=${localStorage.getItem('section')}`,getConfig());
                    dispatch(setInvestments(res.data.investments));
                } else {
                    const res = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/investments/get/querys?startDate=${start}&finishDate=${end}&sectionId=${section}`,getConfig());
                    dispatch(setInvestments(res.data.investments));
                };
            } else {
                if (localStorage.getItem('section')) {
                    const res = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/investments/get/querys?startDate=${start}&sectionId=${localStorage.getItem('section')}`,getConfig());
                    dispatch(setInvestments(res.data.investments));
                } else {
                    const res = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/investments/get/querys?startDate=${start}&sectionId=${section}`,getConfig());
                    dispatch(setInvestments(res.data.investments));
                };
            };
        } catch (error) {
            dispatch(setInvestments([]));
            console.log(error.response.data);
            if (error.response.data.message === 'jwt expired') {
                navigate("/")
            };
        };
    };
};

export default investmentsSlice.reducer;
