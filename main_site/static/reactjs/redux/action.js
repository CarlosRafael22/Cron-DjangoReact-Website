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
export function loginUser(creds, signInFirebase) {

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
      console.log("Era pra logar no fireabse agora");

      // REGISTRANDO O USER NO FIREBASE SO AGORA PQ EU QUERO CRIA-LO NA TABELA COM A ID DO DJANGO
      console.log(creds.email_or_username);
      console.log(creds.password);
      signInFirebase(creds.email_or_username, creds.password);
      // Dispatch the success action
      dispatch(receiveLogin(authInfo));

      //this.setState({logado : true, token: authInfo.token, usuario: authInfo.user});
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);
      dispatch(loginError(error))

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
    localStorage.removeItem('id_token')
    
    //localStorage.removeItem('user')
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
export function signUpUser(creds, signUpFirebase, tipo_de_user) {

  console.log("Estamos no signup user");
  console.log(creds);

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignUp(creds))

    // AGORA EU TO MANDANDO DEPENDENDO DE SE A PESSOA Q TA CRIANDO A CONTA EH COACH OU PACIENTE

    let url;
    if(tipo_de_user == "coach"){
      console.log("Vou pegar coach");
      url = '/api/coaches/'
    }else if(tipo_de_user == "paciente"){
      console.log("Vou pegar paciente");
      url = '/api/pacientes/'
    }
    jQuery.ajax({
      type: 'POST',
      url: url,
      data: creds
    }).done(authInfo => {

      console.log(authInfo);
      // PEGUEI O TOKEN DO USUARIO
      console.log("User signed up");
      console.log(typeof(authInfo));
      console.log(authInfo);

      // CADASTRANDO NO FIREBASE
      // AGORA TA RETORNANDO UM PACIENTE OU COACH, ENTAO PARA PEGAR O USER A GNT TEM QUE PEGA-LO DO PERFIL
      //signUpFirebase(creds.email, creds.password, creds.username, authInfo.user.id);
      signUpFirebase(creds.email, creds.password, creds.username, authInfo.user.id);

      // // AGORA VOU PEGAR AS INFOS DO PROPRIO USUARIO
      console.log(authInfo.user);

      // // If login was successful, set the token in local storage
      // localStorage.setItem('id_token', authInfo.token);
      // // the localStorage seems to be limited to handle only string key/value pairs.
      // // A workaround can be to stringify your object before storing it, and later parse it when you retrieve it:
      // let user = JSON.stringify(authInfo.user);
      // localStorage.setItem('user', user);
      // console.log(localStorage);
      // Dispatch the success action
      dispatch(receiveLogin(authInfo));

      //this.setState({logado : true, token: authInfo.token, usuario: authInfo.user});
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(loginError(error))

    });
  }
}


// There are three possible states for our login
// process and we need actions for each of them
export const PROFILES_REQUEST = 'PROFILES_REQUEST'
export const PROFILES_SUCCESS = 'PROFILES_SUCCESS'
export const PROFILES_FAILURE = 'PROFILES_FAILURE'

function profilesRequest(){
  console.log("Pegando os profiles no action!");
  return {
    type: PROFILES_REQUEST,
    loading: true 
  }
}

function profilesSuccess(profilesList){
  console.log("Pegou os profiles no action");
  return {
    type: PROFILES_SUCCESS,
    loading: false,
    profilesList: profilesList
  }
}

function profilesFailure(errorMessage){
  console.log("Deu merda nos profiles no action");
  return {
    type: PROFILES_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getProfiles(){

  console.log("getProfiles no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(profilesRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/perfis/',
      contentType: 'application/json'
    }).done(perfis => {

      console.log(perfis);
      // Dispatch the success action
      dispatch(profilesSuccess(perfis));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(profilesFailure(error))

    });

  }
}


// There are three possible states for our login
// process and we need actions for each of them
export const PATIENTS_REQUEST = 'PATIENTS_REQUEST'
export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS'
export const PATIENTS_FAILURE = 'PROFILES_FAILURE'

function patientsRequest(){
  console.log("Pegando os profiles no action!");
  return {
    type: PATIENTS_REQUEST,
    loading: true 
  }
}

function patientsSuccess(profilesList){
  console.log("Pegou os profiles no action");
  return {
    type: PATIENTS_SUCCESS,
    loading: false,
    profilesList: profilesList
  }
}

function patientsFailure(errorMessage){
  console.log("Deu merda nos profiles no action");
  return {
    type: PROFILES_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getPatients(){

  console.log("getProfiles no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(patientsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/perfis/',
      contentType: 'application/json'
    }).done(perfis => {

      console.log(perfis);
      // Dispatch the success action
      dispatch(patientsSuccess(perfis));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(patientsFailure(error))

    });

  }
}


// There are three possible states for our login
// process and we need actions for each of them
export const COACH_PACIENTS_REQUEST = 'COACH_PACIENTS_REQUEST'
export const COACH_PACIENTS_SUCCESS = 'COACH_PACIENTS_SUCCESS'
export const COACH_PACIENTS_FAILURE = 'COACH_PACIENTS_FAILURE'

function coachPacientsRequest(){
  console.log("Pegando os pacientes do coach no action!");
  return {
    type: COACH_PACIENTS_REQUEST,
    loading: true 
  }
}

function coachPacientsSuccess(coachPacientsList){
  console.log("Pegou os pacientes do coach no action");
  return {
    type: COACH_PACIENTS_SUCCESS,
    loading: false,
    coachPacientsList: coachPacientsList
  }
}

function coachPacientsFailure(errorMessage){
  console.log("Deu merda nos pacientes do coach no action");
  return {
    type: COACH_PACIENTS_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getCoachPatients(coachId){

  console.log("getCoachPacients no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(coachPacientsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/coaches/'+coachId.toString()+'/pacientes_supervisionados/',
      contentType: 'application/json'
    }).done(pacientes_supervisionados => {
      console.log("PAC SUPERVISIONADOS");
      console.log(pacientes_supervisionados);
      // Dispatch the success action
      dispatch(coachPacientsSuccess(pacientes_supervisionados));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(coachPacientsFailure(error))

    });

  }
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
