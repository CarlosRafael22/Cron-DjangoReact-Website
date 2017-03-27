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

export default function getProfiles(){

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