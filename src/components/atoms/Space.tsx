import React, {memo} from 'react';
import {View} from 'react-native';

interface SpaceProps {
  size?: number;
}

export const Space: React.FC<SpaceProps> = memo(({size = 16}) => {
  return <View style={{height: size, width: size}} />;
});
