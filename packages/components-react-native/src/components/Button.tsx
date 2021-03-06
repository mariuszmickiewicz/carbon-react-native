import React from 'react';
import PropTypes from 'prop-types';
import { white as theme } from '@carbon/themes';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  PressableProps,
  TextStyle,
  TextProps,
  Platform,
  ViewProps,
  PixelRatio,
} from 'react-native';

export interface ButtonProps {
  title: string;
  titleProps?: TextProps;
  titleStyle?: StyleProp<TextStyle>;
  buttonProps?: PressableProps;
  buttonStyle?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  containerProps?: ViewProps;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  disabledTitleStyle?: StyleProp<TextStyle>;
  disabledButtonStyle?: StyleProp<ViewStyle>;
  kind?: 'primary' | 'secondary' | 'tertiary' | 'danger';
}

// TODO: flatten necessary?

/*
 * Engineering notes
 * - rename native events when destructuring: onEvent => onEventProp
 * - call event handlers as soon as possible
 * - event handlers called handleX locally
 * - Explicit prop pass through for each component (no {...rest}) it's to difficult for devs to know where it ends up in compound components
 * - user styles go last so they can override ours
 * - user props go last so they have ultimate control
 */

/*
 * Style order
 * 1. our styles
 * 2. their styles
 * 3. Our variant style
 * 4. their variant style
 */

const Button: React.FC<ButtonProps> = ({
  title,
  titleProps,
  titleStyle: titleStyleProp,
  buttonProps,
  containerProps,
  containerStyle: containerStyleProp,
  kind = 'primary',
  disabled = false,
  disabledButtonStyle: disabledButtonStyleProp,
  disabledTitleStyle: disabledTitleStyleProp,
}) => {
  const viewStyle = [styles.container, containerStyleProp];

  const disabledButtonStyle = [styles.disabledButton, disabledButtonStyleProp];

  const disabledTitleStyle = [styles.disabledTitle, disabledTitleStyleProp];

  return (
    <Pressable
      style={[styles.button, styles[kind], disabled && disabledButtonStyle]}
      {...buttonProps}>
      {title && (
        <Text
          style={[
            styles.title,
            kind === 'tertiary' && styles.tertiaryTitle,
            titleStyleProp,
            disabled && disabledTitleStyle,
          ]}
          {...titleProps}>
          {PixelRatio.getFontScale()}
        </Text>
      )}
    </Pressable>
  );
};

// style order should go from container in
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 16 * Math.min(PixelRatio.getFontScale(), 1),
  },
  title: {
    fontFamily: 'IBMPlexSans',
    color: theme.text04,
    fontSize: Platform.select({
      android: 16,
      default: 18,
    }),
  },
  primary: {
    backgroundColor: theme.interactive01,
  },
  secondary: {
    backgroundColor: theme.interactive02,
  },
  tertiary: {
    borderWidth: 1,
    borderColor: theme.interactive03,
    backgroundColor: 'transparent',
  },
  tertiaryTitle: {
    color: theme.interactive03,
  },
  activeTertiaryTitle: {
    color: theme.text04,
  },
  danger: {
    backgroundColor: theme.danger,
  },
  disabledButton: {
    backgroundColor: theme.disabled02,
  },
  disabledTitle: {
    color: theme.disabled03,
  },
});

/*
 * const pressedStyles = StyleSheet.create({
 *   primary: {
 *     backgroundColor: theme.activePrimary,
 *   },
 *   secondary: {
 *     backgroundColor: theme.activeSecondary,
 *   },
 *   tertiary: {
 *     borderColor: theme.activeTertiary,
 *     backgroundColor: theme.activeTertiary,
 *     color: theme.text01,
 *   },
 *   danger: {
 *     backgroundColor: theme.activeDanger,
 *   },
 * });
 */

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Button;
