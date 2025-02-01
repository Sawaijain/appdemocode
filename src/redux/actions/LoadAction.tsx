import Config from 'react-native-config';
import instance from '../api';
import moment from 'moment';
import LoggerInstance from '@/libs/Logger';
import AxiosErrorService from '@/service/AxiosError.service';
import {showAlert} from '@/components/Alert';
import {carrierLoading} from '../reducers/loadingSlice';
import {appDispatch} from '../AppStore';
import {
  getLoadDispatchCalculation,
  getLoadDispatchDetails,
  getLoadList,
  getLoadListRequested,
  getPaymentLoadList,
  getTempRequestedLoads,
  setLoadWithStatus,
  setLocationLoad,
} from '../reducers/loadSlice';
import {getQuery} from '@/libs';
import BookTruckContainer from '@/features/main/matched-loads/screen/BookTruckContainer';
import RootNavigator, {navigationRef} from '@/libs/navigation/RootNavigation';
import ActiveLoadContainer from '@/features/main/loads/ActiveLoadContainer';
import {CommonActions} from '@react-navigation/native';
import AppBottomTab from '@/navigation/AppBottomTab';
import LoadStackNavigation from '@/navigation/component/LoadStackNavigation';

const getCarrierLoads = async (id: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/activeloads?id=${id}`;
    const {data, status}: any = await instance.get(URL);

    if (status == 200) {
      if (data && data.length > 0) {
        let tempLoads = data?.sort(
          (
            a: {dispatchDate: string | number | Date},
            b: {dispatchDate: string | number | Date},
          ) =>
            new Date(b.dispatchDate).getTime() -
            new Date(a.dispatchDate).getTime(),
        );
        if (tempLoads && tempLoads.length > 0) {
          tempLoads &&
            tempLoads.forEach(
              (ele: {
                formattedDispatchDate: string;
                dispatchDate: moment.MomentInput;
              }) => {
                ele.formattedDispatchDate = moment(ele.dispatchDate).format(
                  'DD/MM/YYYY',
                );
              },
            );
        }
        appDispatch(carrierLoading(false));
        appDispatch(getLoadList(tempLoads));
      }
    } else {
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(getLoadList([]));
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const getCarrierRequestedLoads = async (id: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/requestedloads?id=${id}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200) {
      if (data && data.length > 0) {
        let tempLoads = data?.sort(
          (
            a: {dispatchDate: string | number | Date},
            b: {dispatchDate: string | number | Date},
          ) =>
            new Date(b.dispatchDate).getTime() -
            new Date(a.dispatchDate).getTime(),
        );
        if (tempLoads && tempLoads.length > 0) {
          tempLoads &&
            tempLoads.forEach(
              (ele: {
                formattedDispatchDate: string;
                dispatchDate: moment.MomentInput;
              }) => {
                ele.formattedDispatchDate = moment(ele.dispatchDate).format(
                  'DD/MM/YYYY',
                );
              },
            );
        }

        let loads = tempLoads?.filter(
          (e: {carrier_quotations: {status: string}}) =>
            e.carrier_quotations?.status === 'requested' ||
            e.carrier_quotations?.status === 'accepted' ||
            e.carrier_quotations.status === 'driver_data_updation' ||
            e.carrier_quotations.status === 'driver_data_updation_done',
        );

        appDispatch(carrierLoading(false));
        appDispatch(getTempRequestedLoads(tempLoads));
        appDispatch(getLoadListRequested(loads));
      }
    } else {
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    appDispatch(getLoadListRequested([]));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  } finally {
    appDispatch(carrierLoading(false));
  }
};
const getDispatchDetails = async (orderId: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLZOOP}shipper/viewDispatch/${orderId}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200 && data) {
      appDispatch(getLoadDispatchDetails(data?.loadPost[0]));
      appDispatch(carrierLoading(false));
    } else {
      appDispatch(getLoadDispatchDetails(undefined));
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    console.log(error);
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const getDispatchCalc = async (orderId: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLZOOP}admin/getDispachCalculation?orderId=${orderId}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200 && data) {
      appDispatch(getLoadDispatchCalculation(data.data[0]));
      appDispatch(carrierLoading(false));
    } else {
      appDispatch(getLoadDispatchCalculation(undefined));
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const doRequestForLoad = async (
  _data: any,
  callback: (success: boolean, message?: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/requestLoad`;
    const {data, status}: any = await instance.post(URL, _data);
    if (status == 200 && data) {
      callback(true, data.message);
      appDispatch(carrierLoading(false));
    } else {
      callback(false, data.message);
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const doSubmitTruck = async (
  _data: any,
  callback: (success: boolean, message?: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/updateLoadPostCarrierDetails`;
    const {data, status}: any = await instance.put(URL, _data);
    if (status == 200 && data) {
      LoggerInstance.logEvent('Truck Request', {..._data});
      callback(true, data.message);
      appDispatch(carrierLoading(false));
    } else {
      callback(false, data.message);
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};

const getCarrierPaymentLoads = async (id: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/getPaymentLoads?id=${id}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200) {
      if (data) {
        const {loadPosts} = data;
        let tempLoads = loadPosts?.sort(
          (
            a: {dispatchDate: string | number | Date},
            b: {dispatchDate: string | number | Date},
          ) =>
            new Date(b.dispatchDate).getTime() -
            new Date(a.dispatchDate).getTime(),
        );
        appDispatch(carrierLoading(false));
        appDispatch(getPaymentLoadList(tempLoads));
      } else {
        appDispatch(carrierLoading(false));
      }
    } else {
      appDispatch(carrierLoading(false));
      appDispatch(getPaymentLoadList([]));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    appDispatch(getPaymentLoadList([]));
    const _error = AxiosErrorService.errorMessage(error);
    console.log('_error?.message', _error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const doUploadPod = async (
  _data: FormData,
  callback: (success: boolean, message?: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/uploadAllPODFiles`;
    const {status, data} = await instance.put(URL, _data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (status == 200 && data) {
      callback(true, data.message);
      appDispatch(carrierLoading(false));
    } else {
      callback(false, data.message);
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: 'Entity too large'});
  }
};

const getLocationLoads = async (query: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}load/getPreferredLoads?${query}`;
    console.log(URL);
    const {data, status}: any = await instance.get(URL);
    if (status == 200) {
      if (data) {
        appDispatch(setLocationLoad(data?.data));
      }
      appDispatch(carrierLoading(false));
    } else {
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    appDispatch(setLocationLoad([]));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const getLoadWithStatus = async (query: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}load/loadStatus?${query}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200) {
      if (data) {
        appDispatch(setLoadWithStatus(data?.data));
      }
      appDispatch(carrierLoading(false));
    } else {
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    appDispatch(setLocationLoad([]));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const doLoadRequest = async (request: any, isAddMore: boolean) => {
  try {
    appDispatch(carrierLoading(true));
    const _url: any = isAddMore
      ? `${Config.BASERRLACCOUNT}load/addMoreTruckOnRequestedLane`
      : `${Config.BASERRLACCOUNT}load/requestLoad`;
    const {data, status}: any = await instance.post(_url, request);
    if (status == 200 && data?.type !== 'failure') {
      delete request?.carrier_notification_id;
      delete request?.is_KYC_verified;
      delete request?.carrier_Name;
      delete request?.mobileNumber;
      delete request?.allWeight;
      delete request?.truckDetails;
      delete request?.dispatchDate;
      delete request?.originLocation;
      delete request?.destinationLocation;
      showAlert({
        message: 'निवेंदन सफलता पूर्वक किया गया',
      });
      navigationRef.current?.navigate(AppBottomTab.SCREEN_NAME, {
        screen: LoadStackNavigation.SCREEN_NAME,
      });
      // getLoadWithStatus(getQuery(request));
      appDispatch(carrierLoading(false));
    } else {
      showAlert({
        message: data?.message,
      });
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
export {
  getCarrierLoads,
  getCarrierRequestedLoads,
  getDispatchDetails,
  getDispatchCalc,
  doRequestForLoad,
  doSubmitTruck,
  getCarrierPaymentLoads,
  doUploadPod,
  getLocationLoads,
  getLoadWithStatus,
  doLoadRequest,
};
