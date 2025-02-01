import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
interface LoadState {
  loading: boolean;
  loadsData: any[];
  requestedLoads: any[];
  tempRequestedLoads: any[];
  dispatchDetails: any;
  calculationData: any;
  paymentLods: any[];
  locationLoads: any[];
  loadDataWithStatus: any;
  profileBasedLoads: any[];
}

const initialState: LoadState = {
  loading: false,
  loadsData: [],
  requestedLoads: [],
  tempRequestedLoads: [],
  dispatchDetails: null,
  calculationData: null,
  paymentLods: [],
  locationLoads: [],
  loadDataWithStatus: null,
  profileBasedLoads: [],
};

// Create the loadSlice using createSlice
const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    carrierLoading: (state) => {
      state.loading = true;
    },
    getLoadList: (state, action: PayloadAction<any[]>) => {
      state.loadsData = action.payload;
    },
    getLoadListRequested: (state, action: PayloadAction<any[]>) => {
      state.requestedLoads = action.payload;
    },
    getLoadDispatchDetails: (state, action: any) => {
      state.dispatchDetails = action.payload;
    },
    getTempRequestedLoads: (state, action: PayloadAction<any[]>) => {
      state.tempRequestedLoads = action.payload;
    },
    getLoadDispatchCalculation: (state, action: any) => {
      state.calculationData = action.payload;
    },
    getPaymentLoadList: (state, action: PayloadAction<any[]>) => {
      state.paymentLods = action.payload;
    },
    setLocationLoad: (state, action: PayloadAction<any[]>) => {
      state.locationLoads = action.payload;
    },
    setLoadWithStatus: (state, action: PayloadAction<any>) => {
      state.loadDataWithStatus = action.payload;
    },
    setProfileBasedPreferdLoads: (state, action: PayloadAction<any[]>) => {
      state.profileBasedLoads = action.payload;
    },
  },
});

// Export the actions and the reducer from the loadSlice
export const {
  carrierLoading,
  getLoadList,
  getLoadListRequested,
  getLoadDispatchDetails,
  getTempRequestedLoads,
  getLoadDispatchCalculation,
  getPaymentLoadList,
  setLocationLoad,
  setLoadWithStatus,
  setProfileBasedPreferdLoads,
} = loadSlice.actions;

export default loadSlice.reducer;
