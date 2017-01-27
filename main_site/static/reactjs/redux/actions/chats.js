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


export const ADD_CHAT_SUCCESS = 'ADD_CHAT_SUCCESS'

function addChatSuccess(chatsInfo){
  console.log("Adicionar chat no action");
  return {
    type: ADD_CHAT_SUCCESS,
    chats: chatsInfo
  }
}

export function addChat(chatNameID, coachUsername){

  console.log("checando se chat existe no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(chatExistsRequest());

    const data = {"chatNameID":chatNameID, "coachUsername":coachUsername}
    jQuery.ajax({
      type: 'POST',
      url: '/api/chats/',
      data: data
    }).done(chatsInfo => {

      console.log(chatsInfo);
      // Dispatch the success action
      dispatch(addChatSuccess(chatsInfo));
      
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(chatExistsFailure(error));

    });

  }
}