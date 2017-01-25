import {
  PROFILES_REQUEST, PROFILES_SUCCESS, PROFILES_FAILURE
} from '../actions/profiles'

export default function profileReducer(state= {
  loading: false,
  profilesList: []
}, action){
  switch(action.type){
    case PROFILES_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case PROFILES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        profilesList: action.profilesList
    })
    case PROFILES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    default:
      return state
  }
}