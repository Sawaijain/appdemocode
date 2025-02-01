import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useTheme} from '@/hooks/useTheme';
import strings from '@/util/Strings';
import React, {forwardRef} from 'react';
import {View} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

interface ActionSheetProps {
  openDocument: () => void;
  openCamera: () => void;
}

const OptionsActionSheet: React.ForwardRefRenderFunction<
  ActionSheetRef,
  ActionSheetProps
> = ({openDocument, openCamera}, ref) => {
  const {
    style: {layout, gutter, input},
    value: {color},
  } = useTheme();
  return (
    <ActionSheet containerStyle={{backgroundColor: color.black}} ref={ref}>
      <View /* style={{paddingVertical: 50, backgroundColor: '#000'}} */>
        <AppTouchableOpacity
          onPress={openDocument}
          style={gutter.marginBottom.regular}
          children={
            <AppText
              style={[
                input.textInput,
                {
                  textAlignVertical: 'center',
                  color: color.white,
                  borderColor: color.black,
                  borderWidth: 0,
                },
                gutter.paddingLeft.small,
                layout.textAlignCenter,
              ]}>
              {strings.upload_from_gallery}
            </AppText>
          }
        />
        <AppTouchableOpacity
          onPress={openCamera}
          style={gutter.marginBottom.regular}
          children={
            <AppText
              style={[
                input.textInput,
                {
                  textAlignVertical: 'center',
                  color: color.white,
                  borderColor: color.black,
                  borderWidth: 0,
                },
                gutter.paddingLeft.small,
                layout.textAlignCenter,
              ]}>
              {strings.open_camera}
            </AppText>
          }
        />
      </View>
    </ActionSheet>
  );
};

export default forwardRef(OptionsActionSheet);
