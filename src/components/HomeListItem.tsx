import React from 'react';
import {ListItem} from '@rneui/themed';
import {Avatar} from '@rneui/base';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {Linking, StyleSheet} from 'react-native';

type Data = {
  id: string;
  name: string;
  url: string;
  item_type: string;
  parent_folder: string;
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
  if (data.item_type === 'folder') {
    return <FolderItem navigation={navigation} data={data} />;
  } else {
    return <LinkItem data={data} />;
  }
};

const FolderItem = ({navigation, data}: FolderItemProps) => {
  return (
    <ListItem
      onPress={() => openFolder({navigation, data})}
      containerStyle={styles.listItem}>
      <Avatar
        rounded
        icon={{name: 'folder', type: 'material'}}
        containerStyle={styles.avater}
      />
      <ListItem.Content>
        <ListItem.Title>{data.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const openFolder = ({navigation, data}: FolderItemProps) => {
  navigation.push('Home', {folderId: data.id, folderName: data.name});
};

const LinkItem = ({data}: LinkItemProps) => {
  return (
    <ListItem
      onPress={() => openURL(data.url)}
      containerStyle={styles.listItem}>
      <Avatar
        rounded
        icon={{name: 'star', type: 'material'}}
        containerStyle={styles.avater}
      />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} ellipsizeMode="tail">
          {data.name}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {data.url}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const openURL = (url: string) => {
  Linking.openURL(url).catch(err => console.error('url error', err));
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  avater: {
    backgroundColor: '#BDBDBD',
  },
});

export default HomeListItem;
