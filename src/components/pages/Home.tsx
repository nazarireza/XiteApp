import React, {
  memo,
  useCallback,
  useReducer,
  useRef,
  useState,
  useEffect,
} from 'react';
import {StyleSheet, View, TextInput, StatusBar} from 'react-native';
import {Genre, RootStackComponent, Routes, Video} from '../../types';
import {useGetVideosQuery} from '../../services';
import {colors, dictionary} from '../../assets';
import {GenresList, Header, SearchBox, VideosList} from '../molecules';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Space, onListItemSelect, LoadingContainer} from '../atoms';
import {FilterOverlay, OnFilterConfirmed, SerachOverlay} from '.';
import {initialState, reducer, Types} from './filterOverlay/store';
import {useTimingTransition} from 'react-native-redash';
import {Easing} from 'react-native-reanimated';
import {useBackHandler} from './useBackHandler';

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
    const [filteredData, setFilteredData] = useState<Array<Video>>([]);
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

    // FIXME: This is a mock implementation for simulating the server-side logic and should be remove
    useEffect(() => {
      const timeOutId = setTimeout(() => {
        const shouldBeFilter =
          selectedGenres.length > 0 || selectedYears.length > 0;
        const result = data?.videos.filter(
          ({genre_id, release_year}) =>
            !shouldBeFilter ||
            selectedGenres.some(genre => genre.id === genre_id) ||
            selectedYears.some(year => year === release_year),
        );
        setFilteredData(result || []);
      }, 500);
      return () => clearTimeout(timeOutId);
    }, [data, selectedGenres, selectedYears]);

    const onOverlayDismiss: () => boolean = () => {
      searchInputRef.current?.blur();
      dispatch({
        type: Types.SET_MULTI,
        payload: {
          filterIsVisisble: false,
          searchIsVisible: false,
          keyword: '',
        },
      });
      return true;
    };

    useBackHandler(onOverlayDismiss);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background.page}
        />
        <View style={styles.headerContainer}>
          <Header
            title={dictionary.appName}
            dissmissable={false}
            progress={searchProgress}>
            <Header
              title={dictionary.searchrModalTitle}
              onBackPress={onOverlayDismiss}
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
        <LoadingContainer isBusy={isLoading}>
          <GenresList
            data={data?.genres}
            selectedItems={selectedGenres}
            onItemSelect={onGenreSelect}
            onFilterPress={() =>
              dispatch({type: Types.SET_FILTER_IS_VISIBLE, payload: true})
            }
          />
          <Space size={8} />
          <VideosList data={filteredData} />
        </LoadingContainer>
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
          isVisible={filterIsVisisble}
        />
        <SerachOverlay
          keyword={keyword}
          progress={searchProgress}
          isVisible={searchIsVisible}
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
  },
});
