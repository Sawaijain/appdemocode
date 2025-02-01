import {View, StyleSheet} from 'react-native';
import React from 'react';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import ArrowBack from '@/assets/svgs/ArrowBack';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import {RefreshIcon} from '@/components/icons/Icon';

const DetailHeader = ({
  title,
  data,
  onRefresh,
}: {
  title: string;
  data?: any;
  onRefresh?: () => void;
}) => {
  const style = useStyle();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return (
    <View style={style.container}>
      <View style={style.rowContainer}>
        <View style={style.backWithText}>
          <AppTouchableOpacity
            onPress={() => RootNavigator.pop()}
            children={
              <ArrowBack
                color={
                  userDetails?.profileType === 'transporter'
                    ? style.color.transporter
                    : style.color.buttonNew
                }
              />
            }
          />
          <AppText style={style.title}>{title} </AppText>
        </View>
        <AppTouchableOpacity
          style={{display: onRefresh ? 'flex' : 'none'}}
          onPress={() => (onRefresh ? onRefresh() : null)}
          children={
            <RefreshIcon
              size={30}
              color={
                userDetails?.profileType === 'transporter'
                  ? style.color.transporter
                  : style.color.buttonNew
              }
            />
          }
        />
      </View>
      <AppText style={style.orderId}>आर्डर - {data?.orderId}</AppText>
    </View>
  );
};

export default DetailHeader;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return {
    ...StyleSheet.create({
      container: {
        ...gutter.paddingHorizontal.normal,
        ...gutter.paddingBottom.large,
        borderBottomWidth: 2,
        borderBottomColor: color.lightWhite,
        ...gutter.paddingTop.tableRowHeight,
        ...gutter.marginBottom.large,
      },
      backWithText: {
        ...layout.rowVerticalCenter,
        ...gutter.gap.small,
        ...layout.fill,
      },
      title: {
        fontSize: normalize(25),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
      },
      orderId: {
        ...gutter.paddingLeft.tableRowHeight,
        fontSize: normalize(18),
        fontWeight: '400',
      },
      rowContainer: {
        ...layout.rowVerticalCenter,
      },
    }),
    color,
  };
}
