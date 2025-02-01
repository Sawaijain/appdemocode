import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {useSignInStyle} from '@/features/auth/styles/useSignInStyle';
import {useTheme} from '@/hooks/useTheme';
import strings from '@/util/Strings';
import React from 'react';
import {View} from 'react-native';
interface TruckCountProps {
  truckCount: string;
  setTruckCount: (count: string) => void;
  profileType?: string;
}

const TruckCount: React.FC<TruckCountProps> = ({
  truckCount,
  setTruckCount,
  profileType,
}) => {
  const style = useSignInStyle(profileType);
  const {
    style: {layout, gutter},
  } = useTheme();
  return (
    <View style={[layout.rowVerticalCenter]}>
      <AppTouchableOpacity
        onPress={() => setTruckCount(strings.kyc.one)}
        style={[
          style.truckCountButton,
          truckCount === strings.kyc.one && style.activeTruckButton,
        ]}>
        <AppText
          mode="alternative"
          style={[
            style.truckCountButtonText,
            truckCount === strings.kyc.one && style.activeTruckButtonText,
          ]}>
          {strings.kyc.one}
        </AppText>
      </AppTouchableOpacity>

      <AppTouchableOpacity
        onPress={() => setTruckCount(strings.kyc.ten)}
        style={[
          style.truckCountButton,
          truckCount === strings.kyc.ten && style.activeTruckButton,
          gutter.marginLeft.small,
        ]}>
        <AppText
          mode="alternative"
          style={[
            style.truckCountButtonText,
            truckCount === strings.kyc.ten && style.activeTruckButtonText,
          ]}>
          {strings.kyc.ten}
        </AppText>
      </AppTouchableOpacity>
    </View>
  );
};

export default TruckCount;
