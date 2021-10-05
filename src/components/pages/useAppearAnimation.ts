import Animated from 'react-native-reanimated';
import {mix} from 'react-native-redash';

export const useAppearAnimation: (
  progress: Animated.Adaptable<number>,
  options: {
    verticalMove: number;
  },
) => {
  top: Animated.Node<number>;
  opacity: Animated.Node<number>;
} = (progress, {verticalMove}) => {
  const top = mix(progress, verticalMove, 0);
  const opacity = mix(progress, 0, 1);

  return {
    top,
    opacity,
  };
};
