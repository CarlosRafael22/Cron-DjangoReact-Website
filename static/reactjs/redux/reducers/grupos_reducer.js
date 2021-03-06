import {
  ADD_GRUPO_REQUEST, ADD_GRUPO_SUCCESS, ADD_GRUPO_FAILURE,
  GET_COACH_GRUPOS_REQUEST, GET_COACH_GRUPOS_SUCCESS, GET_COACH_GRUPOS_FAILURE
} from '../actions/grupos'

import {LOGOUT_SUCCESS} from '../actions/auth'

export default function profileReducer(state= {
  loading: false,
  coachgrupos: []
}, action){
  switch(action.type){
    case ADD_GRUPO_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case ADD_GRUPO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        coachGrupos: action.coachGrupos
    })
    case ADD_GRUPO_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    case GET_COACH_GRUPOS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        gruposFetched: false
    })
    case GET_COACH_GRUPOS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        gruposFetched: action.gruposFetched,
        coachGrupos: action.coachGrupos
    })
    case GET_COACH_GRUPOS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        gruposFetched: action.gruposFetched,
        error: action.errorMessage
    })
    // LIMPANDO A PORRA TODA QD DESLOGA
    case LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      error: null,
      gruposFetched: false
    })
    default:
      return state
  }
}