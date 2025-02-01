import Config from 'react-native-config';
import instance from '../api';
import axios from 'axios';
import StorageInstace from '@/libs/storage/Storage';
import AxiosErrorService from '@/service/AxiosError.service';
import {showAlert} from '@/components/Alert';
import {carrierLoading} from '../reducers/loadingSlice';
import {appDispatch} from '../AppStore';
import {
  getTruckCount,
  setAllTrucks,
  setInventory,
} from '../reducers/truckSlice';
import {setProfileBasedPreferdLoads} from '../reducers/loadSlice';

const getTruckList = async (userId: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}truck/getList?user_id=${userId}`;
    const {data}: any = await instance.get(URL);
    if (data && data?.data) {
      appDispatch(carrierLoading(false));
      appDispatch(setAllTrucks(data?.data));
    } else {
      appDispatch(carrierLoading(false));
      appDispatch(setAllTrucks([]));
    }
    appDispatch(carrierLoading(false));
  } catch (error: any) {
    appDispatch(setAllTrucks([]));
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  } finally {
    appDispatch(carrierLoading(false));
  }
};
const deleteTruckList = async (
  request: any,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}truck/delete`;
    const {data, status}: any = await instance.put(URL, request);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      callback(true, data.message);
    } else {
      appDispatch(carrierLoading(false));
      callback(false, data.message);
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};

const getTrucCount = async (userId: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/getTruckCountType?user_id=${userId}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      appDispatch(getTruckCount(data.active_truck_count));
    } else {
      appDispatch(carrierLoading(false));
      appDispatch(getTruckCount(0));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};

const getProfileBasedPreferdLoads = async (userId: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}load/getProfileBasedPreferredLoads?carrier_id=${userId}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      appDispatch(setProfileBasedPreferdLoads(data?.data));
    } else {
      appDispatch(carrierLoading(false));
      appDispatch(setProfileBasedPreferdLoads([]));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({
      message: _error?.message ? `${_error?.message} profile based` : _error,
    });
  }
};
const updateTruckCount = async (
  userId: string,
  req: any,
  callback: (success: boolean, message?: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/updateTruckCountType?user_id=${userId}`;
    const {data, status}: any = await instance.post(URL, req);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      callback(true);
    } else {
      appDispatch(carrierLoading(false));
      callback(false, data.message);
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const addTrucks = async (
  request: FormData,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    const token = await StorageInstace.getItem('agrigator:token');
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}truck/add`;
    axios({
      method: 'post',
      url: URL,
      data: request,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    }).then(({data, status}) => {
      if (status == 200 && data && data.type !== 'failure') {
        callback(true, data.message);
      } else {
        appDispatch(carrierLoading(false));
        callback(false, data.message);
      }
    });
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const updateTruck = async (
  request: FormData,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    const token = await StorageInstace.getItem('agrigator:token');
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}truck/update`;
    axios({
      method: 'put',
      url: URL,
      data: request,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    }).then(({data, status}) => {
      if (status == 200 && data && data.type !== 'failure') {
        callback(true, data.message);
      } else {
        appDispatch(carrierLoading(false));
        callback(false, data.message);
      }
    });
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const updateInventoryAvailability = async (
  request: any,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    const token = await StorageInstace.getItem('agrigator:token');
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/updateInventoryAvailability`;
    axios({
      method: 'put',
      url: URL,
      data: request,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then(({data, status}) => {
      if (status == 200 && data && data.type !== 'failure') {
        callback(true, data.message);
      } else {
        appDispatch(carrierLoading(false));
        callback(false, data.message);
      }
    });
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const deleteTrucks = async (
  request: any,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/deleteMultipleInventory`;
    const {data, status}: any = await instance.put(URL, request);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      callback(true, data.message);
    } else {
      appDispatch(carrierLoading(false));
      callback(false, data.message);
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const addInventory = async (
  request: any,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}/inventory/add`;
    const {data, status}: any = await instance.post(URL, request);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      callback(true, data.message);
      getInventoryList(request?.owner_id);
    } else {
      appDispatch(carrierLoading(false));
      callback(false, data.message);
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const updateInventory = async (
  request: any,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}/inventory/update`;
    const {data, status}: any = await instance.put(URL, request);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      callback(true, data.message);
    } else {
      appDispatch(carrierLoading(false));
      callback(false, data.message);
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const deleteInventory = async (
  id: any,
  callback: (success: boolean, message: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}/inventory/delete/${id}`;
    const {data, status}: any = await instance.delete(URL);
    if (status == 200) {
      appDispatch(carrierLoading(false));
      callback(true, data.message);
    } else {
      appDispatch(carrierLoading(false));
      callback(false, data.message);
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const getInventoryList = async (userId: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}inventory/getall?owner_id=${userId}`;
    const {data, status}: any = await instance.get(URL);
    appDispatch(carrierLoading(false));
    if (status == 200 && data?.type == 'success') {
      appDispatch(setInventory(data?.data));
    } else {
      appDispatch(carrierLoading(false));
      appDispatch(setInventory([]));
    }
  } catch (error: any) {
    appDispatch(setInventory([]));
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
export {
  getTruckList,
  deleteTruckList,
  getTrucCount,
  addTrucks,
  updateTruckCount,
  deleteTrucks,
  updateTruck,
  updateInventoryAvailability,
  addInventory,
  getInventoryList,
  updateInventory,
  deleteInventory,
  getProfileBasedPreferdLoads,
};
