import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
interface NotificationState {
  loading: boolean;
  notificationData: any[];
}

const initialState: NotificationState = {
  loading: false,
  notificationData: [],
};

// Create the notificationSlice using createSlice
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationData: (state, action: PayloadAction<any[]>) => {
      state.notificationData = action.payload;
    },
  },
});

// Export the actions and the reducer from the notificationSlice
export const {setNotificationData} = notificationSlice.actions;

export default notificationSlice.reducer;
