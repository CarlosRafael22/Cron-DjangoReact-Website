import {
  COACH_PATIENTS_REQUEST, COACH_PATIENTS_SUCCESS, COACH_PATIENTS_FAILURE
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
    default:
      return state
  }
}