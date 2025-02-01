import {useTheme} from '@/hooks/useTheme';
import IMAGE_URL from '@/theme/ImageUrl';
import {normalize} from '@/theme/Utils';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

interface StepperProps {
  activeStep: number;
  totalSteps: number;
  profileType?: string;
}

const Stepper: React.FC<StepperProps> = ({
  activeStep,
  totalSteps,
  profileType,
}) => {
  const styles = useStyle(profileType);
  return (
    <View style={styles.container}>
      {Array.from({length: totalSteps}).map((_, index) => {
        const isStepActive = index <= activeStep;
        const stepStyle = isStepActive
          ? styles.activeDotContainer
          : styles.dotContainer;
        const dotStyle = isStepActive ? styles.activeDot : styles.dot;
        const lineStyle = isStepActive ? styles.activeLine : styles.line;
        return (
          <React.Fragment key={index}>
            {index !== 0 && <View style={lineStyle} />}
            <View style={stepStyle}>
              <View style={dotStyle} />
              {index == activeStep && (
                <Image source={IMAGE_URL.truck} style={styles.image} />
              )}
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

function useStyle(profileType?: string) {
  const {
    style: {layout},
    value: {color},
  } = useTheme();
  return StyleSheet.create({
    container: {
      ...layout.rowVerticalCenter,
    },
    dotContainer: {
      alignItems: 'center',
    },
    activeDotContainer: {
      alignItems: 'center',
      position: 'relative',
    },
    dot: {
      width: normalize(12),
      height: normalize(12),
      borderRadius: normalize(6),
      backgroundColor: color.border,
      borderWidth: 1,
      borderColor: color.buttonNew,
    },
    activeDot: {
      width: normalize(12),
      height: normalize(12),
      borderRadius: normalize(6),
      backgroundColor:
        profileType === 'driver'
          ? color.driver
          : profileType === 'transporter'
          ? color.transporter
          : profileType === 'transporter'
          ? color.buttonNew
          : color.buttonNew,
    },
    line: {
      flex: 1,
      height: 3,
      backgroundColor: color.border,
    },
    activeLine: {
      flex: 1,
      height: 3,
      backgroundColor:
        profileType === 'driver'
          ? color.driver
          : profileType === 'transporter'
          ? color.transporter
          : profileType === 'transporter'
          ? color.buttonNew
          : color.buttonNew,
    },
    image: {
      position: 'absolute',
      bottom: -normalize(30),
      width: normalize(32),
      height: normalize(19),
    },
  });
}

export default Stepper;
