import React, {forwardRef, memo} from 'react';
import {StyleSheet, View, TextInput, TextInputProps} from 'react-native';
import {colors, dictionary} from '../../assets';
import {IconButton, IconClose, IconSearch, Space} from '../atoms';

interface SearchBoxProps {
  value?: string;
  placeHolder?: string;
  onChange?: (keyword: string) => void;
}

export const SearchBox = memo(
  forwardRef<TextInput, TextInputProps & SearchBoxProps>(
    (
      {placeHolder = dictionary.searchBoxPlaceHolder, onChange, value, ...rest},
      ref,
    ) => {
      const hasValue = !!value;
      return (
        <View style={styles.container}>
          <IconSearch color={colors.text.secondary} />
          <Space size={8} />
          <TextInput
            ref={ref}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder={placeHolder}
            placeholderTextColor={colors.text.secondary}
            returnKeyType="search"
            {...rest}
          />
          {hasValue && (
            <IconButton onPress={() => onChange?.('')}>
              <IconClose />
            </IconButton>
          )}
        </View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    paddingVertical:12,
  },
});
