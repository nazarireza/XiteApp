import React, {memo} from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../assets';
import {IconBaseProps} from '../../types/components';

export const IconSearch: React.FC<IconBaseProps> = memo(
  ({color = colors.text.primary, size = 24}) => {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill={color}
          fillRule="nonzero"
          d="M16.294 14.579h-.903l-.32-.31a7.4 7.4 0 001.795-4.836 7.433 7.433 0 10-7.433 7.433c1.84 0 3.533-.675 4.837-1.796l.309.32v.904L20.296 22 22 20.296l-5.706-5.717zm-6.861 0a5.139 5.139 0 01-5.146-5.146 5.138 5.138 0 015.146-5.146 5.139 5.139 0 015.146 5.146 5.14 5.14 0 01-5.146 5.146z"
        />
      </Svg>
    );
  },
);
