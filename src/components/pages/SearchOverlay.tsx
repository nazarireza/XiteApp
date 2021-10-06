import React, {memo, useMemo, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
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
    const [searchResult, setSearchResult] = useState<Array<NormalizedVideo>>(
      [],
    );

    const {data: {videos = [], genres = []} = {}} = useGetVideosQuery({});

    const normalizedVideos: NormalizedVideo[] = useMemo(
      () =>
        videos.map(item => ({
          ...item,
          genre: genres.find(p => p.id == item.genre_id),
        })),
      [videos],
    );

    // FIXME: This is a mock implementation for simulating the server-side logic and should be remove
    useEffect(() => {
      const timeOutId = setTimeout(() => {
        const result = normalizedVideos.filter(item => {
          return `${item.artist}${item.title}${item.genre?.name}`
            .toLowerCase()
            .includes(keyword.toLowerCase());
        });
        setSearchResult(result);
      }, 500);
      return () => clearTimeout(timeOutId);
    }, [normalizedVideos, keyword]);

    const {opacity, top} = useAppearAnimation(progress, {
      verticalMove: 20,
    });

    return (
      <SafeAreaView
        style={styles.container}
        pointerEvents={isVisible ? 'auto' : 'none'}>
        <Animated.View style={[styles.contentContainer, {opacity}]}>
          <Animated.View
            style={[
              styles.blurContainer,
              {
                top,
              },
            ]}>
            <VideosCompactList data={searchResult} renderItem={null} />
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
