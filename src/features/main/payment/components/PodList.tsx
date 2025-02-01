import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import strings from '@/util/Strings';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import EyeIcon from '@/assets/svgs/EyeIcon';
import {getExt} from '@/libs';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import Config from 'react-native-config';
import {getImage} from '@/redux/actions/UserAction';
import {useSelector} from 'react-redux';
import {RootState, appDispatch} from '@/redux/AppStore';
import {useToast} from 'native-base';
import {getImageDocument} from '@/redux/reducers/userSlice';
import ViewPODModal from '@/components/ViewPOD';

const PodList = ({podData}: {podData: any[]}) => {
  const toast = useToast();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const style = useStyle();
  const imagePath = useSelector((state: RootState) => state.user.imagePath);
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const getPOD = (path: string) => {
    const documentType = getExt(path);
    if (documentType == 'pdf') {
      navigationRef.current?.navigate('ShowInvoiceInTransit', {
        fileName: `${Config.BASERRLZOOP}misc/getInvoicePDF?document_name=${path}`,
      });
    } else {
      if (path) {
        getImage(path);
      } else {
        appDispatch(getImageDocument(''));
        toast.show({title: strings.noPods});
        return;
      }
    }
  };
  useEffect(() => {
    if (imagePath) {
      setIsModalVisible(true);
    }
  }, [imagePath]);
  return (
    <View style={style.podWrap}>
      <View style={style.upperBox}>
        <View style={style.upperInner}>
          <AppText mode="alternative">{strings.podHindi}</AppText>
        </View>
      </View>
      <View>
        {podData &&
          podData.length > 0 &&
          podData.map((item, index) => (
            <View key={index} style={style.podList}>
              {Object.keys(item)?.map((ele) => (
                <React.Fragment key={ele}>
                  <AppText mode="alternative">{ele}</AppText>
                  <AppTouchableOpacity
                    onPress={() => getPOD(item[ele])}
                    children={
                      <EyeIcon
                        color={
                          userDetails?.profileType === 'transporter'
                            ? style.color.transporter
                            : style.color.buttonNew
                        }
                      />
                    }
                  />
                </React.Fragment>
              ))}
            </View>
          ))}
      </View>
      {isModalVisible && (
        <ViewPODModal
          onclose={() => {
            setIsModalVisible(false);
          }}
          isVisible={isModalVisible}
          url={imagePath}
        />
      )}
    </View>
  );
};

export default PodList;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return {
    ...StyleSheet.create({
      podWrap: {
        borderWidth: 1,
        borderColor: color.border,
        borderRadius: 10,
        ...gutter.marginVertical.large,
      },
      upperBox: {
        backgroundColor: color.lightWhite,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...gutter.paddingVertical.small,
        ...gutter.paddingHorizontal.regular,
      },
      upperInner: {
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
      },
      truckNumber: {
        fontSize: normalize(16),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
      },
      podList: {
        ...gutter.paddingHorizontal.regular,
        ...layout.rowVerticalCenter,
        ...layout.justifyContentBetween,
        ...gutter.paddingVertical.regular,
        borderBottomWidth: 1,
        borderBottomColor: color.border,
      },
    }),
    color,
  };
}
