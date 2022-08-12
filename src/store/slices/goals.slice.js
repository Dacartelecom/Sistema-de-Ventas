import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const goalsSlice = createSlice({
    name: 'goal',
    initialState: [],
    reducers: {
        setGoals: (state,action)=>action.payload
    }
})

export const { setGoals } = goalsSlice.actions;

export const getGoals= (start,section,end) =>async (dispatch) => {
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            if (end) {
                if (localStorage.getItem('section')) {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${start}&finishDate=${end}&sectionId=${localStorage.getItem('section')}`,getConfig());
                    dispatch(setGoals(res.data.goals));
                } else {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${start}&finishDate=${end}&sectionId=${section}`,getConfig());
                    dispatch(setGoals(res.data.goals));
                };
            } else {
                if (localStorage.getItem('section')) {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${start}&sectionId=${localStorage.getItem('section')}`,getConfig());
                    dispatch(setGoals(res.data.goals));
                } else {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/goals/get/querys?startDate=${start}&sectionId=${section}`,getConfig());
                    dispatch(setGoals(res.data.goals));
                };
            };
        } catch (error) {
            dispatch(setGoals([]));
            console.log(error.response.data);
        };
    };
};

export default goalsSlice.reducer;
