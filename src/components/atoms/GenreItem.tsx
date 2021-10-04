import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {colors, typography} from '../../assets';
import {Genre} from '../../types';

interface GenreItemProps extends Genre {
  selected?: boolean;
}

export const GenreItem: React.FC<TouchableOpacityProps & GenreItemProps> = memo(
  ({id, name, selected, ...rest}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container, selected && styles.selectedContainer]}
        {...rest}>
        <Text style={[typography.title, selected && styles.selectedText]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.background.card,
    borderRadius: 5,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.text.primary,
  },
});
