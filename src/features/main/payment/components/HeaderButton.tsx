import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useTheme} from '@/hooks/useTheme';
import {RootState} from '@/redux/AppStore';
import {normalize} from '@/theme/Utils';
import strings from '@/util/Strings';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

interface HeaderButtonProps {
  onPress: (tabName: 'advance' | 'balance') => void;
  tabName: string;
}

const HeaderButton = ({onPress, tabName}: HeaderButtonProps) => {
  const style = useStyle();
  const {
    value: {color},
  } = useTheme();
  return (
    <View style={style.tabs}>
      <AppTouchableOpacity
        onPress={() => onPress('advance')}
        style={[style.button, tabName == 'advance' && style.activeTab]}
        children={
          <React.Fragment>
            <AppText
              style={[
                style.tabName,
                {color: tabName == 'advance' ? color.white : color.black},
              ]}>
              {strings.current}
            </AppText>
          </React.Fragment>
        }
      />
      <AppTouchableOpacity
        onPress={() => onPress('balance')}
        style={[style.button, tabName == 'balance' && style.activeTabToPay]}
        children={
          <React.Fragment>
            <AppText
              style={[
                style.tabName,
                {color: tabName == 'balance' ? color.white : color.black},
              ]}>
              {strings.completePay}
            </AppText>
          </React.Fragment>
        }
      />
    </View>
  );
};

export default React.memo(HeaderButton);
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return StyleSheet.create({
    tabs: {
      ...layout.rowVerticalCenter,
      ...gutter.marginBottom.small,
    },
    tabName: {
      fontSize: normalize(20),
      color: color.tabText,
      ...layout.textAlignCenter,
    },
    button: {
      paddingVertical: normalize(15),
      paddingHorizontal: normalize(27),
      borderWidth: 0,
      borderColor: color.uploadText,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: color.white,
      ...layout.fill,
    },
    activeTab: {
      backgroundColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    activeTabToPay: {
      backgroundColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      borderColor:
        userDetails?.profileType === 'transporter'
          ? color.transporter
          : color.buttonNew,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
  });
}
