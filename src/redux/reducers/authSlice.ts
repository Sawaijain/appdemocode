import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
interface AuthState {
  fullname: string;
  email: string;
  message: string;
  mobile_number: string;
  error: string;
  token: string;
  loggedIn: boolean;
  userDetails: any;
  userType: string;
  kycDetails: any;
  rcDetails: any;
  panDetails: any;
  cities: any[];
  isFromRegister: boolean;
}

const initialState: AuthState = {
  fullname: '',
  email: '',
  message: '',
  mobile_number: '',
  error: '',
  token: '',
  loggedIn: false,
  userDetails: {},
  userType: '',
  kycDetails: {},
  rcDetails: {},
  panDetails: {},
  cities: [],
  isFromRegister: false,
};

// Create the authSlice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserMobileNumber: (state, action: PayloadAction<string>) => {
      state.mobile_number = action.payload;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.loggedIn = true;
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addUserProfile: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    getPanDetail: (state, action: PayloadAction<any>) => {
      state.panDetails = action.payload;
    },
    getRcDetail: (state, action: PayloadAction<any>) => {
      state.rcDetails = action.payload;
    },
    getUserKycDetails: (state, action: PayloadAction<any>) => {
      state.kycDetails = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<{token: string}>) => {
      state.token = action.payload.token || '';
      state.loggedIn = true;
    },
    setNavigateFrom: (state, action: PayloadAction<boolean>) => {
      state.isFromRegister = action.payload;
    },
    setCities: (state, action: PayloadAction<any[]>) => {
      state.cities = action.payload || [];
    },
    setClearState: (state) => {
      state = initialState;
      state.loggedIn = false;
      state.token = '';
    },
    logout: () => initialState,
  },
});

// Export the actions and the reducer from the authSlice
export const {
  setUserMobileNumber,
  loginFail,
  loginSuccess,
  registerFail,
  addUserProfile,
  getPanDetail,
  getRcDetail,
  getUserKycDetails,
  registerSuccess,
  logout,
  setCities,
  setNavigateFrom,
  setClearState,
} = authSlice.actions;

export default authSlice.reducer;
