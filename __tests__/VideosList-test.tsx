import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {VideosList} from '../src/components/molecules';

const data = [
  {
    id: 501437,
    artist: 'Pants Velour',
    title: 'All In',
    release_year: 2014,
    genre_id: 14,
    image_url:
      'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg',
  },
  {
    id: 501649,
    artist: 'El Koala',
    title: 'Veni paca to',
    release_year: 2014,
    genre_id: 8,
    image_url:
      'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501649/images/app/w522_h292.jpg',
  },
  {
    id: 501895,
    artist: 'Tom Petty and the Heartbreakers',
    title: 'I Should Have Known It',
    release_year: 2010,
    genre_id: 8,
    image_url:
      'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501895/images/app/w522_h292.jpg',
  },
];

it('renders correctly', () => {
  const wrapper = renderer.create(<VideosList data={data} />).toJSON();
  expect(wrapper).toMatchSnapshot();
});
