import strings from '@/util/Strings';
import StorageInstace from './storage/Storage';
import Toaster from './toasterService';
import moment from 'moment';
import {assign, fromPairs, isArray, isEqual, isObject} from 'lodash';
export const verifyEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return true;
  } else {
    Toaster.show('Please provider a valid email');
    return false;
  }
};

export const commodities = [
  'Rice',
  'Wheat',
  'Paddy',
  'Masoor',
  'Soybean',
  'Bran',
  'DOC',
  'Maida',
  'Flour',
  'Tuar',
  'Moong',
  'Chana',
  'Maize',
  'Others',
];
export const getToken: any = async () => {
  return await StorageInstace.getItem('agrigator:token');
};

export const convertDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const tyres = [
  {label: strings.no_of_tyres, value: ''},
  {label: '24', value: '24'},
  {label: '22', value: '22'},
  {label: '20', value: '20'},
  {label: '18', value: '18'},
  {label: '16', value: '16'},
  {label: '14', value: '14'},
  {label: '12', value: '12'},
  {label: '10', value: '10'},
  {label: '8', value: '8'},
  {label: '6', value: '6'},
];

export function keysOf<T extends Record<string, any>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function entriesOf<T extends Record<string, any>>(
  obj: T,
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as unknown as [keyof T, T[keyof T]][];
}

export function assignValues<T>(to: T, values: Partial<T>): T {
  return assign(to, values);
}

export function replaceDeep(obj: object, needle: any, replacement: any): any {
  function replace(value: any) {
    if (isEqual(value, needle)) {
      return replacement;
    }
    if (isArray(value)) {
      return value.map((v) => replaceDeep(v, needle, replacement));
    }
    if (isObject(value)) {
      return fromPairs(
        entriesOf(value).map(([k, v]) => [
          k,
          replaceDeep(v, needle, replacement),
        ]),
      );
    }
    return value;
  }
  return replace(obj);
}

export const CommisionTableData = [
  {
    minWeight: 6,
    maxWeigth: 13,
    localRate: 250,
    outerRate: 500,
  },
  {
    minWeight: 13,
    maxWeigth: 16,
    localRate: 250,
    outerRate: 800,
  },
  {
    minWeight: 16,
    maxWeigth: 22,
    localRate: 500,
    outerRate: 800,
  },
  {
    minWeight: 22,
    maxWeigth: 26,
    localRate: 800,
    outerRate: 1000,
  },
  {
    minWeight: 26,
    maxWeigth: 32,
    localRate: 800,
    outerRate: 1200,
  },
  {
    minWeight: 32,
    maxWeigth: 46,
    localRate: 1000,
    outerRate: 1500,
  },
  {
    minWeight: 46,
    maxWeigth: 1000,
    localRate: 1500,
    outerRate: 2000,
  },
];
