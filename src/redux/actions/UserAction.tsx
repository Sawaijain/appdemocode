import StorageInstace from '@/libs/storage/Storage';
import axios from 'axios';
import Config from 'react-native-config';
import instance from '../api';
import AxiosErrorService from '@/service/AxiosError.service';
import {showAlert} from '@/components/Alert';
import {carrierLoading} from '../reducers/loadingSlice';
import {appDispatch} from '../AppStore';
import {getImageDocument} from '../reducers/userSlice';
import {addUserProfile} from '../reducers/authSlice';

const updateKyc = async (
  _req: FormData,
  callback: (
    success: boolean,
    message?: string,
    data?: any,
    isUpdate?: boolean,
  ) => void,
  isUpdate?: boolean,
) => {
  console.log(_req);
  try {
    const token = await StorageInstace.getItem('agrigator:token');
    appDispatch(carrierLoading(true));
    const url = isUpdate
      ? `${Config.BASERRLZOOP}carrier/updateKYCDetails`
      : `${Config.BASERRLACCOUNT}user/register_kyc_user_fleet_owner`;
    axios({
      method: 'post',
      url: url,
      data: _req,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(({data, status}) => {
        if (status == 200 && data?.type === 'success') {
          appDispatch(carrierLoading(false));
          callback(true, data.message, data, isUpdate);
        } else {
          appDispatch(carrierLoading(false));
          callback(false, data.message, undefined);
        }
      })
      .catch((error: any) => {
        console.log(error?.response);
        appDispatch(carrierLoading(false));
        const _error = AxiosErrorService.errorMessage(error);
        showAlert({message: _error?.message ? _error?.message : _error});
      });
    // appDispatch(carrierLoading(false));
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    callback(false, undefined);
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};

const getImage = async (documentName: string) => {
  appDispatch(getImageDocument(''));
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLZOOP}misc/getDocumentBase64?document_name=${documentName}`;
    const {data, status}: any = await instance.get(URL);
    if (status == 200 && data) {
      appDispatch(carrierLoading(false));
      appDispatch(
        getImageDocument(`data:image/png;base64,${data.base64image}`),
      );
    } else {
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
const getBankDetail = async (request: any) => {
  try {
    appDispatch(carrierLoading(true));
    const URL = `${Config.BASERRLACCOUNT}misc/getBankDetails`;
    const API_URL = `${URL}`;
    const res = await axios.post(API_URL, request);
    const {data, status}: any = res;
    if (status == 200 && data) {
      appDispatch(carrierLoading(false));
      return data;
    }
    appDispatch(carrierLoading(false));
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};

const getUserDetail = async (id: any) => {
  try {
    if (id) {
      const URL = `${Config.BASERRLZOOP}admin/getCarrierDetails?carrier_id=${id}`;
      const API_URL = `${URL}`;
      const res = await instance.get(API_URL);
      const {data, status}: any = res;
      if (status == 200) {
        appDispatch(carrierLoading(false));
        appDispatch(addUserProfile(data[0]));
        StorageInstace.setItem('user', JSON.stringify(data[0]));
      }
      appDispatch(carrierLoading(false));
    }
  } catch (error: any) {
    appDispatch(carrierLoading(false));
    const _error = AxiosErrorService.errorMessage(error);
    showAlert({message: _error?.message ? _error?.message : _error});
  }
};
export {updateKyc, getImage, getBankDetail, getUserDetail};
