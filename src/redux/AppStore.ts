import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import authSlice from './reducers/authSlice';
import loadingSlice from './reducers/loadingSlice';
import loadSlice from './reducers/loadSlice';
import notificationSlice from './reducers/notificationSlice';
import truckSlice from './reducers/truckSlice';
import userSlice from './reducers/userSlice';
import agLoadsSlice from './reducers/agLoadSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import driverSlice from './reducers/driverSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  auth: authSlice,
  loading: loadingSlice,
  load: loadSlice,
  notification: notificationSlice,
  truck: truckSlice,
  user: userSlice,
  agLoad: agLoadsSlice,
  driver: driverSlice,
});
const reducerProxy = (state: any, action: AnyAction) => {
  if (action.type === 'LOGOUT') {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, reducerProxy);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    return middlewares;
  },
});

// Setup Store persistence
const persistor = persistStore(store, null);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const appDispatch: AppDispatch = store.dispatch;

export {store, persistor};
