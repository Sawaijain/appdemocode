import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useTheme} from '@/hooks/useTheme';
import React, {forwardRef} from 'react';
import {View} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
interface ActionSheetProps {
  addressProofTypes: string[];
  setAddressProofType: (type: string) => void;
  onHide: () => void;
}

const CustomActionSheet: React.ForwardRefRenderFunction<
  ActionSheetRef,
  ActionSheetProps
> = ({addressProofTypes, setAddressProofType, onHide}, ref) => {
  const {
    style: {layout, gutter, input},
    value: {color},
  } = useTheme();
  return (
    <ActionSheet containerStyle={{backgroundColor: color.black}} ref={ref}>
      <View>
        {addressProofTypes.map((type, i) => (
          <AppTouchableOpacity
            key={i}
            style={{
              alignItems: 'center',
              ...gutter.marginTop.large,
              ...gutter.marginBottom.small,
            }}
            children={
              <AppText
                style={{color: color.white}}
                onPress={() => {
                  setAddressProofType(type);
                  onHide();
                }}>
                {type}
              </AppText>
            }
          />
        ))}
      </View>
    </ActionSheet>
  );
};

export default forwardRef(CustomActionSheet);
