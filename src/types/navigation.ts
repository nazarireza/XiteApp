import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RouteProp} from '@react-navigation/native';

export enum Routes {
  Home = 'Home',
  Search = 'Search',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Search]: {
    keyword: string;
  };
};

export type RootStackComponent<RouteName extends keyof RootStackParamList> =
  React.FC<{
    navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
    route: RouteProp<RootStackParamList, RouteName>;
  }>;
