import React, {memo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export const IconButton: React.FC<TouchableOpacityProps> = memo(
  ({activeOpacity = 0.6, style, disabled, ...rest}) => {
    return (
      <TouchableOpacity
        style={[styles.container, disabled && styles.disabledContainer, style]}
        {...{activeOpacity, disabled}}
        {...rest}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.3,
  },
});
