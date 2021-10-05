import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  View,
} from 'react-native';
import {Space} from '.';
import {typography} from '../../assets';
import {NormalizedVideo} from '../../types';

interface VideoItemProps extends NormalizedVideo {}

export const VideoCompactItem: React.FC<
  TouchableOpacityProps & VideoItemProps
> = memo(({id, title, artist, image_url, ...rest}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} {...rest}>
      <Image
        style={styles.thumbnailImage}
        source={{uri: image_url}}
        resizeMode="contain"
      />
      <Space size={8} />
      <View>
        <Text style={typography.title}>{title}</Text>
        <Text style={typography.subtitle}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 80,
    height: 50,
  },
});
