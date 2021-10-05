import {Genre} from '../../../types';

interface State {
  keyword: string;
  selectedGenres: Array<Genre>;
  selectedYears: Array<number>;
  filterIsVisisble: boolean;
  searchIsVisible: boolean;
}

export const initialState: State = {
  keyword: '',
  selectedGenres: [],
  selectedYears: [],
  filterIsVisisble: false,
  searchIsVisible: false,
};

export enum Types {
  SET_TITLE = 'SET_TITLE',
  SET_KEYWORD = 'SET_KEYWORD',
  SET_SELECTED_GENRES = 'SET_SELECTED_GENRES',
  SET_SELECTED_YEARS = 'SET_SELECTED_YEARS',
  SET_FILTER_IS_VISIBLE = 'SET_FILTER_IS_VISIBLE',
  SET_SEARCH_IS_VISIBLE = 'SET_SEARCH_IS_VISIBLE',
  SET_MULTI = 'SET_MULTI',
}

export const reducer: (
  state: State,
  action: {type: Types; payload: any},
) => State = (state, {type, payload}) => {
  switch (type) {
    case Types.SET_KEYWORD:
      return {...state, keyword: payload};
    case Types.SET_FILTER_IS_VISIBLE:
      return {...state, filterIsVisisble: payload};
    case Types.SET_SEARCH_IS_VISIBLE:
      return {...state, searchIsVisible: payload};
    case Types.SET_SELECTED_GENRES:
      return {...state, selectedGenres: payload};
    case Types.SET_SELECTED_YEARS:
      return {...state, selectedYears: payload};
    case Types.SET_MULTI:
      return {...state, ...payload};
    default:
      throw new Error();
  }
};
