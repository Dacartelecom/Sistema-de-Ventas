import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getConfig from '../../utils/getConfig';

export const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: [],
    reducers: {
        setCampaigns: (state,action)=>{
            return action.payload
        },
    }
});

export const { setCampaigns } = campaignsSlice.actions;

export const getCampaigns = () =>async (dispatch) => {
    const navigate = useNavigate();
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            if (localStorage.getItem('campaign')) {
                const res = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/campaigns/${localStorage.getItem('campaign')}`,getConfig());
                dispatch(setCampaigns([res.data.campaign]));
            } else {
                const res = await axios.get("https://sistema-de-ventas-api.herokuapp.com/api/v1/campaigns",getConfig());
                dispatch(setCampaigns(res.data.data));
            };
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'jwt expired') {
                navigate("/")
            };
        };
    };
};

export default campaignsSlice.reducer;
