import Animated, {
  cond,
  eq,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

export const useAppearAnimation: (
  progress: Animated.Adaptable<number>,
  options: {
    verticalMove: number;
  },
) => {
  top: Animated.Node<number>;
  pointerEvents: Animated.Node<
    'box-none' | 'none' | 'box-only' | 'auto' | undefined
  >;
  opacity: Animated.Node<number>;
  contentOpacity: Animated.Node<number>;
} = (progress, {verticalMove}) => {
  const top = mix(progress, verticalMove, 0);
  const pointerEvents = cond(eq(progress, 1), 'auto', 'none');
  const opacity = mix(progress, 0, 1);
  const contentOpacity = interpolate(progress, {
    inputRange: [0.9, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return {
    top,
    pointerEvents,
    opacity,
    contentOpacity,
  };
};
