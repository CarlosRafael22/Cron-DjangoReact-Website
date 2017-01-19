// reducers.js

// import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE,
  ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE
} from './action'

import { combineReducers } from 'redux'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
    id_token: localStorage.getItem('id_token') ? localStorage.getItem('id_token') : null
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
        isFetching: true,
        isAuthenticated: false,
        user: null,
        id_token: null
      })
    default:
      return state
  }
}

// Botaar receitaList = localStorage.getItem('receitas') no state
// Lembrando que no localStorage eh so string que eh salva
function receitaReducer(state = {
  loading: false,
  //receitasList: localStorage.getItem('receitas') ? localStorage.getItem('receitas') : null
  receitasList: []
}, action){
  console.log("Storage no Reducer");
  console.log(localStorage);
  switch(action.type){
    case RECIPES_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case RECIPES_SUCCESS:
      return Object.assign({}, state, {
        receitasList: action.receitasList,
        loading: false
      })
    case RECIPES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
      })
    case ADD_RECIPE_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case ADD_RECIPE_SUCCESS:
      console.log("State no Recipe_success");
      console.log(state.receitasList);
      return Object.assign({}, state, {
        loading: false,
        added_recipe: true
      })
    case ADD_RECIPE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
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