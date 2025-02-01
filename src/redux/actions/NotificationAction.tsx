import Toaster from '@/libs/toasterService';
import Config from 'react-native-config';
import instance from '../api';
import AxiosErrorService from '@/service/AxiosError.service';
import {showAlert} from '@/components/Alert';
import {appDispatch} from '../AppStore';
import {setNotificationData} from '../reducers/notificationSlice';

const getNotification = async (id: string) => {
  try {
    const URL = `${Config.BASEURL}carrier/getCarrierNotifications?carrier_id=${id}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200 && data && data?.length > 0) {
      appDispatch(setNotificationData(data));
    } else {
      appDispatch(setNotificationData([]));
    }
  } catch (error: any) {
    appDispatch(setNotificationData([]));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const changeNotificationStatus = async (
  _data: any,
  callback: (success: boolean, message?: string) => void,
) => {
  try {
    const URL = `${Config.BASEURL}carrier/markCarrierNotificationAsRead`;
    const {data, status}: any = await instance.put(URL, _data);
    if (status == 200) {
      callback(true);
    } else {
      callback(true, data.message);
    }
  } catch (error: any) {
    callback(false);
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const clearAllNotification = async (
  _data: any,
  callback: (success: boolean, message?: string) => void,
) => {
  try {
    const URL = `${Config.BASEURL}carrier/markCarrierAllNotificationAsRead`;
    const {data, status}: any = await instance.put(URL, _data);
    if (status == 200) {
      callback(true);
    } else {
      callback(true, data.message);
    }
  } catch (error: any) {
    callback(false);
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const updateNotificationId = async (_data: any) => {
  try {
    const URL = `${Config.BASEURL}carrier/updateNotificationId`;
    const {data, status}: any = await instance.put(URL, _data);
    if (status == 200) {
      Toaster.show(data.message);
    } else {
      Toaster.show(data.message);
    }
  } catch (error: any) {
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};

export {
  getNotification,
  changeNotificationStatus,
  clearAllNotification,
  updateNotificationId,
};
