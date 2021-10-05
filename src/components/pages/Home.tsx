import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {Genre, RootStackComponent, Routes} from '../../types';
import {useGetVideosQuery} from '../../services';
import {colors, dictionary, typography} from '../../assets';
import {GenresList, SearchBox, VideosList} from '../molecules';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Space, onListItemSelect} from '../atoms';
import {FilterOverlay} from '.';

export const HomePage: RootStackComponent<Routes.Home> = memo(
  ({navigation}) => {
    const [keyword, setKeyword] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<Array<Genre>>([]);
    const [selectedYears, setSelectedYears] = useState<Array<number>>([]);

    const {data, error, isLoading} = useGetVideosQuery({});

    const onGenreSelect: onListItemSelect<Genre> = useCallback(
      ({item, selected}) => {
        if (selected) setSelectedGenres(prev => [...prev, item]);
        else setSelectedGenres(prev => [...prev.filter(p => p.id !== item.id)]);
      },
      [],
    );

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <Text style={typography.appHeader}>{dictionary.appName}</Text>
          <Space />
          <SearchBox value={keyword} onChange={value => setKeyword(value)} />
        </View>
        <GenresList
          data={data?.genres}
          selectedItems={selectedGenres}
          onItemSelect={onGenreSelect}
        />
        <Space size={8} />
        <VideosList data={data?.videos} />
        <FilterOverlay
          genres={data?.genres}
          defaultSelectedGenres={selectedGenres}
          videos={data?.videos}
        />
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.page,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
