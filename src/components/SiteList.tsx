import React from 'react';
import mockData from '../mockdata';
import {Linking, SafeAreaView} from 'react-native';
import {Avatar, ListItem} from '@rneui/themed';

const SiteList = () => {
  return (
    <SafeAreaView>
      {mockData.map(value => (
        <ListItem key={value.id} onPress={() => openURL(value.url)}>
          <Avatar
            rounded
            title="Bm"
            containerStyle={{backgroundColor: 'coral'}}
          />
          <ListItem.Content>
            <ListItem.Title>{value.title}</ListItem.Title>
            <ListItem.Subtitle>{value.url}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </SafeAreaView>
  );
};

const openURL = (url: string) => {
  Linking.openURL(url).catch(err => console.error('url error!!!', err));
};

export default SiteList;
