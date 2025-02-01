import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
interface TruckState {
  loading: boolean;
  truckData: any[];
  truckCount: number;
  inventory: any[];
  truckList: any[];
}

const initialState: TruckState = {
  loading: false,
  truckData: [],
  truckCount: 0,
  inventory: [],
  truckList: [],
};

// Create the truckSlice using createSlice
const truckSlice = createSlice({
  name: 'truck',
  initialState,
  reducers: {
    setTruckList: (state, action: PayloadAction<any[]>) => {
      state.truckData = action.payload;
    },
    setInventory: (state, action: PayloadAction<any[]>) => {
      state.inventory = action.payload;
    },
    getTruckCount: (state, action: PayloadAction<number>) => {
      state.truckCount = action.payload;
    },
    setAllTrucks: (state, action: PayloadAction<any[]>) => {
      state.truckList = action.payload;
    },
  },
});

// Export the actions and the reducer from the truckSlice
export const {setTruckList, getTruckCount, setInventory, setAllTrucks} =
  truckSlice.actions;

export default truckSlice.reducer;
