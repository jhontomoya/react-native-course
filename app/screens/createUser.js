import React, { useState } from 'react';
import { ScrollView, View,TextInput, Button, StyleSheet } from 'react-native';
import firebase from "../../database/firebase";

const createUser = (props) => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    creation: '',
    update: ''
  });

  const handleChangeText = (name, value) => {
    setUser({...user, [name]: value})
  };

  const createNewUser = async () => {
    if(user.name === '' || user.email === '' || user.phone === ''){
      alert("Please provide all fields data.");
    } else {
      try {
        await firebase.db.collection('users').add({
          name: user.name,
          email: user.email,
          phone: user.phone,
          creation: new Date(),
          update: null
        });
        props.navigation.navigate('userList');
      } catch (error) {
        console.log(error)
        alert("Unavailable Service.");
        throw error;
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="User Name"
          onChangeText={ (value) => handleChangeText('name', value) }
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="User Email"
          onChangeText={ (value) => handleChangeText('email', value) }
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="User Phone"
          onChangeText={ (value) => handleChangeText('phone', value) }
        />
      </View>
      <View>
        <Button title="Save User" onPress={createNewUser}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 35
  },
  inputGroup:{
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  }
});

export default createUser
