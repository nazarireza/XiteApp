import React, {memo, useCallback} from 'react';
import {
  ToggleButton,
  WrapList,
  WrapListProps,
  WrapListRenderItem,
} from '../atoms';

export const YearsWrapList: React.FC<WrapListProps<number>> = memo(props => {
  const renderItem: WrapListRenderItem<number> = useCallback(
    ({item, index, selected, onSelect}) => {
      return (
        <ToggleButton
          title={`${item}`}
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
      keyExtractor={(item: number) => `${item}`}
    />
  );
});
