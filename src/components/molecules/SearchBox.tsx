import React, {memo} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, dictionary} from '../../assets';
import {IconButton, IconClose, IconSearch, Space} from '../atoms';

interface SearchBoxProps {
  value?: string;
  placeHolder?: string;
  onChange?: (keyword: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = memo(
  ({placeHolder = dictionary.searchBoxPlaceHolder, onChange, value}) => {
    const hasValue = !!value;
    return (
      <View style={styles.container}>
        <IconSearch color={colors.text.secondary} />
        <Space size={8} />
        <TextInput
          onChangeText={onChange}
          value={value}
          style={styles.input}
          placeholder={placeHolder}
          placeholderTextColor={colors.text.secondary}
          returnKeyType="search"
        />
        {hasValue && (
          <IconButton onPress={() => onChange?.('')}>
            <IconClose />
          </IconButton>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
  },
});
