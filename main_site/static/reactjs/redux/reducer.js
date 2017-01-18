// reducers.js

// import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE
} from './action'

import { combineReducers } from 'redux'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
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
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

// Botaar receitaList = localStorage.getItem('receitas') no state
function receitaReducer(state = {}, action){
  switch(action.type){
    case RECIPES_REQUEST:
      return Object.assign({},state, {
        loading: true
    })
    case RECIPES_SUCCESS:
      return Object.assign({}, state, {
        receitasList: action.receitasList,
        loading: false
      })
    case RECIPES_FAILURE:
      return Object.assign({}, state, {
        error: action.errorMessage
      })
    default:
      return state
  }
}

var reducer = combineReducers({
  usuario: auth,
  receitas: receitaReducer
})

export default reducer
// // The quotes reducer
// function quotes(state = {}, action) {
//   switch (action.type) {

//     default:
//       return state
//   }
// }

// // We combine the reducers here so that they
// // can be left split apart above
// const quotesApp = combineReducers({
//   auth,
//   quotes
// })

// export default quotesApp