// reducers.js

// import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  PROFILES_REQUEST, PROFILES_SUCCESS, PROFILES_FAILURE,
  COACH_PACIENTS_REQUEST, COACH_PACIENTS_SUCCESS, COACH_PACIENTS_FAILURE,
  RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE,
  ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE,
  DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE
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


function profileReducer(state= {
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

function pacienteSupervisionadoReducer(state={
  loading:false,
  pacientesList: []
}, action){

  switch(action.type){
    case COACH_PACIENTS_REQUEST:
    // Gambiarra aqui para limpar antigas pacientesList de outro coaches logados
    // Como ao deslogar eu nao posso limpar pacientesList ja q ta em outro reducer, assim q ele pede pra pegar os pacientes
    // eu limpo qlqr lista de pacientes q tinha
      return Object.assign({}, state, {
        loading: true,
        pacientesList: []
    })
    case COACH_PACIENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pacientesList: action.coachPacientsList
    })
    case COACH_PACIENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    case LOGOUT_SUCCESS:
      console.log("TIRANDO A LISTA DE PACIENTES!!!!!");
      return Object.assign({}, state, {
        pacientesList: []
      })
    default:
      return state
  }
}


// Botaar receitaList = localStorage.getItem('receitas') no state
// Lembrando que no localStorage eh so string que eh salva
function receitaReducer(state = {
  loading: false,
  deleted_recipe: false,
  added_recipe: false,
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
      case DELETE_RECIPE_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case DELETE_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        // vai ser deleted_recipe: true
        deleted_recipe: action.deleted, 
        loading: false
      })
    case DELETE_RECIPE_FAILURE:
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
  receitas: receitaReducer,
  profiles: profileReducer,
  pacientes: pacienteSupervisionadoReducer
})

export default reducer