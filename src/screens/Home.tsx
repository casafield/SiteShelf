import React from 'react';
import mockData from '../mockdata';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {SafeAreaView} from 'react-native';
import HomeListItem from '@components/HomeListItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation, route}: Props) => {
  return (
    <SafeAreaView>
      {mockData
        .filter(data => data.parentFolder === route.params.folderId)
        .map(data => (
          <HomeListItem navigation={navigation} data={data} key={data.id} />
        ))}
    </SafeAreaView>
  );
};

export default Home;
