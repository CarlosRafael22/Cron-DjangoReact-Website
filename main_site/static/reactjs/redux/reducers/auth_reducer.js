import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/auth'


// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired
export default function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
    id_token: localStorage.getItem('id_token') ? localStorage.getItem('id_token') : null
  }, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case SIGNUP_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      id_token: action.id_token,
      user: action.user,
      errorMessage: ''
    })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        id_token: action.id_token,
        user: action.user,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null,
        id_token: null
      })
    default:
      return state
  }
}