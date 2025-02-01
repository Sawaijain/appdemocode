import {Dimensions} from 'react-native';

export enum AppFontFamily {
  ROBOTO = 'Roboto-Regular',
  ROBOTOLIGHT = 'Roboto-Light',
  ROBOTOBOLD = 'Roboto-Bold',
  ROBOTOMEDIUM = 'Roboto-Medium',
  ROBOTOBLACK = 'Roboto-Black',
  ROBOTOTHIN = 'Roboto-Thin',
}

// lbaglie: base screen width used in the Figma files
const REFERENCE_DIMENSION = 430;

export function normalize(dimension: number): number {
  return dimension * (Dimensions.get('window').width / REFERENCE_DIMENSION);
}
