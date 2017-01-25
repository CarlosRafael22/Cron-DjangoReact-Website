import {
  PATIENTS_REQUEST, PATIENTS_SUCCESS, PATIENTS_FAILURE,
  GET_PATIENT_REQUEST, GET_PATIENT_SUCCESS, GET_PATIENT_FAILURE
} from '../actions/patients'

// import {
//   ADD_COACH_PATIENTS_SUCCESS, DELETE_COACH_PATIENTS_SUCCESS
// } from "../actions/coachPatients"


export default function pacienteReducer(state={
  loading:false,
  pacientesList: []
}, action){

  switch(action.type){
    case PATIENTS_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    // Quando for pegar todos os pacientes ele vai na view com a lista de usuarios entao 
    // limpa o pacienteVisto
    case PATIENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pacientesList: action.pacientesList,
        pacienteVisto: null
    })
    case PATIENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    case GET_PATIENT_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case GET_PATIENT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pacienteVisto: action.pacienteVisto
    })
    case GET_PATIENT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    default:
      return state
  }
}