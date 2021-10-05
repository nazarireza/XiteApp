import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

export type onListItemSelect<T> = (item: {
  item: T;
  index: number;
  selected?: boolean;
}) => void;

export interface WrapListProps<T> {
  data?: Array<T>;
  selectedItems?: Array<T>;
  onItemSelect?: onListItemSelect<T>;
  keyExtractor: (item: T) => string;
  renderItem: WrapListRenderItem<T>;
}

export type WrapListRenderItem<T> = (item: {
  item: T;
  index: number;
  selected?: boolean;
  onSelect?: onListItemSelect<T>;
}) => React.ReactElement;

export const WrapList: React.FC<WrapListProps<any>> = memo(
  ({data = [], selectedItems, onItemSelect, keyExtractor, renderItem}) => {
    const normalizedRenderItem: (
      item: any,
      index: number,
    ) => React.ReactElement = useCallback(
      (item, index) => {
        const selected = selectedItems?.some(
          p => keyExtractor(p) == keyExtractor(item),
        );
        return (
          <View style={styles.itemContainer} key={keyExtractor(item)}>
            {renderItem({item, index, selected, onSelect: onItemSelect})}
          </View>
        );
      },
      [selectedItems, renderItem, keyExtractor],
    );

    return (
      <View style={styles.container}>
        {data?.map((item, index) => normalizedRenderItem(item, index))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  itemContainer: {
    marginEnd: 8,
    marginBottom: 8,
  },
});
