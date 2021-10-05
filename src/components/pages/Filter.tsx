import React, {memo, useState, useCallback, useMemo} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {colors, dictionary, typography} from '../../assets';
import {BlurView} from '@react-native-community/blur';
import {GenresWrapList, Header, YearsWrapList} from '../molecules';
import {Space, onListItemSelect} from '../atoms';
import {Genre, Video} from '../../types';

interface FilterOverlayProps {
  genres?: Array<Genre>;
  videos?: Array<Video>;
  defaultSelectedGenres?: Array<Genre>;
  onConfirm?: (value: {genres: Array<Genre>; years: Array<number>}) => void;
}

export const FilterOverlay: React.FC<FilterOverlayProps> = memo(
  ({genres = [], videos = [], defaultSelectedGenres = [], onConfirm}) => {
    const [selectedGenres, setSelectedGenres] = useState<Array<Genre>>(
      defaultSelectedGenres,
    );
    const [selectedYears, setSelectedYears] = useState<Array<number>>([]);

    const onGenreSelect: onListItemSelect<Genre> = useCallback(
      ({item, selected}) => {
        if (selected) setSelectedGenres(prev => [...prev, item]);
        else setSelectedGenres(prev => [...prev.filter(p => p.id !== item.id)]);
      },
      [],
    );

    const onYearSelect: onListItemSelect<number> = useCallback(
      ({item, selected}) => {
        if (selected) setSelectedYears(prev => [...prev, item]);
        else setSelectedYears(prev => [...prev.filter(p => p !== item)]);
      },
      [],
    );

    const years = useMemo(() => {
      return [...new Set(videos.map(({release_year}) => release_year).sort())];
    }, [videos]);

    return (
      <BlurView style={styles.container} blurType="light" blurAmount={15}>
        <Header
          title={dictionary.filterModalTitle}
          actionTitle={dictionary.filterModalConfirmActionTitle}
          onActionPress={() =>
            onConfirm?.({genres: selectedGenres, years: selectedYears})
          }
        />
        <Space />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={typography.sectionTitle}>{dictionary.genres}</Text>
          <Space />
          <GenresWrapList
            data={genres}
            selectedItems={selectedGenres}
            onItemSelect={onGenreSelect}
          />
          <Space size={24} />
          <Text style={typography.sectionTitle}>{dictionary.years}</Text>
          <Space />
          <YearsWrapList
            data={years}
            selectedItems={selectedYears}
            onItemSelect={onYearSelect}
          />
        </ScrollView>
      </BlurView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
});
