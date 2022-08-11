import { createSlice } from '@reduxjs/toolkit';
//import axios from 'axios';
//import getConfig from '../../utils/getConfig';

export const documentsSlice = createSlice({
    name: 'documents',
    initialState: [],
    reducers: {
        setDocuments: (state,action)=>action.payload
    }
})

export const { setDocuments } = documentsSlice.actions;

//mejorar codigo
// export const getDocuments = () => (dispatch) => {
//     let proob = getConfig()
//     if (proob.headers.Authorization !== "Bearer null") {
//         const getDocs =async ()=>{
//             try {
//                 const res = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/files?offSet=0&limit=10`,getConfig());
//                 dispatch(setDocuments(res.data.data));
//             } catch (error) {
//                 console.log(error.response.data);
//             };
//         };

//         getDocs();
//     };
// };

export default documentsSlice.reducer;
