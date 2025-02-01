import {useTheme} from '@/hooks/useTheme';
import * as React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import AppTouchableOpacity from './AppTouchableOpacity';
import {AppText} from './AppText';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import {normalize} from '@/theme/Utils';
import {ChevronLeftIcon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

interface PageNavProps {
  header: string;
  smallImage?: ImageSourcePropType;
  xsmallImage?: ImageSourcePropType;
  image?: ImageSourcePropType;
  isBack?: boolean;
}

const PageNav = (props: PageNavProps) => {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  const style = usePageNavStyle();
  return (
    <LinearGradient
      style={[style.container, !props.isBack && [layout.center]]}
      colors={[color.linear.color1, color.linear.color2, color.linear.color3]}>
      {props.isBack && (
        <AppTouchableOpacity
          onPress={() => navigationRef.current?.goBack()}
          children={
            <ChevronLeftIcon color={color.black} size={fontSize.medium} />
          }
        />
      )}

      <View
        style={[
          !props.isBack && layout.fill,
          !props.isBack && gutter.marginLeft.large,
        ]}>
        <AppText
          style={!props.isBack && layout.textAlignCenter}
          mode="defaultBold">
          {props.header}
        </AppText>
      </View>
      {props.smallImage ? (
        <View>
          <Image style={style.smallImage} source={props.smallImage} />
        </View>
      ) : props.xsmallImage ? (
        <View>
          <Image style={style.xsmallImage} source={props.xsmallImage} />
        </View>
      ) : (
        <View>
          <Image style={style.image} source={props.image} />
        </View>
      )}
    </LinearGradient>
  );
};
export default PageNav;
function usePageNavStyle() {
  const {
    style: {layout, gutter},
  } = useTheme();
  return StyleSheet.create({
    container: {
      ...layout.rowVerticalCenter,
      ...gutter.paddingHorizontal.regular,
      ...gutter.paddingVertical.small,
      ...layout.justifyContentBetween,
      height: 60,
    },
    smallImage: {
      height: normalize(20),
      width: normalize(20),
      resizeMode: 'contain',
    },
    xsmallImage: {
      height: normalize(20),
      width: normalize(20),
      resizeMode: 'contain',
    },
    image: {
      height: normalize(40),
      width: normalize(40),
    },
  });
}
