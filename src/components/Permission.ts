import {Platform} from 'react-native';
import {
  PERMISSIONS,
  requestMultiple,
  Permission,
  PermissionStatus,
} from 'react-native-permissions';

export type PermissionType = 'camera' | 'photo' | 'location';
type OsType = 'ios' | 'android';

// This function can be used anywhere as it supports multiple permissions.
// It checks for permissions and then requests for it.
const REQUEST_PERMISSION_TYPE: Record<
  PermissionType,
  Record<OsType, Permission | undefined>
> = {
  camera: {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  },
  photo: {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  },
  location: {
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  },
};

const getOsPermission = (
  permission: PermissionType,
): Permission | undefined => {
  if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
    throw new Error('Invalid OS');
  }
  const platform: OsType = Platform.OS;
  return REQUEST_PERMISSION_TYPE[permission][platform];
};

export const requestPermissions = async (
  permissions: PermissionType[],
): Promise<Record<string, PermissionStatus | undefined> | string> => {
  const osPermissions = permissions
    .map(i => getOsPermission(i))
    .filter(i => i) as Permission[];
  try {
    const statuses = await requestMultiple(osPermissions);
    const responses: Record<string, PermissionStatus | undefined> = {};
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      const osPermission = getOsPermission(permission);
      responses[permission] = osPermission ? statuses[osPermission] : undefined;
    }
    console.log('Permissions result: ', responses);
    return responses;
  } catch (error: any) {
    console.error('Permissions error: ', error);
    return '' + error?.message;
  }
};
