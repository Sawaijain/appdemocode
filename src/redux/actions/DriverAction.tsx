import {showAlert} from '@/components/Alert';
import AxiosErrorService from '@/service/AxiosError.service';
import Config from 'react-native-config';
import {appDispatch} from '../AppStore';
import instance from '../api';
import {carrierLoading} from '../reducers/loadingSlice';
import {setDriverCompletedLoad, setDriverLoads} from '../reducers/driverSlice';

export const getDriverLoads = async (mobNo: string) => {
  try {
    appDispatch(carrierLoading(true));
    const _url = `${Config.BASERRLACCOUNT}driver/getActiveLoad?mobile=${mobNo}`;
    console.log(_url);
    const {data, status}: any = await instance.get(_url);
    if (status == 200) {
      if (data) {
        appDispatch(setDriverLoads(data?.data));
      }
      appDispatch(carrierLoading(false));
    } else {
    }
    appDispatch(carrierLoading(false));
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    appDispatch(setDriverLoads([]));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};

export const getDriverCompletedLoads = async (mobNo: string) => {
  try {
    appDispatch(carrierLoading(true));
    const _url = `${Config.BASERRLACCOUNT}driver/getCompleteLoad?mobile=${mobNo}`;
    const {data, status}: any = await instance.get(_url);
    if (status == 200) {
      if (data && data?.data) {
        appDispatch(setDriverCompletedLoad(data?.data));
      }
      appDispatch(carrierLoading(false));
    } else {
    }
    appDispatch(carrierLoading(false));
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    appDispatch(setDriverCompletedLoad([]));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
