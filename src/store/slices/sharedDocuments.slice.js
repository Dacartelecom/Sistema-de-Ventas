import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import getConfig from '../../utils/getConfig';

export const sharedDocumentsSlice = createSlice({
    name: 'sharedDocuments',
    initialState: [],
    reducers: {
        setSharedDocuments: (state,action)=>action.payload
    }
})

export const { setSharedDocuments } = sharedDocumentsSlice.actions;

export const getSharedDocuments = () =>async (dispatch) => {
    // const navigate = useNavigate();
    let proob = getConfig()
    if (proob.headers.Authorization !== "Bearer null") {
        try {
            const res = await axios.get(`https://sistema-de-ventas-api.herokuapp.com/api/v1/files/get/permission`,getConfig());
            dispatch(setSharedDocuments(res.data.data));
        } catch (error) {
            console.log(error.response.data);
            // if (error.response.data.message === 'jwt expired') {
            //     navigate("/")
            // };
        };
    };
};

export default sharedDocumentsSlice.reducer;
