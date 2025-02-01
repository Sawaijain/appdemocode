import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
interface IAgLoadsState {
  requestedLaneLoads: any[];
  orderedLoads: any[];
}

const initialState: IAgLoadsState = {
  requestedLaneLoads: [],
  orderedLoads: [],
};

const agLoadsSlice = createSlice({
  name: 'agload',
  initialState,
  reducers: {
    setRequestedLaneLoad: (state, action: PayloadAction<any[]>) => {
      state.requestedLaneLoads = action.payload;
    },
    setOrderLoad: (state, action: PayloadAction<any[]>) => {
      state.orderedLoads = action.payload;
    },
  },
});

export const {setRequestedLaneLoad, setOrderLoad} = agLoadsSlice.actions;

export default agLoadsSlice.reducer;
