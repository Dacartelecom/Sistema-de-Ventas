import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const advisersSlice = createSlice({
    name: 'advisers',
    initialState: [],
    reducers: {
        setAdvisers: (state,action)=>action.payload
    }
})

export const { setAdvisers } = advisersSlice.actions;

export const getAdvisers = (section) =>async (dispatch) => {
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            if (localStorage.getItem('section')) {
                if (localStorage.getItem('role') !== 'asesor') {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=5&sectionId=${localStorage.getItem('section')}`,getConfig());
                    dispatch(setAdvisers(res.data.users));
                } else {
                    const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/${localStorage.getItem('id')}`,getConfig());
                    dispatch(setAdvisers([res.data.user]));
                };
            } else {
                const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/users/get/querys?roleId=5&sectionId=${section}`,getConfig());
                dispatch(setAdvisers(res.data.users));
            }
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export default advisersSlice.reducer;
