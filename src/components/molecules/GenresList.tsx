import React, {memo, useCallback} from 'react';
import {
  StyleSheet,
  FlatListProps,
  FlatList,
  ListRenderItem,
  View,
  TouchableOpacityProps,
} from 'react-native';
import {colors} from '../../assets';
import {Genre} from '../../types';
import {IconButton, IconFilter, Space, GenreItem, onListItemSelect} from '../atoms';

interface GenresListProps {
  onFilterPress?: () => void;
  selectedItems?: Array<Genre>;
  onItemSelect?: onListItemSelect<Genre>;
}

export const GenresList: React.FC<FlatListProps<Genre> & GenresListProps> =
  memo(({onFilterPress, selectedItems, onItemSelect, ...rest}) => {
    const renderItem: ListRenderItem<Genre> = useCallback(
      ({item, index}) => {
        const selected = selectedItems?.some(p => p.id == item.id);
        return (
          <GenreItem
            {...item}
            selected={selected}
            onPress={() => onItemSelect?.({item, index, selected: !selected})}
          />
        );
      },
      [selectedItems],
    );

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => <FilterButton onPress={onFilterPress} />}
          ItemSeparatorComponent={() => <Space size={8} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.scrollContainer}
          {...rest}
          renderItem={renderItem}
        />
      </View>
    );
  });

const FilterButton: React.FC<TouchableOpacityProps> = memo(props => {
  return (
    <IconButton style={styles.filterButton} {...props}>
      <IconFilter />
    </IconButton>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  filterButton: {
    marginEnd: 8,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
});
