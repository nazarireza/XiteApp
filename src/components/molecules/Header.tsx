import React, {memo} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {colors, dictionary, typography} from '../../assets';
import {IconBack, Space} from '../atoms';

interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
  actionTitle?: string;
  onActionPress?: () => void;
  dissmissable?: boolean;
}

export const Header: React.FC<HeaderProps> = memo(
  ({
    title = dictionary.filterModalTitle,
    actionTitle,
    onActionPress,
    onBackPress,
    dissmissable = true,
  }) => {
    const hasAction = !!actionTitle;
    return (
      <View style={styles.container}>
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
      </View>
    );
  },
);

const styles = StyleSheet.create({
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
