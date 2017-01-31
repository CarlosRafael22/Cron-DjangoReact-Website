// There are three possible states for our login
// process and we need actions for each of them
export const CHAT_EXISTS_REQUEST = 'CHAT_EXISTS_REQUEST'
export const CHAT_EXISTS_SUCCESS = 'CHAT_EXISTS_SUCCESS'
export const CHAT_EXISTS_FAILURE = 'CHAT_EXISTS_FAILURE'

function chatExistsRequest(){
  console.log("Pegando checando se chat existe no action!");
  return {
    type: CHAT_EXISTS_REQUEST,
    loading: true 
  }
}

function chatExistsSuccess(chatNameID){
  console.log("Pegou checando se chat existe no action");
  return {
    type: CHAT_EXISTS_SUCCESS,
    loading: false,
    chatExists: chatNameID
  }
}

function chatExistsFailure(errorMessage){
  console.log("Deu merda checando se chat existe no action");
  return {
    type: CHAT_EXISTS_FAILURE,
    loading: false,
    chatNaoExiste: true,
    errorMessage
  }
}

export function checkChatExists(chatNameID){

  console.log("checando se chat existe no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(chatExistsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/chat_exists/'+chatNameID
    }).done(resposta => {

      console.log(resposta);
      // Dispatch the success action
      if(resposta['chat_existe'] == true){
        console.log("TEM A PORRA DO CHAT!!!!");
        dispatch(chatExistsSuccess(chatNameID));
      }else{
        console.log("NAO TEM A PORRA DO CHAT!!!!");
        dispatch(chatExistsFailure(error));
      }
      
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(chatExistsFailure(error));

    });

  }
}


export const ADD_CHAT_REQUEST = 'ADD_CHAT_REQUEST'
export const ADD_CHAT_SUCCESS = 'ADD_CHAT_SUCCESS'
export const ADD_CHAT_FAILURE = 'ADD_CHAT_FAILURE'


function addChatRequest(){
  console.log("Indo add chat do coach no action!");
  return {
    type: ADD_CHAT_REQUEST,
    loading: true 
  }
}

function addChatSuccess(chatsInfo){
  console.log("Adicionar chat no action");
  return {
    type: ADD_CHAT_SUCCESS,
    loading: false,
    coachChats: chatsInfo
  }
}

function addChatFailure(errorMessage){
  console.log("Deu merda no add coach chat no action");
  return {
    type: ADD_CHAT_FAILURE,
    loading: false,
    errorMessage
  }
}

export function addChat(chatNameID, coachUsername, pacientesUsernames){

  console.log("checando se chat existe no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(addChatRequest());

    // Nao pode mandar array para a request entao tenho que stringify
    const pacUsernamesSTR = JSON.stringify(pacientesUsernames);

    const data = {"chatNameID":chatNameID, "coachUsername":coachUsername, "pacientesUsernames": pacUsernamesSTR}
    jQuery.ajax({
      type: 'POST',
      url: '/api/chats/',
      data: data
    }).done(chatsInfo => {

      console.log("TODOS OS CHATS DESSE COACH");
      console.log(chatsInfo);
      // Dispatch the success action
      dispatch(addChatSuccess(chatsInfo));
      
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(addChatFailure(error));

    });

  }
}


export const GET_COACH_CHATS_REQUEST = 'GET_COACH_CHATS_REQUEST'
export const GET_COACH_CHATS_SUCCESS = 'GET_COACH_CHATS_SUCCESS'
export const GET_COACH_CHATS_FAILURE = 'GET_COACH_CHATS_FAILURE'

function getCoachChatsRequest(){
  console.log("Pegando chats do coach no action!");
  return {
    type: GET_COACH_CHATS_REQUEST,
    loading: true 
  }
}

function getCoachChatsSuccess(coachChats){
  console.log("Pegou chats do coach no action");
  return {
    type: GET_COACH_CHATS_SUCCESS,
    loading: false,
    coachChats: coachChats
  }
}

function getCoachChatsFailure(errorMessage){
  console.log("Deu merda chats do coach no action");
  return {
    type: GET_COACH_CHATS_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getCoachChats(coachUsername){

  console.log("Tentando pegar chats do coach no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(getCoachChatsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/chats/coach/'+coachUsername
    }).done(chatsInfo => {

      console.log("TODOS OS CHATS DESSE COACH");
      console.log(chatsInfo);
      // Dispatch the success action
      dispatch(getCoachChatsSuccess(chatsInfo));
      
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(getCoachChatsFailure(error));

    });

  }
}