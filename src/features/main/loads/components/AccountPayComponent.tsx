import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {AppText} from '@/components/AppText';
import {filteredDate, getCommodityLanguage} from '@/libs';
import BookTruckContainer from '../../matched-loads/screen/BookTruckContainer';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
import strings from '@/util/Strings';

const AccountPayComponent = ({item}: {item: any}) => {
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  const {
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return (
    <AppTouchableOpacity
      onPress={() => {
        BookTruckContainer.navigate({data: item}, true);
      }}
      activeOpacity={0.8}
      children={
        <View style={style.box}>
          <View style={style.middleview}>
            <View style={[inventoryStyle.locationContainer, style.fill]}>
              <View style={inventoryStyle.origin}>
                <View style={[inventoryStyle.dot, {top: 7}]} />
                <AppText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[
                    inventoryStyle.originLocation,
                    {fontSize: normalize(18)},
                  ]}>
                  {item?.origin?.replace(', India', '')}
                </AppText>
                <View
                  style={[inventoryStyle.originLine, {borderStyle: 'solid'}]}
                />
              </View>
              <View
                style={[
                  inventoryStyle.line,
                  {borderStyle: 'solid', height: 20},
                ]}
              />
              <View style={[inventoryStyle.origin, {marginTop: -10}]}>
                <View
                  style={[
                    inventoryStyle.dot,
                    {
                      top: 7,
                      backgroundColor:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    },
                  ]}
                />
                <AppText
                  style={[
                    inventoryStyle.originLocation,
                    {fontSize: normalize(18)},
                  ]}>
                  {item?.destination?.replace(', India', '')}
                </AppText>
              </View>
            </View>
            <View>
              <View style={style.weightWrap}>
                <AppText style={style.weight}>
                  लोडिंग - {filteredDate(item?.dispatchDate)}
                </AppText>
              </View>
              <AppText style={[style.commodity, {marginBottom: 4}]}>
                {getCommodityLanguage(item?.commodity)}
              </AppText>
              <AppText mode="defaultBold" style={style.commodity}>
                {item?.tripType === 'Account Pay'
                  ? strings.account_pay
                  : strings.to_pay}
              </AppText>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default AccountPayComponent;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    box: {
      borderWidth: 2,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      ...gutter.paddingVertical.small,
      ...gutter.paddingHorizontal.regular,
      borderRadius: 10,
      ...gutter.marginBottom.regular,
      ...gutter.marginTop.regular,
      backgroundColor: color.white,
    },
    upperViewLeft: {
      ...layout.rowVerticalCenter,
      ...layout.fill,
    },
    upperViewRight: {
      fontSize: normalize(15),
      color: color.disableButton,
    },
    orderId: {
      fontSize: normalize(13),
      color: color.disableButton,
      ...gutter.marginLeft.tiny,
    },
    middleview: {
      ...layout.row,
      ...gutter.marginBottom.regular,
      ...gutter.gap.regular,
    },
    fill: layout.fill,
    price: {
      fontSize: normalize(26),
      fontFamily: AppFontFamily.ROBOTOBLACK,
    },
    bonus: {
      fontSize: normalize(17),
      fontWeight: '400',
      color:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
    },
    bottomView: {
      ...layout.row,
    },
    weightWrap: {
      ...layout.fill,
      ...layout.row,
      ...layout.justifyContentEnd,
    },
    weight: {
      color: color.tabText,
      fontFamily: AppFontFamily.ROBOTOMEDIUM,
      fontSize: normalize(16),
    },
    commodity: {
      ...gutter.paddingLeft.small,
      fontSize: normalize(16),
      color: color.tabText,
      ...layout.textAlignEnd,
    },
    tripType: {
      color: color.disableButton,
      fontSize: normalize(22),
    },
    bookmark: {
      ...gutter.marginTop.small,
    },
  });
}
