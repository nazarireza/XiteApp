import React, {memo} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {colors, dictionary, typography} from '../../assets';
import {IconBack, Space} from '../atoms';
import Animated, {cond, eq} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
  actionTitle?: string;
  onActionPress?: () => void;
  dissmissable?: boolean;
  progress?: Animated.Adaptable<number>;
}

export const Header: React.FC<HeaderProps> = memo(
  ({
    title = dictionary.filterModalTitle,
    actionTitle,
    onActionPress,
    onBackPress,
    dissmissable = true,
    children,
    progress = new Animated.Value(0),
  }) => {
    const hasAction = !!actionTitle;

    const marginTop = mix(progress, 0, -10);
    const opacity = mix(progress, 1, 0);
    const pointerEvents = cond(eq(progress, 0), 'auto', 'none');
    const childTop = mix(progress, 10, 0);
    const childOpacity = mix(progress, 0, 1);

    return (
      <View style={styles.rootContainer}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {top: childTop, opacity: childOpacity},
          ]}>
          {children}
        </Animated.View>
        <Animated.View
          style={[styles.container, {marginTop, opacity}]}
          {...{pointerEvents}}>
          <TouchableOpacity
            disabled={!dissmissable}
            style={styles.titleContainer}
            activeOpacity={0.7}
            onPress={onBackPress}>
            {dissmissable && (
              <>
                <IconBack color={colors.text.primary} />
                <Space size={8} />
              </>
            )}
            <Text style={typography.header}>{title}</Text>
          </TouchableOpacity>
          {hasAction && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.actionContainer}
              onPress={onActionPress}>
              <Text style={typography.headerAction}>{actionTitle}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  rootContainer: {
    height: 40,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
