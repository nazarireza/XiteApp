import React, {memo, useState, useCallback, useMemo} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {dictionary, typography} from '../../../assets';
import {BlurView} from '@react-native-community/blur';
import {GenresWrapList, Header, YearsWrapList} from '../../molecules';
import {Space, onListItemSelect} from '../../atoms';
import {Genre, Video} from '../../../types';
import Animated from 'react-native-reanimated';
import {useAppearAnimation} from '../useAppearAnimation';

interface FilterOverlayProps {
  genres?: Array<Genre>;
  videos?: Array<Video>;
  defaultSelectedGenres?: Array<Genre>;
  defaultSelectedYears?: Array<number>;
  onConfirm?: OnFilterConfirmed;
  onDismiss?: () => void;
  progress: Animated.Adaptable<number>;
}

export type OnFilterConfirmed = (value: {
  genres: Array<Genre>;
  years: Array<number>;
}) => void;

export const FilterOverlay: React.FC<FilterOverlayProps> = memo(
  ({
    genres = [],
    videos = [],
    defaultSelectedGenres = [],
    onConfirm,
    onDismiss,
    defaultSelectedYears = [],
    progress,
  }) => {
    const [selectedGenres, setSelectedGenres] = useState(defaultSelectedGenres);
    const [selectedYears, setSelectedYears] = useState(defaultSelectedYears);

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

    const {opacity, contentOpacity, top, pointerEvents} = useAppearAnimation(
      progress,
      {verticalMove: 100},
    );

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[
          styles.container,
          {
            opacity,
          },
        ]}>
        <BlurView
          blurType="dark"
          style={StyleSheet.absoluteFillObject}
          blurAmount={10}>
          <Animated.View
            style={[
              styles.blurContainer,
              {
                opacity: contentOpacity,
                top: top,
              },
            ]}>
            <Header
              title={dictionary.filterModalTitle}
              actionTitle={dictionary.filterModalConfirmActionTitle}
              onBackPress={onDismiss}
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
          </Animated.View>
        </BlurView>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
});
