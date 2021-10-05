import React, {memo} from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../assets';
import {IconBaseProps} from '.';

export const IconClose: React.FC<IconBaseProps> = memo(
  ({color = colors.text.primary, size = 24}) => {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill={color}
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </Svg>
    );
  },
);
