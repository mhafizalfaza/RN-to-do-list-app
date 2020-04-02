import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight } from 'react-native';
import variables from '../utils/variables'
import { TextInput } from 'react-native-gesture-handler';
import { ToDoListDispatch } from '../contexts/toDoListContext';
import { ADD_TO_DO_ITEM, SET_TO_DO_LIST} from '../reducers/constants';
import { uuid, getLocalStorageItem, setLocalStorageItem } from '../utils/methods';
import { UserData } from '../contexts/userContext';

function AddToDoListScreen ({ navigation }) {

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [toDoTitle, setToDoTitle] = useState('');
  const [toDoDescription, setToDoDescription] = useState('');
  const toDoListDispatch = useContext(ToDoListDispatch);
  const userData = useContext(UserData);

  const onPressAddToDoList = () => {
    const id = uuid()
    toDoListDispatch({ type: ADD_TO_DO_ITEM, payload: { id, title: toDoTitle, description: toDoDescription } })
    toDoListDispatch({ type: SET_TO_DO_LIST, payload: { isPosting: true } })

    addToDoListToStorage(id)

    setTimeout(() => {
      toDoListDispatch({ type: SET_TO_DO_LIST, payload: { isPosting: false } })
    }, 10000)
    navigation.navigate('ToDoListView');
  };

  const onPressClose = () => {
    navigation.goBack();
  };

  const addToDoListToStorage = async (id) => {
    const toDoListItems = await getLocalStorageItem('@to_do_list');

    let toDoListItemsToSet = []

    const toDoListItem = {
      id,
      owner: userData.email,
      title: toDoTitle,
      description: toDoDescription
    }

    if (toDoListItems) {
      toDoListItemsToSet = [
        toDoListItem,
        ...toDoListItems
      ]
    } else {
      toDoListItemsToSet = [toDoListItem]
    }


    await setLocalStorageItem('@to_do_list', toDoListItemsToSet);

    const toDoListFromStorage = await getLocalStorageItem('@to_do_list');

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          <TouchableHighlight onPress={onPressClose}>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
              X
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onPressAddToDoList}
            title="Login"
            color="#841584"
            accessibilityLabel="Login"
            disabled={isLoggingIn}
            style={{ justifyContent: 'center', alignItems: "center", padding: 8, borderRadius: 8, backgroundColor: variables.color.primary }}
            
          >
            <Text style={{ color: variables.color.white, fontWeight: 'bold', fontSize: 14 }}>
              Add To List
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1 }}>
          
          <View style={{ paddingHorizontal: 16 }}>
            <TextInput
              placeholder="Type title here..."
              onChangeText={title => setToDoTitle(title)}
              defaultValue={toDoTitle}
              multiline={true}
              style={{ width: '100%', height: 32, borderBottomWidth: 1, borderBottomColor: variables.color.primary, paddingVertical: 8, fontWeight: 'bold' }}
            />
          </View>
          <TextInput
            style={{ width: '100%', height: '90%', padding: 16, paddingTop: 32 }}
            placeholder="Type description here..."
            onChangeText={description => setToDoDescription(description)}
            defaultValue={toDoDescription}
            multiline={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AddToDoListScreen;
