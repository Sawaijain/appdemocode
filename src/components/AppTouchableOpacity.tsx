import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import React, { FC } from "react";
import { StyleProps } from "./Props";

type Props = Omit<TouchableOpacityProps, "style"> &
  StyleProps<ViewStyle> & {
    children?: React.ReactNode;
  };

const AppTouchableOpacity: FC<Props> = ({ children, ...props }) => {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};

export default AppTouchableOpacity;
