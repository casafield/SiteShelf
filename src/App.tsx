import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';

export type RootStackParamList = {
  Home: {
    folderId: string;
    folderName: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: '#d3d3d3',
          },
          headerTitleAlign: 'center',
        }}
        initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={Home}
          initialParams={{folderId: 'root', folderName: 'Home'}}
          options={({route}) => ({title: route.params.folderName})}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
