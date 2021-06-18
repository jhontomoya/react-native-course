import React, { useState, useEffect } from 'react';
import { ScrollView, View,TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from "../../database/firebase";
const userDetail = (props) => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    creation: '',
    update: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('users').doc(id);
    const doc = await dbRef.get();
    const userDoc = doc.data();
    console.log(userDoc);
    setUser({
      ...userDoc, 
      id: doc.id
    });
    setLoading(false);
  }

  const handleChangeText = (name, value) => {
    console.log(name, value);
    setUser({...user, [name]: value})
  };

  const updateUser = () => {
    console.log(user);
    props.navigation.navigate('userList');
  }

  if(loading){
    return (
      <View>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="User Name"
          onChangeText={ (value) => handleChangeText('name', value) }
          value={user.name}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="User Email"
          onChangeText={ (value) => handleChangeText('email', value) }
          value={user.email}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="User Phone"
          onChangeText={ (value) => handleChangeText('phone', value) }
          value={user.phone}
        />
      </View>
      <View>
        <Button color="#19AC52" title="Update User" onPress={updateUser}/>
      </View>
      <View>
        <Button color="#E37399" title="Delete User" onPress={updateUser}/>
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

export default userDetail;