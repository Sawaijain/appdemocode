import {Dimensions, Platform} from 'react-native';
import instance from '@/redux/api';
import axios from 'axios';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import moment from 'moment';
export const MAX_WIDTH = Dimensions.get('screen').width;
export const MAX_HEIGHT = Dimensions.get('screen').height;

export const isAndroid = Platform.OS === 'android';
export const formatDateToString = (date: Date) => {
  const options: any = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
};
export const formatDateToStringDateMonth = (date: Date) => {
  const options: any = {
    day: '2-digit',
    month: 'short',
  };
  return date.toLocaleDateString('en-US', options);
};

export const isObjectEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};
export const isObjectValueEmpty = (obj: object) => {
  return Object.values(obj).every((x) => x === null || x === '');
};
export const getCurrentLocation = (): Promise<GeolocationResponse> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  });
};
export const removeEmptySpace = (title?: any): string => {
  if (title) {
    return title.toString().replace(/\s+/g, '');
  } else {
    return '';
  }
};

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getMobileNo = (mobileNo: string) => {
  if (mobileNo && mobileNo.length >= 12) {
    let no = mobileNo.slice(mobileNo.length - 10);
    return no;
  } else {
    return mobileNo;
  }
};

export const setToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + '';
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + '';
  }
};

export const getCommodityLanguage = (commodity: string) => {
  switch (commodity) {
    case 'Rice':
      return 'चावल';
      break;
    case 'Paddy':
      return 'धान';
      break;
    case 'Wheat':
      return 'गेहूं';
      break;
    case 'Masoor':
      return 'मसूर';
      break;
    case 'Bran':
      return 'बरान';
      break;
    case 'DOC':
      return 'DOC';
      break;
    case 'Mung':
      return 'मूँग';
      break;
    case 'Moong':
      return 'मूँग';
      break;
    case 'Tuar':
      return 'तुआर';
      break;
    case 'Maida':
      return 'मैदा';
      break;
    case 'Grain':
      return 'अनाज';
      break;
    case 'Soybean':
      return 'सोयाबीन';
      break;
    case 'Chana':
      return 'चना';
      break;
    case 'Flour':
      return 'आटा';
      break;
    default:
      return 'अनाज';
      break;
  }
};
export const RupeeSign: string = '\u20B9';

export const getFourDatesFromToday = (): Date[] => {
  const datesArray: Date[] = [];
  const today = new Date();

  for (let i = 0; i < 4; i++) {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + i);
    datesArray.push(newDate);
  }

  return datesArray;
};

export const getQuery = (filter: any) => {
  const obj = {
    ...filter,
  };
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
};

export const filteredDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};
export function cleanObject(obj: {[x: string]: any}) {
  for (var propName in obj) {
    if (!obj[propName]) {
      delete obj[propName];
    }
  }
  return obj;
}
export const getExt = (fileName: string) => {
  return fileName.substr(fileName.lastIndexOf('.') + 1);
};

export const getImageUri = (imageRes: any) => {
  if (imageRes && !isObjectEmpty(imageRes)) {
    return imageRes[0].uri;
  } else {
    return imageRes.uri;
  }
};
export const getImageType = (imageRes: any) => {
  if (imageRes && !isObjectEmpty(imageRes)) {
    return imageRes[0].type;
  } else {
    return imageRes.type;
  }
};
export const getImageName = (imageRes: any) => {
  if (imageRes && !isObjectEmpty(imageRes)) {
    return imageRes[0].name;
  } else {
    return imageRes.name;
  }
};
export function calculateAmount(
  baseAmount: number,
  percentage: number,
): number {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100.');
  }

  const amount = (baseAmount * percentage) / 100;
  return amount;
}
