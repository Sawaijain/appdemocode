import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface RootNavigationParam<T extends Record<any, any>> {
  route: RouteProp<Record<string, T>, string>;
  navigation: NativeStackNavigationProp<any>;
}
