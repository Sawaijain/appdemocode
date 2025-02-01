import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DriverDataState {
  driverLoads: any[];
  driverCompletedLoads: any[];
}

const initialState: DriverDataState = {
  driverLoads: [],
  driverCompletedLoads: [],
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDriverLoads: (state, action: PayloadAction<any[]>) => {
      state.driverLoads = action.payload;
    },
    setDriverCompletedLoad: (state, action: PayloadAction<any[]>) => {
      state.driverCompletedLoads = action.payload;
    },
  },
});

export const {setDriverLoads, setDriverCompletedLoad} = driverSlice.actions;

export default driverSlice.reducer;
