import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: 0,
    reducers: {
        setPagination: (state,action)=>action.payload
    }
})

export const { setPagination } = paginationSlice.actions;

//mejorar codigo
// export const resetPagination = () => (dispatch) => {
//     setPagination(0);
// };

export default paginationSlice.reducer;
