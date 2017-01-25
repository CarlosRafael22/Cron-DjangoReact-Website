// There are three possible states for our login
// process and we need actions for each of them
export const RECIPES_REQUEST = 'RECIPES_REQUEST'
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS'
export const RECIPES_FAILURE = 'RECIPES_FAILURE'

function requestRecipes(){
  console.log("Pegando as receitas no action!");
  return {
    type: RECIPES_REQUEST,
    loading: true 
  }
}

function receiveRecipes(receitaList){
  console.log("Pegou as receitas no action");
  return {
    type: RECIPES_SUCCESS,
    loading: false,
    receitasList: receitaList
  }
}

function recipesError(errorMessage){
  console.log("Deu merda na receitas no action");
  return {
    type: RECIPES_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getReceitas(){

  console.log("getReceitas no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestRecipes());

    jQuery.ajax({
      type: 'GET',
      url: '/api/receitas/'
    }).done(receitas => {

      console.log(receitas);
      // Dispatch the success action
      dispatch(receiveRecipes(receitas));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(recipesError(error))

    });

  }
}


// There are three possible states for our login
// process and we need actions for each of them
export const ADD_RECIPE_REQUEST = 'ADD_RECIPE_REQUEST'
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS'
export const ADD_RECIPE_FAILURE = 'ADD_RECIPE_FAILURE'

function addRecipeRequest(){
  console.log("Request add receita no action!");
  return {
    type: ADD_RECIPE_REQUEST,
    loading: true 
  }
}

function addRecipeSuccess(newRecipe){
  console.log("Adicionou receita no action");
  return {
    type: ADD_RECIPE_SUCCESS,
    loading: false,
    novaReceita: newRecipe
  }
}

function addRecipeFailure(errorMessage){
  console.log("Deu merda na add receita no action");
  return {
    type: ADD_RECIPE_FAILURE,
    loading: false,
    errorMessage
  }
}

export function addReceita(receita){

  console.log("addReceita no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(addRecipeRequest());

    jQuery.ajax({
      type: 'POST',
      url: '/api/receitas/',
      data: receita,
      contentType: 'application/json'
    }).done(newReceita => {
      console.log("New recipe no action");
      console.log(newReceita);

      dispatch(addRecipeSuccess(newReceita));
      // Vai fazer um fetch pra ver se ta pegando certinho com o que tem de mais atual no banco
      //this._fetchReceitas();
      dispatch(getReceitas());
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);
      dispatch(addRecipeFailure());
    });
  }
}


// There are three possible states for our login
// process and we need actions for each of them
export const DELETE_RECIPE_REQUEST = 'DELETE_RECIPE_REQUEST'
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS'
export const DELETE_RECIPE_FAILURE = 'DELETE_RECIPE_FAILURE'

function deleteRecipeRequest(){
  console.log("Request delete receita no action");
  return {
    type: DELETE_RECIPE_REQUEST,
    loading: true
  }
}

function deleteRecipeSuccess(){
  console.log("Deletou receita no action");
  return {
    type: DELETE_RECIPE_SUCCESS,
    loading: false,
    deleted: true
  }
}

function deleteRecipeFailure(errorMessage){
  console.log("delete receita falhou no action");
  return {
    type: DELETE_RECIPE_FAILURE,
    error: errorMessage
  }
}

export function deleteReceita(receitaId){
  console.log("Deletando no action");
  console.log(receitaId);
  console.log(typeof(receitaId));
  return dispatch => {

    dispatch(deleteRecipeRequest());

    jQuery.ajax({
      method: 'DELETE',
      url: '/api/receitas/'+receitaId.toString()
    }).done(function(){
      console.log("Deletou");
      //console.log("Vou ter q pegar as receitas");

      dispatch(deleteRecipeSuccess());
      // VAI TER QUE FAZER O GETRECEITAS AQUI PRA O STORE.STATE FICAR COM AS RECEITAS ATUALIZADAS
      // SENAO ELE VAI TER AS RECEITAS ANTIGAS AINDA SALVAS
      dispatch(getReceitas());

    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(recipesError(error));

      // SE DER 'NOT FOUND' COMO RESPOSTA DO ERRO QUER DIZER QUE ESSA RECEITA NAO EXISTE MAIS NO BANCO E POR ALGUMA RAZAO EXISTE AQUI
      // ENTAO SE FIZER O GETRECEITAS DE NOVO ELE VAI ATUALIZAR COM AS RECEITAS DO BANCO E ESSA Q DEU ERRO VAI SAIR
      dispatch(getReceitas());

    });


  }
}
