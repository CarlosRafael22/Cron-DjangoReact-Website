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
  // let config = {
  //   method: 'POST',
  //   headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  //   body: `username=${creds.username}&password=${creds.password}`
  // }

  let config = {
    method: 'POST',
    url: '/api-token-auth/',
    body: creds
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    // return fetch('http://localhost:8000/api-token-auth/', config)
    //   .then(response =>
    //     response.json().then(user => ({ user, response }))
    //         ).then(({ user, response }) =>  {
    //     if (!response.ok) {
    //       // If there was a problem, we want to
    //       // dispatch the error condition
    //       console.log(response);
    //       dispatch(loginError(user.message))
    //       return Promise.reject(user)
    //     } else {
    //       console.log(user);
    //       console.log(response);
    //       // If login was successful, set the token in local storage
    //       localStorage.setItem('id_token', user.token)
    //       // Dispatch the success action
    //       dispatch(receiveLogin(user))
    //     }
    //   }).catch(err => console.log("Error: ", err))

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

      console.log(response);
      dispatch(loginError(user.message))

    });
  }


  // return dispatch => {
  //   console.log(creds)
  //   // We dispatch requestLogin to kickoff the call to the API
  //   dispatch(requestLogin(creds))

  //   jQuery.ajax({
  //     type: 'POST',
  //     url: '/api-token-auth/',
  //     data: {"username": username, "password": password}
  //   }).done(authInfo => {

  //     // PEGUEI O TOKEN DO USUARIO
  //     console.log("User logged");
  //     console.log(typeof(authInfo));
  //     console.log(authInfo);

  //     // AGORA VOU PEGAR AS INFOS DO PROPRIO USUARIO
  //     console.log(authInfo.user);

  //     this.setState({logado : true, token: authInfo.token, usuario: authInfo.user});
  //   })
  //   .fail(function(xhr, status, error){
  //     console.log(error);
  //     console.log(xhr);

  //   });
  // }

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
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('user')
    dispatch(receiveLogout())
  }
}
