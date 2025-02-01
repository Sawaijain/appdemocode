import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily, normalize} from '@/theme/Utils';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {ChevronForwardIcon} from '@/components/icons/Icon';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const ImportantNotes = ({
  isDetailPage,
  data,
}: {
  isDetailPage?: boolean;
  data: any;
}) => {
  const style = useStyle();
  const inventoryStyle = useInventoryStyle();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return (
    <React.Fragment>
      <View
        style={[
          style.container,
          {
            backgroundColor: isDetailPage
              ? userDetails?.profileType === 'transporter'
                ? style.color.transporterLight2
                : style.color.notesBg
              : style.color.white,
            marginTop: isDetailPage ? 0 : normalize(15),
          },
        ]}>
        <AppText style={style.noteText}>
          {isDetailPage ? strings.info : strings.details.note}
        </AppText>
        <View style={[style.list, {marginLeft: isDetailPage ? 0 : 15}]}>
          {isDetailPage ? (
            <ChevronForwardIcon
              size={18}
              color={
                userDetails?.profileType === 'transporter'
                  ? style.color.transporter
                  : style.color.buttonNew
              }
            />
          ) : (
            <View style={style.dot} />
          )}
          <AppText style={style.text}>
            {strings.details.shortage}{' '}
            {data?.shortage ? `${data?.shortage}` : '50KG'}
          </AppText>
        </View>
        <View style={[style.list, {marginLeft: isDetailPage ? 0 : 15}]}>
          {isDetailPage ? (
            <ChevronForwardIcon
              size={18}
              color={
                userDetails?.profileType === 'transporter'
                  ? style.color.transporter
                  : style.color.buttonNew
              }
            />
          ) : (
            <View style={style.dot} />
          )}
          <AppText style={style.text}>
            {strings.details.loadingStatus}{' '}
            {data?.loading ? `${data?.loading}` : '24 Hours'}
          </AppText>
        </View>
        <View style={[style.list, {marginLeft: isDetailPage ? 0 : 15}]}>
          {isDetailPage ? (
            <ChevronForwardIcon
              size={18}
              color={
                userDetails?.profileType === 'transporter'
                  ? style.color.transporter
                  : style.color.buttonNew
              }
            />
          ) : (
            <View style={style.dot} />
          )}
          <AppText style={style.text}>
            {strings.details.unloadingStatus}{' '}
            {data?.unloading ? `${data?.unloading}` : '44 Hours'}
          </AppText>
        </View>
        <View style={[style.list, {marginLeft: isDetailPage ? 0 : 15}]}>
          {isDetailPage ? (
            <ChevronForwardIcon
              size={18}
              color={
                userDetails?.profileType === 'transporter'
                  ? style.color.transporter
                  : style.color.buttonNew
              }
            />
          ) : (
            <View style={style.dot} />
          )}
          <AppText style={style.text}>
            {strings.details.required(data?.tripal)}
          </AppText>
        </View>
        {!isDetailPage && (
          <AppText
            style={[
              style.requiredNote,
              {
                color:
                  userDetails?.profileType === 'transporter'
                    ? style.color.transporter
                    : style.color.buttonNew,
              },
            ]}>
            {strings.details.requiredNote}
          </AppText>
        )}
      </View>
      <View style={inventoryStyle.hrLine} />
    </React.Fragment>
  );
};

export default ImportantNotes;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  return {
    ...StyleSheet.create({
      container: {
        ...gutter.paddingHorizontal.regular,
        ...gutter.marginTop.regular,
        ...gutter.paddingBottom.large,
      },
      noteText: {
        fontSize: normalize(21),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        ...gutter.marginBottom.small,
      },
      list: {
        ...gutter.marginLeft.regular,
        ...layout.rowVerticalCenter,
        ...gutter.marginBottom.small,
      },
      dot: {
        height: 12,
        width: 12,
        borderRadius: 12 / 2,
        backgroundColor: color.uploadText,
      },
      text: {
        fontSize: normalize(16),
        fontFamily: AppFontFamily.ROBOTOMEDIUM,
        ...gutter.marginLeft.tiny,
      },
      requiredNote: {
        fontSize: normalize(18),
        fontFamily: AppFontFamily.ROBOTOBOLD,
        ...gutter.marginLeft.tiny,
        ...gutter.marginTop.large,
      },
    }),
    color: color,
    gutter: gutter,
  };
}
