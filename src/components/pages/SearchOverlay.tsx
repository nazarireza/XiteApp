import React, {memo, useMemo, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {VideosCompactList} from '../molecules';
import {NormalizedVideo} from '../../types';
import {useGetVideosQuery} from '../../services';
import Animated from 'react-native-reanimated';
import {useAppearAnimation} from './useAppearAnimation';

interface SearchOverlayProps {
  keyword: string;
  progress: Animated.Adaptable<number>;
}

export const SerachOverlay: React.FC<SearchOverlayProps> = memo(
  ({keyword, progress}) => {
    const [query, setQuery] = useState(keyword);

    const {data: {videos = [], genres = []} = {}} = useGetVideosQuery({});

    useEffect(() => {
      const timeOutId = setTimeout(() => setQuery(keyword), 500);
      return () => clearTimeout(timeOutId);
    }, [keyword]);

    const normalizedVideos: NormalizedVideo[] = useMemo(() => {
      return videos.map(item => ({
        ...item,
        genre: genres.find(p => p.id == item.genre_id),
      }));
    }, [videos]);

    const searchResult: NormalizedVideo[] = useMemo(() => {
      return normalizedVideos.filter(
        ({title, artist, genre: {name: genreName} = {}}) =>
          `${artist}${title}${genreName}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      );
    }, [normalizedVideos, query]);

    const {opacity, top, pointerEvents} = useAppearAnimation(progress, {
      verticalMove: 20,
    });

    return (
      <Animated.View style={[styles.container, {opacity}]} {...{pointerEvents}}>
        <BlurView
          style={StyleSheet.absoluteFillObject}
          blurType="dark"
          blurAmount={15}>
          <Animated.View
            style={[
              styles.blurContainer,
              {
                top,
              },
            ]}>
            <VideosCompactList data={searchResult} />
          </Animated.View>
        </BlurView>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 155,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
