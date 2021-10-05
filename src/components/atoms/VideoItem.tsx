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
import {Video} from '../../types';

interface VideoItemProps extends Video {}

export const VideoItem: React.FC<TouchableOpacityProps & VideoItemProps> = memo(
  ({id, title, artist, image_url, ...rest}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.container} {...rest}>
        <Image style={styles.thumbnailImage} source={{uri: image_url}} />
        <Space size={8} />
        <View style={styles.textsContainer}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={typography.title}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={typography.subtitle}>
            {artist}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  thumbnailImage: {
    height: 200,
  },
  textsContainer: {
    paddingHorizontal: 8,
  },
});
