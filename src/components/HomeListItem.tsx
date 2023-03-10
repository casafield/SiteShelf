import React from 'react';
import {ListItem} from '@rneui/themed';
import {Avatar} from '@rneui/base';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {Linking, StyleSheet} from 'react-native';

type Data = {
  id: string;
  title: string;
  url: string;
  itemType: string;
  parentFolder: string;
};

type ListItemProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  data: Data;
};

type FolderItemProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  data: Data;
};

type LinkItemProps = {
  data: Data;
};

const HomeListItem = ({navigation, data}: ListItemProps) => {
  if (data.itemType === 'folder') {
    return <FolderItem navigation={navigation} data={data} />;
  } else {
    return <LinkItem data={data} />;
  }
};

const FolderItem = ({navigation, data}: FolderItemProps) => {
  return (
    <ListItem onPress={() => openFolder({navigation, data})}>
      <Avatar
        rounded
        icon={{name: 'folder', type: 'material'}}
        containerStyle={styles.avater}
      />
      <ListItem.Content>
        <ListItem.Title>{data.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const openFolder = ({navigation, data}: FolderItemProps) => {
  navigation.push('Home', {folderId: data.id});
};

const LinkItem = ({data}: LinkItemProps) => {
  return (
    <ListItem onPress={() => openURL(data.url)}>
      <Avatar
        rounded
        icon={{name: 'star', type: 'material'}}
        containerStyle={styles.avater}
      />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} ellipsizeMode="tail">
          {data.title}
        </ListItem.Title>
        <ListItem.Subtitle>{data.url}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const openURL = (url: string) => {
  Linking.openURL(url).catch(err => console.error('url error', err));
};

const styles = StyleSheet.create({
  avater: {
    backgroundColor: '#BDBDBD',
  },
});

export default HomeListItem;
