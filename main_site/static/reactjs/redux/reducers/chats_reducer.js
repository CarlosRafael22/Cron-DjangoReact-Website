import {
  CHAT_EXISTS_REQUEST, CHAT_EXISTS_SUCCESS, CHAT_EXISTS_FAILURE,
  ADD_CHAT_SUCCESS
} from '../actions/chats'

export default function profileReducer(state= {
  loading: false,
  chatExiste: null,
  chatNaoExiste: true,
  chats: []
}, action){
  switch(action.type){
    case CHAT_EXISTS_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case CHAT_EXISTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        chatExiste: action.chatNameID
    })
    case CHAT_EXISTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        chatNaoExiste: true,
        error: action.errorMessage
    })
    case ADD_CHAT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        chats: action.chats
    })
    default:
      return state
  }
}