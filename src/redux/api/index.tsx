import {getToken} from '@/libs/Utils';
import * as AxiosLogger from 'axios-logger';
import axios from 'axios';
import {setGlobalConfig} from 'axios-logger';
const instance = axios.create();
setGlobalConfig({
  prefixText: 'Network',
  dateFormat: 'HH:MM:ss',
  status: true,
  headers: false,
  url: true,
  params: true,
  data: true,
});
instance.interceptors.request.use(
  AxiosLogger.requestLogger,
  AxiosLogger.errorLogger,
);
instance.interceptors.request.use(async (config: any) => {
  const token: any = await getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
export default instance;
