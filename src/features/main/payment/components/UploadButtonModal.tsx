import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AppButton from '@/components/AppButton';
import {useTheme} from '@/hooks/useTheme';
import {AppFontFamily} from '@/theme/Utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
const {
  style: {layout, gutter},
  value: {color},
} = useTheme();
interface UploadButtonModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
  podDocName: string | null;
  receiptDocName: string | null;
  addDocName1: string | null;
  addDocName2: string | null;
  onRemoveDoc: (type: string) => void;
  onSubmit: () => void;
  actionSheetRef: React.RefObject<any>;
}
const UploadButtonModal: React.FC<UploadButtonModalProps> = ({
  visible,
  onClose,
  onSelect,
  podDocName,
  receiptDocName,
  addDocName1,
  addDocName2,
  onRemoveDoc,
  onSubmit,
  actionSheetRef,
}) => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return (
    <Modal isVisible={visible} onDismiss={() => onClose()}>
      <View style={styles.centeredViewUp}>
        <View style={styles.modalView}>
          <View
            style={{
              alignSelf: 'center',
              ...gutter.marginBottom.normal,
              borderWidth: 1,
              borderRadius: 100,
            }}>
            <TouchableOpacity onPress={() => onClose()}>
              <Icon name="ios-close" size={24} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.rowVertical,
              borderBottomColor:
                userDetails?.profileType === 'transporter'
                  ? color.transporter
                  : color.buttonNew,
            }}>
            <TouchableOpacity style={styles.title} activeOpacity={1}>
              <AppText style={styles.heading}>{strings.arrive}</AppText>
            </TouchableOpacity>
            <View style={styles.imagewrap}>
              {podDocName ? (
                <>
                  <Image
                    source={{uri: podDocName}}
                    style={styles.uploadedImage}
                  />
                  <TouchableOpacity
                    style={styles.imageClose}
                    onPress={() => {
                      onRemoveDoc('pod');
                    }}>
                    <Icon
                      name="ios-close"
                      color={
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew
                      }
                      size={18}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={{
                    ...styles.uploadIcon,
                    borderColor:
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew,
                  }}
                  onPress={() => {
                    onSelect('pod');
                    actionSheetRef?.current?.show();
                  }}>
                  <Icon
                    name="md-cloud-upload-outline"
                    color={
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew
                    }
                    size={20}
                  />
                  <AppText
                    style={{
                      ...styles.heading,
                      color:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    }}>
                    {strings.upload}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              ...styles.rowVertical,
              borderBottomColor:
                userDetails?.profileType === 'transporter'
                  ? color.transporter
                  : color.buttonNew,
            }}>
            <TouchableOpacity style={styles.title} activeOpacity={1}>
              <AppText style={styles.heading}>{strings.receipt}</AppText>
            </TouchableOpacity>
            <View style={styles.imagewrap}>
              {receiptDocName ? (
                <>
                  <Image
                    source={{uri: receiptDocName}}
                    style={styles.uploadedImage}
                  />
                  <TouchableOpacity
                    style={styles.imageClose}
                    onPress={() => {
                      onRemoveDoc('slip');
                    }}>
                    <Icon
                      name="ios-close"
                      color={
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew
                      }
                      size={18}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onSelect('slip');
                    actionSheetRef?.current?.show();
                  }}
                  style={{
                    ...styles.uploadIcon,
                    borderColor:
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew,
                  }}>
                  <Icon
                    name="md-cloud-upload-outline"
                    color={
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew
                    }
                    size={20}
                  />
                  <AppText
                    style={{
                      ...styles.heading,
                      color:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    }}>
                    {strings.upload}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              ...styles.rowVertical,
              borderBottomColor:
                userDetails?.profileType === 'transporter'
                  ? color.transporter
                  : color.buttonNew,
            }}>
            <TouchableOpacity style={styles.title} activeOpacity={1}>
              <AppText style={styles.heading}>{strings.addDoc}</AppText>
            </TouchableOpacity>
            <View style={styles.imagewrap}>
              {addDocName1 ? (
                <>
                  <Image
                    source={{uri: addDocName1}}
                    style={styles.uploadedImage}
                  />
                  <TouchableOpacity
                    style={styles.imageClose}
                    onPress={() => {
                      onRemoveDoc('add1');
                    }}>
                    <Icon
                      name="ios-close"
                      color={
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew
                      }
                      size={18}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onSelect('add1');
                    actionSheetRef?.current?.show();
                  }}
                  style={{
                    ...styles.uploadIcon,
                    borderColor:
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew,
                  }}>
                  <Icon
                    name="md-cloud-upload-outline"
                    color={
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew
                    }
                    size={20}
                  />
                  <AppText
                    style={{
                      ...styles.heading,
                      color:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    }}>
                    {strings.upload}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              ...styles.rowVertical,
              borderBottomColor:
                userDetails?.profileType === 'transporter'
                  ? color.transporter
                  : color.buttonNew,
            }}>
            <TouchableOpacity style={styles.title} activeOpacity={1}>
              <AppText style={styles.heading}>{strings.addDoc}</AppText>
            </TouchableOpacity>
            <View style={styles.imagewrap}>
              {addDocName2 ? (
                <>
                  <Image
                    source={{uri: addDocName2}}
                    style={styles.uploadedImage}
                  />
                  <TouchableOpacity
                    style={styles.imageClose}
                    onPress={() => {
                      onRemoveDoc('add2');
                    }}>
                    <Icon name="ios-close" color={color.buttonNew} size={18} />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onSelect('add2');
                    actionSheetRef?.current?.show();
                  }}
                  style={{
                    ...styles.uploadIcon,
                    borderColor:
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew,
                  }}>
                  <Icon
                    name="md-cloud-upload-outline"
                    color={
                      userDetails?.profileType === 'transporter'
                        ? color.transporter
                        : color.buttonNew
                    }
                    size={20}
                  />
                  <AppText
                    style={{
                      ...styles.heading,
                      color:
                        userDetails?.profileType === 'transporter'
                          ? color.transporter
                          : color.buttonNew,
                    }}>
                    {strings.upload}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={layout.center}>
            <AppButton
              textColor={color.white}
              onPress={() => {
                onSubmit();
              }}
              label={'सबमिट'}
              buttonStyle={[
                styles.button,
                {
                  backgroundColor:
                    userDetails?.profileType === 'transporter'
                      ? color.transporter
                      : color.buttonNew,
                },
              ]}
            />
          </View>
          <View>
            <AppText mode="contact" style={{color: 'gray'}}>
              ध्यान दे : कृपया अपने दस्तावेज़ की तस्वीर साफ अपलोड करे
            </AppText>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(UploadButtonModal);

const styles = StyleSheet.create({
  centeredViewUp: {
    ...layout.fill,
    ...layout.justifyContentCenter,
  },
  modalView: {
    ...gutter.margin.small,
    ...gutter.padding.normal,
    backgroundColor: color.white,
    borderRadius: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...gutter.marginVertical.small,
    ...layout.fill,
  },
  heading: {
    fontFamily: AppFontFamily.ROBOTO,
    fontSize: 13,
  },
  flex: {
    ...layout.rowVerticalCenter,
    ...layout.justifyContentBetween,
    ...gutter.paddingBottom.tiny,
  },
  imageClose: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderColor: color.white,
    elevation: 9,
    borderRadius: 5,
    ...layout.modalContent,
    ...layout.overlay,
  },
  uploadedImage: {
    ...gutter.padding.tiny,
    ...gutter.marginTop.tiny,
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 10,
    position: 'relative',
  },
  rowVertical: {
    ...layout.rowVerticalCenter,
    ...layout.justifyContentBetween,
    ...gutter.marginBottom.small,
    ...gutter.paddingBottom.small,
    borderBottomWidth: 1,
  },
  uploadIcon: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dotted',
    ...layout.rowVerticalCenter,
    ...gutter.gap.tiny,
    ...gutter.padding.tiny,
  },
  imagewrap: {
    maxWidth: 200,
    position: 'relative',
  },
  button: {
    backgroundColor: color.buttonNew,
    ...gutter.marginVertical.regular,
  },
});
