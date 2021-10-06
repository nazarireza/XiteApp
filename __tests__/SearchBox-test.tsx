import 'react-native';
import React from 'react';
import {SearchBox} from '../src/components/molecules';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const wrapper = renderer.create(<SearchBox />).toJSON();
  expect(wrapper).toMatchSnapshot();
});

it('renders correctly with value', () => {
  const wrapper = renderer.create(<SearchBox value="value" />).toJSON();
  expect(wrapper).toMatchSnapshot();
});

it('renders correctly with placeholder', () => {
  const wrapper = renderer
    .create(<SearchBox placeHolder="placeholder" />)
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});

it('onChange callback works correctly', () => {
  const onChange = jest.fn();
  const wrapper = shallow(<SearchBox onChange={onChange} />);

  wrapper.find({testID: 'input'}).simulate('changeText', 'query!');

  expect(onChange).toHaveBeenCalledWith('query!');
});
