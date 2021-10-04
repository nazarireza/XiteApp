import React, {memo} from 'react';
import Svg, {Path} from 'react-native-svg';
import { colors } from '../../assets';
import {IconBaseProps} from '../../types/components';

export const IconBack: React.FC<IconBaseProps> = memo(
  ({color = colors.text.primary, size = 24}) => {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill={color}
          d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11z"
        />
      </Svg>
    );
  },
);
