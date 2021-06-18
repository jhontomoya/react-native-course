// rfce => RFCE para crear una funcion d react
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import shareImage from "./app/screens/shareImage";
import createUser from "./app/screens/createUser";
import userDetail from "./app/screens/userDetail";
import userList from "./app/screens/userList";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="userList" component={userList} options={{title: 'Users List'}}/>
      <Stack.Screen name="createUser" component={createUser} options={{title: 'Create User'}}/>
      <Stack.Screen name="userDetail" component={userDetail} options={{title: 'User Detail'}}/>
      <Stack.Screen name="shareImage" component={shareImage} options={{title: 'Share your image'}}/>
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
};

export default App;
