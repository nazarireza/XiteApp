import React, {memo, useMemo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {VideosCompactList} from '../molecules';
import {NormalizedVideo} from '../../types';
import {useGetVideosQuery} from '../../services';
import Animated from 'react-native-reanimated';
import {useAppearAnimation} from './useAppearAnimation';
import {colors} from '../../assets';
import {SafeAreaView} from 'react-native-safe-area-context';

interface SearchOverlayProps {
  keyword: string;
  progress: Animated.Adaptable<number>;
  isVisible: boolean;
}

export const SerachOverlay: React.FC<SearchOverlayProps> = memo(
  ({keyword, progress, isVisible}) => {
    const [query, setQuery] = useState(keyword);

    const {data: {videos = [], genres = []} = {}} = useGetVideosQuery({});

    useEffect(() => {
      const timeOutId = setTimeout(() => setQuery(keyword), 500);
      return () => clearTimeout(timeOutId);
    }, [keyword]);

    const normalizedVideos: NormalizedVideo[] = useMemo(
      () =>
        videos.map(item => ({
          ...item,
          genre: genres.find(p => p.id == item.genre_id),
        })),
      [videos],
    );

    const searchResult: NormalizedVideo[] = useMemo(
      () =>
        normalizedVideos.filter(item => {
          return `${item.artist}${item.title}${item.genre?.name}`
            .toLowerCase()
            .includes(query.toLowerCase());
        }),
      [normalizedVideos, query],
    );

    const {opacity, top} = useAppearAnimation(progress, {
      verticalMove: 20,
    });

    return (
      <SafeAreaView
        style={styles.container}
        pointerEvents={isVisible ? 'auto' : 'none'}>
        <Animated.View
          style={[styles.contentContainer, {opacity}]}>
          <Animated.View
            style={[
              styles.blurContainer,
              {
                top,
              },
            ]}>
            <VideosCompactList data={searchResult} />
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
  },
  contentContainer: {
    flex: 1,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.page,
  },
});
