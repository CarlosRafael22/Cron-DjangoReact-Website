import {
  COACH_PATIENTS_REQUEST, COACH_PATIENTS_SUCCESS, COACH_PATIENTS_FAILURE,
  ADD_COACH_PATIENTS_REQUEST, ADD_COACH_PATIENTS_SUCCESS, ADD_COACH_PATIENTS_FAILURE,
  DELETE_COACH_PATIENTS_REQUEST, DELETE_COACH_PATIENTS_SUCCESS, DELETE_COACH_PATIENTS_FAILURE
} from '../actions/coachPatients'

import {LOGOUT_SUCCESS} from '../actions/auth'


export default function pacienteSupervisionadoReducer(state={
  loading:false,
  coachPatientsList: []
}, action){

  switch(action.type){
    case COACH_PATIENTS_REQUEST:
    // Gambiarra aqui para limpar antigas coachPatientsList de outro coaches logados
    // Como ao deslogar eu nao posso limpar coachPatientsList ja q ta em outro reducer, assim q ele pede pra pegar os pacientes
    // eu limpo qlqr lista de pacientes q tinha
      return Object.assign({}, state, {
        loading: true
    })
    case COACH_PATIENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        coachPatientsList: action.coachPatientsList
    })
    case COACH_PATIENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    case LOGOUT_SUCCESS:
      console.log("TIRANDO A LISTA DE PACIENTES!!!!!");
      return Object.assign({}, state, {
        coachPatientsList: []
      })
    case ADD_COACH_PATIENTS_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case ADD_COACH_PATIENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        coachPatientsList: action.coachPatientsList
      })
    case ADD_COACH_PATIENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
      case DELETE_COACH_PATIENTS_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case DELETE_COACH_PATIENTS_SUCCESS:
      return Object.assign({}, state, {
        // vai ser deleted_recipe: true
        coachPatientsList: action.coachPatientsList, 
        loading: false
      })
    case DELETE_COACH_PATIENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
      })
    default:
      return state
  }
}