import React, {memo} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {RootStackComponent, Routes} from '../../types/navigation';
import {useGetVideosQuery} from '../../services/video';

const HomePage: RootStackComponent<Routes.Home> = memo(({navigation}) => {
  const {data, error, isLoading} = useGetVideosQuery({});

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      {data?.genres.map(({id, name}) => (
        <Text key={id}>{name}</Text>
      ))}
      <Button
        title="Go to Search page"
        onPress={() =>
          navigation.navigate(Routes.Search, {keyword: 'Test Query'})
        }
      />
    </View>
  );
});

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
