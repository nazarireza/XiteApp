import React, {memo, useState, useCallback, useMemo, useEffect} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {colors, dictionary, typography} from '../../../assets';
import {GenresWrapList, Header, YearsWrapList} from '../../molecules';
import {Space, onListItemSelect} from '../../atoms';
import {Genre, Video} from '../../../types';
import Animated from 'react-native-reanimated';
import {useAppearAnimation} from '../useAppearAnimation';
import {SafeAreaView} from 'react-native-safe-area-context';

interface FilterOverlayProps {
  genres?: Array<Genre>;
  videos?: Array<Video>;
  defaultSelectedGenres?: Array<Genre>;
  defaultSelectedYears?: Array<number>;
  onConfirm?: OnFilterConfirmed;
  onDismiss?: () => void;
  progress: Animated.Adaptable<number>;
  isVisible: boolean;
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
    isVisible,
  }) => {
    const [selectedGenres, setSelectedGenres] = useState(defaultSelectedGenres);
    const [selectedYears, setSelectedYears] = useState(defaultSelectedYears);

    // "selectedGenres" will be updated when the "defaultSelectedGenres" are updated on the dashboard page
    useEffect(
      () => setSelectedGenres(defaultSelectedGenres),
      [defaultSelectedGenres],
    );

    const onGenreSelect: onListItemSelect<Genre> = useCallback(
      ({item, selected}) =>
        setSelectedGenres(prev =>
          selected ? [...prev, item] : [...prev.filter(p => p.id !== item.id)],
        ),
      [],
    );

    const onYearSelect: onListItemSelect<number> = useCallback(
      ({item, selected}) =>
        setSelectedYears(prev =>
          selected ? [...prev, item] : [...prev.filter(p => p !== item)],
        ),
      [],
    );

    const years = useMemo(
      () => [...new Set(videos.map(({release_year}) => release_year).sort())],
      [videos],
    );

    const {opacity, top} = useAppearAnimation(progress, {
      verticalMove: 20,
    });

    return (
      <SafeAreaView
        style={styles.container}
        pointerEvents={isVisible ? 'auto' : 'none'}>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity,
            },
          ]}>
          <Animated.View
            style={[
              styles.blurContainer,
              {
                top,
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              <Text style={typography.sectionTitle}>{dictionary.genres}</Text>
              <Space />
              <GenresWrapList
                renderItem={null}
                keyExtractor={({id}) => `${id}`}
                data={genres}
                selectedItems={selectedGenres}
                onItemSelect={onGenreSelect}
              />
              <Space size={24} />
              <Text style={typography.sectionTitle}>{dictionary.years}</Text>
              <Space />
              <YearsWrapList
                renderItem={null}
                keyExtractor={year => `${year}`}
                data={years}
                selectedItems={selectedYears}
                onItemSelect={onYearSelect}
              />
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 24,
    backgroundColor: colors.background.page,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
});
