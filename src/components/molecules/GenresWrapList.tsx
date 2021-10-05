import React, {memo, useCallback} from 'react';
import {Genre} from '../../types';
import {
  ToggleButton,
  WrapList,
  WrapListProps,
  WrapListRenderItem,
} from '../atoms';

export const GenresWrapList: React.FC<WrapListProps<Genre>> = memo(props => {
  const renderItem: WrapListRenderItem<Genre> = useCallback(
    ({item, index, selected, onSelect}) => {
      return (
        <ToggleButton
          title={item.name}
          selected={selected}
          onPress={() => onSelect?.({item, index, selected: !selected})}
        />
      );
    },
    [],
  );

  return (
    <WrapList
      {...props}
      {...{renderItem}}
      keyExtractor={(item: Genre) => `${item.id}`}
    />
  );
});
