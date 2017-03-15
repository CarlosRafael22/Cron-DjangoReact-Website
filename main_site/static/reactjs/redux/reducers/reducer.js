import auth from "./auth_reducer"
import coachPatients from "./coachPatients_reducer"
import profilesReducer from "./profiles_reducer"
import receitasReducer from "./receitas_reducer"
import patientsReducer from "./patients_reducer"
import coachesReducer from "./coaches_reducer"
import chatsReducer from "./chats_reducer"
import gruposReducer from "./grupos_reducer"

import { combineReducers } from 'redux'

var reducer = combineReducers({
  usuario: auth,
  // receitas: receitasReducer,
  pacientes_supervisionados: coachPatients,
  pacientes: patientsReducer,
  coaches: coachesReducer,
  chats: chatsReducer,
  grupos: gruposReducer
})

export default reducer