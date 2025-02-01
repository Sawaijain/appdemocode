import React, {ReactElement} from 'react';
import {
  LayoutAnimation,
  TouchableOpacity,
  UIManager,
  View,
  StyleSheet,
} from 'react-native';
import {AppText} from './AppText';
import {isAndroid} from '@/libs';
import {ChevronIcon} from './icons/Icon';
import {useTheme} from '@/hooks/useTheme';

interface IAccordeon {
  title: string;
  children: React.FC | ReactElement;
  initialStateOpen?: boolean;
  alwaysOpen?: boolean;
}
const AppAccordeon: React.FC<IAccordeon> = ({
  children,
  title,
  initialStateOpen,
  alwaysOpen,
}) => {
  const [isOpen, setIsOpen] = React.useState(
    (!!initialStateOpen || !!alwaysOpen) ?? false,
  );
  const styles = useStyle();
  if (isAndroid) {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const toggleAccordeon = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.accordeonContainer}>
      <TouchableOpacity onPress={alwaysOpen ? undefined : toggleAccordeon}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <ChevronIcon direction={isOpen ? 'up' : 'forward'} size={20} />
        </View>
      </TouchableOpacity>
      {isOpen && <>{children}</>}
    </View>
  );
};
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color, fontSize},
  } = useTheme();
  return StyleSheet.create({
    accordeonContainer: {
      ...gutter.marginTop.regular,
      ...gutter.paddingBottom.small,
      overflow: 'hidden',
      borderBottomWidth: 1,
      borderBottomColor: color.borderbottom,
      ...gutter.padding.regular,
      backgroundColor: color.gray50,
      ...gutter.marginBottom.regular,
      ...gutter.marginHorizontal.regular,
      borderRadius: 10,
    },
    title: {
      fontSize: fontSize.alternative,
      color: color.tabText,
    },
    titleContainer: {
      ...layout.rowVerticalCenter,
      ...layout.justifyContentBetween,
    },
  });
}

export default AppAccordeon;
