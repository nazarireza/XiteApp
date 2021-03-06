import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomePage, SearchPage} from './components/pages';
import {RootStackParamList, Routes} from './types';
import {Provider} from 'react-redux';
import store from './store';

const Root = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root.Navigator screenOptions={{headerShown: false}}>
          <Root.Screen name={Routes.Home} component={HomePage} />
          <Root.Screen name={Routes.Search} component={SearchPage} />
        </Root.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
