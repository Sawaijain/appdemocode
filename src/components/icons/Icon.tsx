import React from 'react';
import {TextStyle} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SizeProps, StyleProps} from './Props';

export type BaseIconProps = StyleProps<TextStyle> &
  SizeProps & {color?: string};

const BaseIonIcon = ({
  style,
  size,
  name,
  color,
}: BaseIconProps & {name: string}) => {
  return <IonIcon style={style} name={name} size={size} color={color} />;
};

const BaseSimpleLineIcon = ({
  style,
  size,
  name,
  color,
}: BaseIconProps & {name: string}) => {
  return <SimpleLineIcon style={style} name={name} size={size} color={color} />;
};

const BaseFoundationIcon = ({
  style,
  size,
  name,
  color,
}: BaseIconProps & {name: string}) => {
  return <FoundationIcon style={style} name={name} size={size} color={color} />;
};

const BaseFontAwesomeIcon = ({
  style,
  size,
  name,
  color,
}: BaseIconProps & {name: string}) => {
  return (
    <FontAwesomeIcon style={style} name={name} size={size} color={color} />
  );
};

const BaseOcticonsIcon = ({
  style,
  size,
  name,
  color,
}: BaseIconProps & {name: string}) => {
  return <Octicons style={style} name={name} size={size} color={color} />;
};
const BaseAntDesignIcon = ({
  style,
  size,
  name,
  color,
}: BaseIconProps & {name: string}) => {
  return <AntDesign style={style} name={name} size={size} color={color} />;
};

export const ShareIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="share-outline" />
);

export const CameraIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="camera-outline" />
);

export const HomeIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="home-outline" />
);

export const GraduationIcon = (props: BaseIconProps) => (
  <BaseSimpleLineIcon {...props} name="graduation" />
);

export const NotesIcon = (props: BaseIconProps) => (
  <BaseFoundationIcon {...props} name="clipboard-notes" />
);

export const LocationPinIcon = (props: BaseIconProps) => (
  <BaseSimpleLineIcon {...props} name="location-pin" />
);

export const ProfileIcon = (props: BaseIconProps) => (
  <BaseFontAwesomeIcon {...props} name="user-circle-o" />
);

export const SignOutIcon = (props: BaseIconProps) => (
  <BaseFontAwesomeIcon {...props} name="sign-out" />
);

export const PhoneIcon = (props: BaseIconProps) => (
  <FontAwesomeIcon {...props} name="phone" />
);

export const CheckCircleIcon = (props: BaseIconProps) => (
  <BaseOcticonsIcon {...props} name="check-circle-fill" />
);

export const CheckIcon = (props: BaseIconProps) => (
  <BaseOcticonsIcon {...props} name="check" />
);

export const CircleEmptyIcon = (props: BaseIconProps) => (
  <BaseOcticonsIcon {...props} name="circle" />
);

export const CloseIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="close" />
);

export const CloseCircleIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="ios-close-circle-outline" />
);

export const AddIcon = (props: BaseIconProps) => (
  <BaseOcticonsIcon {...props} name="plus" />
);

export const MenuIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="menu" />
);

export const RefreshIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="refresh" />
);

export const NotificationIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="notifications-outline" />
);

export const ChevronForwardIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="chevron-forward" />
);

export const ChevronDownIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="chevron-up-outline" />
);

export const SearchIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="search" />
);

export const ExclamationIcon = (props: BaseIconProps) => (
  <BaseFontAwesomeIcon {...props} name="exclamation-circle" />
);

export const AddCircleIcon = (props: BaseIconProps) => (
  <BaseOcticonsIcon {...props} name="plus-circle" />
);

export const RemoveCircleIcon = (props: BaseIconProps) => (
  <BaseSimpleLineIcon {...props} name="minus" />
);

export const UpIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="arrow-up-outline" />
);

export const BackIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="arrow-back" />
);

export const EyeIcon = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="eye-outline" />
);
export const CheckMark = (props: BaseIconProps) => (
  <BaseIonIcon {...props} name="checkmark-circle-sharp" />
);

export const EditIcon = (props: BaseIconProps) => (
  <BaseAntDesignIcon {...props} name="edit" />
);

export type StarIconProps = BaseIconProps & {empty?: boolean};
export const StarIcon = ({empty, ...props}: StarIconProps) => (
  <BaseIonIcon {...props} name={`star${empty ? '-outline' : ''}`} />
);

export type ChevronProps = BaseIconProps & {
  direction?: 'up' | 'forward' | 'down' | 'back';
};
export const ChevronIcon = ({
  direction = 'forward',
  ...props
}: ChevronProps) => <BaseIonIcon {...props} name={`chevron-${direction}`} />;

export type HeartProps = BaseIconProps & {filled: boolean};
export const HeartIcon = ({filled, ...props}: HeartProps) => (
  <BaseIonIcon {...props} name={`ios-heart-${filled ? 'sharp' : 'outline'}`} />
);
