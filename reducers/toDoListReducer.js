import { SET_TO_DO_LIST, ADD_TO_DO_ITEM, REMOVE_TO_DO_ITEM } from './constants';

export const initialToDoListState = {
  list: [
  ],
  isLoading: true,
  isPosting: false
}

export const toDoListReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_DO_ITEM:
      return {
        ...state,
        list: [
          action.payload,
          ...state.list
        ]
      };

    case REMOVE_TO_DO_ITEM:
        const items = [...state.list]
        items.splice(action.payload, 1)

        return {
          ...state,
          list: items
        }
    case SET_TO_DO_LIST:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
