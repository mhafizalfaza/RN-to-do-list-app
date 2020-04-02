import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import variables from '../utils/variables'
import { ToDoListData, ToDoListDispatch } from '../contexts/toDoListContext';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/methods';
import { SET_TO_DO_LIST, REMOVE_TO_DO_ITEM } from '../reducers/constants';
import { UserData } from '../contexts/userContext';

function ToDoListViewScreen ({ navigation }) {

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const userData = useContext(UserData);
  const toDoListData = useContext(ToDoListData);
  const toDoListDispatch = useContext(ToDoListDispatch);
  const [activeIndex, setActiveIndex] = useState(null);
  const [longPressActiveIndex, setLongPressActiveIndex] = useState(null);

  useEffect(()=> {
    getToDoFromStorage()
  }, [])

  const getToDoFromStorage = async () => {
    const toDoListFromStorage = await getLocalStorageItem('@to_do_list')
    toDoListDispatch({ type: SET_TO_DO_LIST, payload: { isLoading: false, list: toDoListFromStorage && toDoListFromStorage.length ? toDoListFromStorage.filter((eachToDo) => {
      return eachToDo.owner === userData.email
    }) : [] } });
  }

  const onPressActionToDoList = () => {
    setActiveIndex(null)
    navigation.navigate('AddToDoList')
  }

  const onPressRemove = async () => {

    const itemToRemoveId = toDoListData.list[longPressActiveIndex].id;

    const toDoListItemsFromStorage = await getLocalStorageItem('@to_do_list');

    const toDoListItemsToSet = toDoListItemsFromStorage.filter((eachItem) => {
      return eachItem.id !== itemToRemoveId
    })

    await setLocalStorageItem('@to_do_list', toDoListItemsToSet);

    toDoListDispatch({ type: REMOVE_TO_DO_ITEM, payload: longPressActiveIndex })
    setLongPressActiveIndex(null);
    setActiveIndex(null)
  }

  const onPressCancelRemove = () => {
    setLongPressActiveIndex(null);
    setActiveIndex(null)
  }

  const onPressEdit = () => {
    navigation.navigate('EditToDoList', { ...toDoListData.list[longPressActiveIndex], index: longPressActiveIndex})
    setLongPressActiveIndex(null);
    setActiveIndex(null)
  }

  const onItemPressed = (index) => {

    if (index === activeIndex) return setActiveIndex(null)
    setActiveIndex(index)
  }

  const onItemLongPressed = (index) => {
    if (index === longPressActiveIndex) return setLongPressActiveIndex(null)
    setLongPressActiveIndex(index)
  }

  const ToDoItem = ({ title, description, index }) => {
    return (
      <TouchableOpacity onPress={() => onItemPressed(index)} onLongPress={() => onItemLongPressed(index)} activeOpacity={1} style={{ opacity: longPressActiveIndex === index ? 0.3 : 1 }}>
        <View style={{ paddingVertical: 8, paddingHorizontal: 16, opacity: index === 0 && toDoListData.isPosting ? 0.3 : 1 }}>
          <View style={{ width: '100%', padding: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: variables.color.primary }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: activeIndex === index ? 8 : 0 }}>
              {title}
            </Text>
            { activeIndex === index &&
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: 'white', width: '100%', borderRadius: 4 }}>
                <Text style={{ color: description ? variables.color.primary : 'grey' }}>
                  { description ? description : 'No description' }
                </Text>
              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
            To Do List
          </Text>
        </View>
        { (toDoListData.isPosting || toDoListData.isLoading) &&
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        }

        {
          toDoListData.list.length ? <FlatList
            data={toDoListData.list}
            renderItem={({ item, index }) => <ToDoItem title={item.title} description={item.description} index={index}/>}
            keyExtractor={item => item.id}
          /> :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 24 }}>
              No List
            </Text>
          </View>
        }

        { typeof longPressActiveIndex !== 'number' &&
            <TouchableHighlight
              onPress={onPressActionToDoList}
              title="Login"
              color="#841584"
              accessibilityLabel="Login"
              disabled={isLoggingIn}
              style={{ justifyContent: 'center', alignItems: "center", width: 60, height: 60, borderRadius: 30, backgroundColor: variables.color.primary, position: 'absolute', bottom: 16, right: 16 }}
              
            >
  
              
              <Text style={{ color: variables.color.white, textTransform: 'uppercase', fontWeight: 'bold', fontSize: 40, transform: [{ translateY: -2 }] }}>
                +
              </Text>
            </TouchableHighlight>
        }

        { typeof longPressActiveIndex === 'number' &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
            <TouchableHighlight
              onPress={onPressCancelRemove}
              title="Login"
              accessibilityLabel="Login"
              disabled={isLoggingIn}
              style={{ justifyContent: 'center', alignItems: "center", padding: 8, backgroundColor: 'white', borderWidth: 1, borderColor: variables.color.primary, borderRadius: 4 }}
              
            >
              <Text style={{ color: variables.color.primary, fontWeight: 'bold', fontSize: 16, transform: [{ translateY: -2 }] }}>
                Cancel
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={onPressEdit}
              title="Login"
              accessibilityLabel="Login"
              disabled={isLoggingIn}
              style={{ justifyContent: 'center', alignItems: "center", padding: 8, backgroundColor: 'white', borderWidth: 1, borderColor: variables.color.primary, borderRadius: 4 }}
              
            >
              <Text style={{ color: variables.color.primary, fontWeight: 'bold', fontSize: 16, transform: [{ translateY: -2 }] }}>
                Edit
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={onPressRemove}
              title="Login"
              accessibilityLabel="Login"
              disabled={isLoggingIn}
              style={{ justifyContent: 'center', alignItems: "center", padding: 8, backgroundColor: 'red', borderRadius: 4 }}
              
            >
              <Text style={{ color: variables.color.white, fontWeight: 'bold', fontSize: 16, transform: [{ translateY: -2 }] }}>
                Remove
              </Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    </SafeAreaView>
  );
}

export default ToDoListViewScreen;
