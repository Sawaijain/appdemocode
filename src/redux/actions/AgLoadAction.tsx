import Config from 'react-native-config';
import {appDispatch} from '../AppStore';
import {carrierLoading} from '../reducers/loadingSlice';
import instance from '../api';
import AxiosErrorService from '@/service/AxiosError.service';
import {showAlert} from '@/components/Alert';
import {setOrderLoad, setRequestedLaneLoad} from '../reducers/agLoadSlice';

export const getRequestLanesLoad = async (id: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}load/getRequestedLane?carrier_id=${id}`;
    const {data}: any = await instance.get(URL);
    if (data && data?.type == 'success') {
      appDispatch(setRequestedLaneLoad(data?.data));
    } else {
      appDispatch(setRequestedLaneLoad([]));
    }
    appDispatch(carrierLoading(false));
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  } finally {
    appDispatch(carrierLoading(false));
  }
};

export const getOrderedLoad = async (id: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}load/getCarrierAssignedLoadPost?carrier_id=${id}`;
    console.log(URL);
    const {data}: any = await instance.get(URL);
    if (data && data?.type == 'success') {
      appDispatch(setOrderLoad(data?.data));
    } else {
      appDispatch(setOrderLoad([]));
    }
    appDispatch(carrierLoading(false));
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  } finally {
    appDispatch(carrierLoading(false));
  }
};
