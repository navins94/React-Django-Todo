import { GET_TODOS, DELETE_TODO, ADD_TODO, CLEAR_TODOS ,GET_TODO} from "../actions/types";

const initialState = {
  todos: [],
  todo:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
        todos:[]
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case CLEAR_TODOS:
      return {
        ...state,
        todos: []
      };
    default:
      return state;
  }
}
