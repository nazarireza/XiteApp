import React, {memo, useMemo, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {VideosCompactList} from '../molecules';
import {NormalizedVideo} from '../../types';
import {useGetVideosQuery} from '../../services';

interface SearchOverlayProps {
  keyword: string;
  onDismiss?: () => void;
}

export const SerachOverlay: React.FC<SearchOverlayProps> = memo(
  ({keyword, onDismiss}) => {
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

    return (
      <BlurView style={styles.container} blurType="dark" blurAmount={15}>
        <VideosCompactList data={searchResult} />
      </BlurView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 155,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
