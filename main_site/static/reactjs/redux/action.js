// actions.js

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  console.log("Request login");
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(authInfo) {
  console.log("Received login");
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: authInfo.token,
    user: authInfo.user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  console.log("Estamos no login user")
  console.log(creds);

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    jQuery.ajax({
      type: 'POST',
      url: '/api-token-auth/',
      data: creds
    }).done(authInfo => {

      // PEGUEI O TOKEN DO USUARIO
      console.log("User logged");
      console.log(typeof(authInfo));
      console.log(authInfo);

      // AGORA VOU PEGAR AS INFOS DO PROPRIO USUARIO
      console.log(authInfo.user);

      // REGISTRANDO O USER NO FIREBASE SO AGORA PQ EU QUERO CRIA-LO NA TABELA COM A ID DO DJANGO

      // Dispatch the success action
      dispatch(receiveLogin(authInfo));

      //this.setState({logado : true, token: authInfo.token, usuario: authInfo.user});
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);
      dispatch(loginError(user.message))

    });
  }
}


// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  console.log("Logout");
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  console.log("Logout successfully");
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
  console.log(localStorage);
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    // localStorage.removeItem('id_token')
    // localStorage.removeItem('user')
    dispatch(receiveLogout());
  }
}


//Sign Up User
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

function requestSignUp(creds) {
  console.log("Request signup");
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveSignUp(authInfo) {
  console.log("Received signup");
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: authInfo.token,
    user: authInfo.user
  }
}

function signUpError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function signUpUser(creds, signUpFirebase) {

  console.log("Estamos no signup user");
  console.log(creds);

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignUp(creds))

    jQuery.ajax({
      type: 'POST',
      url: '/api/usuarios/',
      data: creds
    }).done(authInfo => {

      console.log(authInfo);
      // PEGUEI O TOKEN DO USUARIO
      console.log("User signed up");
      console.log(typeof(authInfo));
      console.log(authInfo);

      // CADASTRANDO NO FIREBASE
      signUpFirebase(creds.email, creds.password, creds.username, authInfo.user.id);

      // // AGORA VOU PEGAR AS INFOS DO PROPRIO USUARIO
      console.log(authInfo.user);

      // If login was successful, set the token in local storage
      localStorage.setItem('id_token', authInfo.token);
      // the localStorage seems to be limited to handle only string key/value pairs.
      // A workaround can be to stringify your object before storing it, and later parse it when you retrieve it:
      let user = JSON.stringify(authInfo.user);
      localStorage.setItem('user', user);
      console.log(localStorage);
      // Dispatch the success action
      dispatch(receiveLogin(authInfo));

      //this.setState({logado : true, token: authInfo.token, usuario: authInfo.user});
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(loginError(user.message))

    });
  }
}


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

function recipeDeletionRequest(){
  return {
    type: DELETE_RECIPE_REQUEST,
    loading: true
  }
}

function recipeDeletionSuccess(){
  return {
    type: DELETE_RECIPE_SUCCESS
  }
}

function recipeDeletionFailure(errorMessage){
  return {
    type: DELETE_RECIPE_FAILURE,
    error: errorMessage
  }
}

export function deleteReceita(receitaId){
  console.log("Deletando no action");
  return dispatch => {

    dispatch(recipeDeletionRequest());

    jQuery.ajax({
      method: 'DELETE',
      url: '/api/receitas/'+receitaId.toString()
    }).done(function(){
      console.log("Deletou");
      console.log("Vou ter q pegar as receitas");

      // No localStorage so salva se for String!!!!
      // Tem q fazer gambiarra aqui pra salvar e pegar dps
      let receitas_inString = JSON.stringify(receitas);
      localStorage.setItem('receitas', receitas_inString);
      console.log(localStorage);

    // Mas nao vamos esperar ate que a request pra API termine antes de atualizar o component's state.
    // We will give out user imediate visual feedback, which is known as optimistic update

    // // Clonando o array existente com o Spread Operator
    // const receitas = [...this.state.receitas];
    // const receitaIndex = receitas.indexOf(deletedReceita);
    // console.log(receitaIndex);
    // // Remove the receita from the receita's array
    // receitas.splice(receitaIndex, 1);

    // // Updates state and the UI updates imediately
    // this.setState({receitas});

    //   // Dispatch the success action
    //   dispatch(receiveRecipes(receitas));

      //this.setState({logado : true, token: authInfo.token, usuario: authInfo.user});
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(recipesError(error))

    });


  }
}
