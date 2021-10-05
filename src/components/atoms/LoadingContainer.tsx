import React, {memo} from 'react';
import {View, ActivityIndicator, StyleSheet, ViewProps} from 'react-native';
import {colors} from '../../assets';

interface LoadingContainerProps {
  isBusy?: boolean;
}

export const LoadingContainer: React.FC<ViewProps & LoadingContainerProps> =
  memo(({isBusy = false, style, children, ...rest}) => {
    return (
      <View style={[styles.container, style]} {...rest}>
        {children}
        {isBusy && (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
