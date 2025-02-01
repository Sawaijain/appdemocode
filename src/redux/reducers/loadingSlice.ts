import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

// Create the loadingSlice using createSlice
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    carrierLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export the actions and the reducer from the loadingSlice
export const {carrierLoading} = loadingSlice.actions;

export default loadingSlice.reducer;
