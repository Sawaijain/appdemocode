import {
  FlexStyle, ImageStyle, StyleProp, TextStyle, ViewStyle,
} from 'react-native'

export type StyleProps<T extends ViewStyle | FlexStyle | ImageStyle | TextStyle> = {
  style?: StyleProp<T>
}

export type SizeProps<T extends 'required' | undefined = undefined> = T extends 'required'
  ? { size: number }
  : { size?: number }
