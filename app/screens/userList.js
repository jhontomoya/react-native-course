import React, { useState, useEffect } from 'react';
import { ScrollView, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from "../../database/firebase";
const userList = (props) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection('users').onSnapshot(querySnapshot => {
      const usersData = [];
      querySnapshot.docs.forEach(doc =>{
        const { name, email, phone, creation, update } = doc.data();
        usersData.push({
          id: doc.id,
          name,
          email,
          phone,
          creation,
          update
        });
      });
      setUsers(usersData);
      console.log(usersData);
    })
  }, []);

  return (
    <ScrollView>
      <View>
        <Button
          title='Add User'
          onPress={() => props.navigation.navigate('createUser')}
        />
      </View>
      {
        users.map(user => {
          return (
            <ListItem 
              key={user.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate('userDetail', {
                  userId: user.id
                })
              }}
            >
              <ListItem.Chevron/>
              <Avatar 
                source={{
                  uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                }} 
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>

            </ListItem>
          )
        })
      }
      <View>
        <Button
          title='Share Image'
          onPress={() => props.navigation.navigate('shareImage')}
        />
      </View>
    </ScrollView>
  )
}

export default userList;
