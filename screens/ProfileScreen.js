import React, { useContext } from 'react';
import { View, Text } from 'react-native'
import { UserData } from '../contexts/userContext';
import { ToDoListData } from '../contexts/toDoListContext';

function ProfileScreen() {

  const userData = useContext(UserData)
  const toDoListData = useContext(ToDoListData)

  if (userData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, marginBottom: 16 }}>
            You're logged in as:
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            {userData.name}
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            {userData.email}
          </Text>
        </View>
        
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          { toDoListData.list.length } items on the list
        </Text>
      </View>
    );
  } else {
    return null
  }
};

export default ProfileScreen;