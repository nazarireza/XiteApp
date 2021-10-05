import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {colors, typography} from '../../assets';

interface ToggleButtonProps {
  title: string;
  selected?: boolean;
}

export const ToggleButton: React.FC<TouchableOpacityProps & ToggleButtonProps> =
  memo(({title, selected, style, ...rest}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container, style, selected && styles.selectedContainer]}
        {...rest}>
        <Text
          style={[
            typography.title,
            styles.text,
            selected && styles.selectedText,
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  });

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.button.lightBlue,
  },
  text: {
    color: colors.text.black,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.text.primary,
  },
});
