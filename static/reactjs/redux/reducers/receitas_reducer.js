import {
  RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE,
  ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE,
  DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE
} from '../actions/receitas'


// Botaar receitaList = localStorage.getItem('receitas') no state
// Lembrando que no localStorage eh so string que eh salva
export default function receitaReducer(state = {
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
