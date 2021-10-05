import React, {memo, useCallback, useReducer, useRef} from 'react';
import {StyleSheet, View, TextInput, StatusBar} from 'react-native';
import {Genre, RootStackComponent, Routes} from '../../types';
import {useGetVideosQuery} from '../../services';
import {colors, dictionary} from '../../assets';
import {GenresList, Header, SearchBox, VideosList} from '../molecules';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Space, onListItemSelect} from '../atoms';
import {FilterOverlay, OnFilterConfirmed, SerachOverlay} from '.';
import {initialState, reducer, Types} from './filterOverlay/store';
import {useTimingTransition} from 'react-native-redash';
import {Easing} from 'react-native-reanimated';

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
    const searchInputRef = useRef<TextInput>(null);

    const filterProgress = useTimingTransition(filterIsVisisble, {
      duration: 500,
      easing: Easing.bezier(0.1, 0.45, 0.2, 1),
    });

    const searchProgress = useTimingTransition(searchIsVisible, {
      duration: 500,
      easing: Easing.bezier(0.1, 0.45, 0.2, 1),
    });

    const {data, error, isLoading} = useGetVideosQuery({});

    const onGenreSelect: onListItemSelect<Genre> = useCallback(
      ({item, selected}) => {
        onFilter({
          genres: selected
            ? [...selectedGenres, item]
            : [...selectedGenres.filter(p => p.id !== item.id)],
          years: selectedYears,
        });
      },
      [selectedGenres, selectedYears],
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
          <Header
            title={dictionary.appName}
            dissmissable={false}
            progress={searchProgress}>
            <Header
              title={dictionary.searchrModalTitle}
              onBackPress={() => {
                searchInputRef.current?.blur();
                dispatch({
                  type: Types.SET_MULTI,
                  payload: {searchIsVisible: false, keyword: ''},
                });
              }}
            />
          </Header>
          <Space size={8} />
          <SearchBox
            ref={searchInputRef}
            value={keyword}
            onChange={value =>
              dispatch({type: Types.SET_KEYWORD, payload: value})
            }
            onFocus={() =>
              dispatch({type: Types.SET_SEARCH_IS_VISIBLE, payload: true})
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
        <FilterOverlay
          progress={filterProgress}
          genres={data?.genres}
          defaultSelectedGenres={selectedGenres}
          defaultSelectedYears={selectedYears}
          videos={data?.videos}
          onConfirm={onFilter}
          onDismiss={() =>
            dispatch({type: Types.SET_FILTER_IS_VISIBLE, payload: false})
          }
        />
        <SerachOverlay keyword={keyword} progress={searchProgress} />
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
