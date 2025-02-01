import {Alert, AlertButton as AlertButtonRn} from 'react-native';

interface AlertParams {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
}

export interface AlertButton {
  title?: string;
  onPress?: (value?: string) => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export const showAlert = (params: AlertParams) => {
  const title = String(params.title || '');
  const message = String(params.message || '');
  const buttons = (params.buttons ?? [{title: 'Okay'}]).map((i) => {
    return {
      text: i.title || '',
      onPress: i.onPress,
      style: i.style,
    } as AlertButtonRn;
  });
  Alert.alert(title, message, buttons);
};
