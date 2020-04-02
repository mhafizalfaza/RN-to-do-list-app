import React, { useContext } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserDispatch } from '../contexts/userContext';
import { LOGOUT } from '../reducers/constants';
import { setLocalStorageItem } from '../utils/methods';

function SettingsScreen({ navigation }) {

  const userDispatch = useContext(UserDispatch);

  const onPressLogout = async () => {
    await setLocalStorageItem('@auth_user', '')
    userDispatch({ type: LOGOUT  })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>
          Settings
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={onPressLogout} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
  );
}

export default SettingsScreen;