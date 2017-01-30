import {
  CHAT_EXISTS_REQUEST, CHAT_EXISTS_SUCCESS, CHAT_EXISTS_FAILURE,
  ADD_CHAT_REQUEST, ADD_CHAT_SUCCESS, ADD_CHAT_FAILURE,
  GET_COACH_CHATS_REQUEST, GET_COACH_CHATS_SUCCESS, GET_COACH_CHATS_FAILURE
} from '../actions/chats'

export default function profileReducer(state= {
  loading: false,
  chatExiste: null,
  chatNaoExiste: true,
  coachChats: []
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
    case ADD_CHAT_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case ADD_CHAT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        coachChats: action.coachChats
    })
    case ADD_CHAT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    case GET_COACH_CHATS_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case GET_COACH_CHATS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        coachChats: action.coachChats
    })
    case GET_COACH_CHATS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    default:
      return state
  }
}