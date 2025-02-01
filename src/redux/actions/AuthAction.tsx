import Config from 'react-native-config';
import instance from '../api';
import strings from '@/util/Strings';
import axios from 'axios';
import Toaster from '@/libs/toasterService';
import AxiosErrorService from '@/service/AxiosError.service';
import {showAlert} from '@/components/Alert';
import {appDispatch} from '../AppStore';
import {carrierLoading} from '../reducers/loadingSlice';
import {
  getPanDetail,
  getRcDetail,
  getUserKycDetails,
  setCities,
} from '../reducers/authSlice';
const rcUrl: string = `${Config.BASERRLACCOUNT}misc/getRCDetails`;
const panUrl: string = `${Config.BASERRLACCOUNT}misc/getPANDetails`;
const sendOtp = async (
  _data: any,
  callback: (success: boolean, error?: string) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}user/login`;
    const {data, status}: any = await instance.post(URL, _data);
    if (status == 200 && data) {
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
const verifyOtp = async (
  _data: any,
  callback: (success: boolean, error?: string, userData?: any) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}user/verify_otp`;
    const {data, status}: any = await instance.post(URL, _data);
    if (status == 200 && data.type == 'success') {
      callback(true, data.message, data);
      appDispatch(carrierLoading(false));
    } else {
      callback(false, data.message);
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
    appDispatch(carrierLoading(false));
  }
};
const registerUser = async (
  _data: FormData,
  callback: (success: boolean, error?: string, userData?: any) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}user/update_user_fleet_owner_data`;
    axios({
      method: 'put',
      url: URL,
      data: _data,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(({data, status}) => {
        appDispatch(carrierLoading(false));
        if (status == 200 && data && data.type !== 'failure') {
          callback(true, data.message, data);
        } else {
          appDispatch(carrierLoading(false));
          callback(false, data.message);
        }
      })
      .catch((error) => {
        console.log('error', error?.response);
        appDispatch(carrierLoading(false));
        const _error = AxiosErrorService.errorMessage(error);
        showAlert({message: _error?.message ? _error?.message : _error});
      });
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const getPANDetails = async (
  panData: any,
  callback: (success: boolean, data: any) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = panUrl;
    const {data, status}: any = await instance.post(URL, panData);
    if (status == 200 && data?.type === 'success') {
      appDispatch(carrierLoading(false));
      appDispatch(getPanDetail(data));
      callback(true, data);
      Toaster.show('पेन विवरण सफलतापूर्वक प्राप्त किए गए');
    } else {
      appDispatch(carrierLoading(false));
      callback(false, 'कोई रिकॉर्ड नहीं मिला');
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const getRCDetails = async (
  rcData: any,
  callback: (success: boolean, error?: string, data?: any) => void,
) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = rcUrl;
    const {data, status}: any = await instance.post(URL, rcData);
    if (status == 200) {
      if (data && data.type == 'failure') {
        appDispatch(carrierLoading(false));
        callback(false, strings.noRecordForTruckRc, data);
      } else {
        appDispatch(carrierLoading(false));
        appDispatch(getRcDetail(data?.result));
        callback(true, '', data.result);
      }
    } else {
      appDispatch(carrierLoading(false));
      callback(false, strings.noRecordForTruckRc, data.result);
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    callback(false, strings.noRecordForTruckRc);
  }
};
const getCities = async (query: string) => {
  try {
    const URL = `${Config.BASERRLZOOP}locations/findByCity?name=${query}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200) {
      if (data && data.type !== 'failure') {
        appDispatch(setCities(data?.data));
      }
    } else {
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
  }
};
const getKycDetails = async (kyc_id: string) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASEURL}carrier/getKycData?kyc_id=${kyc_id}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200 && data) {
      appDispatch(carrierLoading(false));
      if (
        data &&
        data?.kycDataCarrier &&
        data?.kycDataCarrier[0]?.tds_files?.length > 0
      ) {
        data.kycDataCarrier[0].tds_files =
          data.kycDataCarrier[0].tds_files?.sort((a: any, b: any) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          });
      }

      appDispatch(getUserKycDetails(data?.kycDataCarrier[0]));
    } else {
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
export {
  sendOtp,
  verifyOtp,
  registerUser,
  getPANDetails,
  getRCDetails,
  getKycDetails,
  getCities,
};
