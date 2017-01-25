import {
  PATIENTS_REQUEST, PATIENTS_SUCCESS, PATIENTS_FAILURE
} from '../actions/patients'


export default function pacienteReducer(state={
  loading:false,
  pacientesList: []
}, action){

  switch(action.type){
    case PATIENTS_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case PATIENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pacientesList: action.pacientesList
    })
    case PATIENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    default:
      return state
  }
}