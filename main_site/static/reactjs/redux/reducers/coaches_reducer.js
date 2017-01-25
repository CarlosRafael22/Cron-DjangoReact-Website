import {
  COACHES_REQUEST, COACHES_SUCCESS, COACHES_FAILURE
} from '../actions/coaches'


export default function coachesReducer(state={
  loading:false,
  coachesList: []
}, action){

  switch(action.type){
    case COACHES_REQUEST:
      return Object.assign({}, state, {
        loading: true
    })
    case COACHES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        coachesList: action.coachesList
    })
    case COACHES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.errorMessage
    })
    default:
      return state
  }
}