import React, {memo, useCallback} from 'react';
import {
  StyleSheet,
  FlatListProps,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {NormalizedVideo} from '../../types';
import {Space, onListItemSelect, VideoCompactItem} from '../atoms';

interface VideosCompactListProps {
  onItemSelect?: onListItemSelect<NormalizedVideo>;
}

export const VideosCompactList: React.FC<
  FlatListProps<NormalizedVideo> & VideosCompactListProps
> = memo(({onItemSelect, ...rest}) => {
  const renderItem: ListRenderItem<NormalizedVideo> = useCallback(
    ({item, index}) => {
      return (
        <VideoCompactItem
          {...item}
          onPress={() => onItemSelect?.({item, index})}
        />
      );
    },
    [],
  );

  return (
    <FlatList
      keyExtractor={item => `${item.id}`}
      ItemSeparatorComponent={() => <Space />}
      contentContainerStyle={styles.scrollContainer}
      {...rest}
      renderItem={renderItem}
    />
  );
});

const styles = StyleSheet.create({
  scrollContainer: {},
});
