import React, {memo, useCallback, useReducer, useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {Genre, RootStackComponent, Routes} from '../../types';
import {useGetVideosQuery} from '../../services';
import {colors, dictionary, typography} from '../../assets';
import {GenresList, Header, SearchBox, VideosList} from '../molecules';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Space, onListItemSelect} from '../atoms';
import {FilterOverlay, OnFilterConfirmed, SerachOverlay} from '.';
import {initialState, reducer, Types} from './filterOverlay/store';

export const HomePage: RootStackComponent<Routes.Home> = memo(
  ({navigation}) => {
    const [
      {
        keyword,
        filterIsVisisble,
        searchIsVisible,
        selectedGenres,
        selectedYears,
      },
      dispatch,
    ] = useReducer(reducer, initialState);

    const {data, error, isLoading} = useGetVideosQuery({});

    const onGenreSelect: onListItemSelect<Genre> = useCallback(
      ({item, selected}) => {
        dispatch({
          type: Types.SET_SELECTED_GENRES,
          payload: selected
            ? [...selectedGenres, item]
            : [...selectedGenres.filter(p => p.id !== item.id)],
        });
      },
      [selectedGenres],
    );

    const onFilter: OnFilterConfirmed = useCallback(({genres, years}) => {
      dispatch({
        type: Types.SET_MULTI,
        payload: {
          selectedGenres: genres,
          selectedYears: years,
          filterIsVisisble: false,
        },
      });
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <Header title={dictionary.appName} dissmissable={false} />
          {/* <Header title={dictionary.searchrModalTitle} /> */}
          <Space size={8} />
          <SearchBox
            value={keyword}
            onChange={value =>
              dispatch({type: Types.SET_KEYWORD, payload: value})
            }
          />
          <Space />
        </View>
        <GenresList
          data={data?.genres}
          selectedItems={selectedGenres}
          onItemSelect={onGenreSelect}
          onFilterPress={() =>
            dispatch({type: Types.SET_FILTER_IS_VISIBLE, payload: true})
          }
        />
        <Space size={8} />
        <VideosList data={data?.videos} />
        {filterIsVisisble && (
          <FilterOverlay
            genres={data?.genres}
            defaultSelectedGenres={selectedGenres}
            defaultSelectedYears={selectedYears}
            videos={data?.videos}
            onConfirm={onFilter}
            onDismiss={() =>
              dispatch({type: Types.SET_FILTER_IS_VISIBLE, payload: false})
            }
          />
        )}
        {/* <SerachOverlay keyword={keyword} /> */}
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
