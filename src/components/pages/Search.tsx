import React, {memo} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {RootStackComponent, Routes} from '../../types/navigation';

const SearchPage: RootStackComponent<Routes.Search> = memo(
  ({navigation, route}) => {
    return (
      <View style={styles.container}>
        <Text>Search Page: {route.params.keyword}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  },
);

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
