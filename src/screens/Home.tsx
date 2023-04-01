import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {FlatList, SafeAreaView} from 'react-native';
import HomeListItem from '@components/HomeListItem';
import {getDynamoDBData} from '@repositories/AwsConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation, route}: Props) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getDynamoDBData(route.params.folderId)
      .then(data => {
        setItems(data.Items || []);
      })
      .catch(console.error);
  }, [route]);

  const renderItem = (data: any) => {
    return (
      <HomeListItem
        navigation={navigation}
        data={{
          id: data.item.id.S,
          name: data.item.name.S,
          url: data.item.url.S,
          item_type: data.item.item_type.S,
          parent_folder: data.item.parent_id.S,
        }}
      />
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={items.sort((a, b) => {
          if (a.item_type.S < b.item_type.S) {
            return -1;
          }
          return 1;
        })}
        renderItem={renderItem}
        keyExtractor={data => data.id.S}
      />
    </SafeAreaView>
  );
};

export default Home;
