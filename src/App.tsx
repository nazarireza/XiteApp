import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './components/pages/Home';
import SearchPage from './components/pages/Search';
import {RootStackParamList, Routes} from './types/navigation';

const Root = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        <Root.Screen name={Routes.Home} component={HomePage} />
        <Root.Screen name={Routes.Search} component={SearchPage} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default App;
