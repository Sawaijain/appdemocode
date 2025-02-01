import useShipperStyle from '@/libs/customStyles/ShipperStyle';
import React, {FC, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
export enum SkeletonVariant {
  BOX = 'box',
  CIRCLE = 'circle',
}
interface SkeletonProps {
  width: string | number;
  height: number;
  variant?: SkeletonVariant;
}
const Skeleton: FC<SkeletonProps> = ({
  width,
  height,
  variant = SkeletonVariant.BOX,
}) => {
  const style = useShipperStyle();
  const opacity = useRef(new Animated.Value(0.3));
  let borderRadius = 0;
  if (variant === SkeletonVariant.CIRCLE) {
    borderRadius = height / 2;
  }
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 1000,
        }),
      ]),
    ).start();
  }, [opacity]);
  return (
    <Animated.View
      style={[
        style.skeleton,
        {height, width, borderRadius, opacity: opacity.current},
      ]}></Animated.View>
  );
};

export default Skeleton;
