import React, {memo, useCallback} from 'react';
import {
  StyleSheet,
  FlatListProps,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import {Video} from '../../types';
import {Space, VideoItem, onListItemSelect} from '../atoms';

interface VideosListProps {
  onItemSelect?: onListItemSelect<Video>;
}

const CONTAINER_HORIZONTAL_PADDING = 24,
  ITEM_HORIZONTAL_PADDING = 16;

export const VideosList: React.FC<FlatListProps<Video> & VideosListProps> =
  memo(({onItemSelect, ...rest}) => {
    const {width} = useWindowDimensions();

    const renderItem: ListRenderItem<Video> = useCallback(
      ({item, index}) => {
        const imageWidth =
          (width - CONTAINER_HORIZONTAL_PADDING * 2 - ITEM_HORIZONTAL_PADDING) /
          2;
        return (
          <VideoItem
            style={{
              width: imageWidth,
              marginEnd: ITEM_HORIZONTAL_PADDING,
            }}
            {...item}
            onPress={() => onItemSelect?.({item, index})}
          />
        );
      },
      [width],
    );

    return (
      <FlatList
        keyExtractor={item => `${item.id}`}
        numColumns={2}
        ItemSeparatorComponent={() => <Space size={30} />}
        contentContainerStyle={styles.scrollContainer}
        {...rest}
        renderItem={renderItem}
      />
    );
  });

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
    paddingVertical: 16,
  },
});
