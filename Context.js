import React from 'react';
import { useReducer } from 'react'
import { UserData, UserDispatch } from './contexts/userContext'
import { ToDoListData, ToDoListDispatch } from './contexts/toDoListContext'
import { userReducer, initialUserState } from './reducers/userReducer'
import { toDoListReducer, initialToDoListState } from './reducers/toDoListReducer'

export default ({ children }) => {

  const [ userData, userDispatch ] = useReducer(userReducer, initialUserState);
  const [ toDoListData, toDoListDispatch ] = useReducer(toDoListReducer, initialToDoListState);

  return (
    <UserDispatch.Provider value={userDispatch}>
        <UserData.Provider value={userData}>
          <ToDoListDispatch.Provider value={toDoListDispatch}>
            <ToDoListData.Provider value={toDoListData}>
              { children }
            </ToDoListData.Provider>
          </ToDoListDispatch.Provider>
        </UserData.Provider>
    </UserDispatch.Provider>
  );
};
