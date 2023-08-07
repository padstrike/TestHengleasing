import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: { memberId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const members = [
  { id: 1, name: 'Heng' },
  { id: 2, name: 'Som Chai' },
  { id: 3, name: 'เฮง' },
  // Add more members
];

const HomeScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('');

  return (
    <View>
      <TextInput
        value={filter}
        onChangeText={setFilter}
        placeholder="Filter members..."
      />
      {members
        .filter((member) => 
            member.name.toLowerCase().includes(filter.toLowerCase()) || 
            member.id.toString().includes(filter)
        )
        .map((member) => (
          <Button
            key={member.id}
            title={`${member.name}`}
            onPress={() => navigation.navigate('Details', { memberId: member.id })}
          />
        ))}
    </View>
  );
};

const DetailsScreen = ({ route }) => {
  const { memberId } = route.params;
  const member = members.find((m) => m.id === memberId);

  return member ? (
    <View>
      <Text>{`Member ID: ${member.id}`}</Text>
      <Text>{`Member Name: ${member.name}`}</Text>
    </View>
  ) : null;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
