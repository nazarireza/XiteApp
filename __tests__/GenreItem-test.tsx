import 'react-native';
import React from 'react';
import {GenreItem} from '../src/components/atoms/GenreItem';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const wrapper = renderer.create(<GenreItem name="Genre1" />).toJSON();
  expect(wrapper).toMatchSnapshot();
});

it('renders correctly with selected prop', () => {
  const wrapper = renderer.create(<GenreItem name="Genre1" selected />).toJSON();
  expect(wrapper).toMatchSnapshot();
});
