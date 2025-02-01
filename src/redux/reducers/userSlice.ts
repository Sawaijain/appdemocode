import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
interface UserState {
  imagePath: string;
  kycUploadedDetails: any;
  kycDetails: any;
}

const initialState: UserState = {
  imagePath: '',
  kycUploadedDetails: {},
  kycDetails: {},
};

// Create the userSlice using createSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getImageDocument: (state, action: PayloadAction<string>) => {
      state.imagePath = action.payload;
    },
    setKycUploadedDetails: (state, action: PayloadAction<any>) => {
      state.kycUploadedDetails = action.payload;
    },
    setKycDetails: (state, action: PayloadAction<any>) => {
      state.kycDetails = action.payload;
    },
  },
});

// Export the actions and the reducer from the userSlice
export const {getImageDocument, setKycUploadedDetails, setKycDetails} =
  userSlice.actions;

export default userSlice.reducer;
