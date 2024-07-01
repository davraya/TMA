import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/base';
import Spacer from '../components/Spacer';

const GroupScreen = ({ navigator, route }) => {
  const { params : {groupName, id}} = route;


  return (
    <View>
      <Spacer/>
      <Text h2>{groupName}{id}</Text>
    </View>
  );
};



export default GroupScreen;
