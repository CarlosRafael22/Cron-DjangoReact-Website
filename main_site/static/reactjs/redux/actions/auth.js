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