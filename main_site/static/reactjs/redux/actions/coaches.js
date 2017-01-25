// There are three possible states for our login
// process and we need actions for each of them
export const COACHES_REQUEST = 'COACHES_REQUEST'
export const COACHES_SUCCESS = 'COACHES_SUCCESS'
export const COACHES_FAILURE = 'COACHES_FAILURE'

function coachesRequest(){
  console.log("Pegando os coaches no action!");
  return {
    type: COACHES_REQUEST,
    loading: true 
  }
}

function coachesSuccess(coachesList){
  console.log("Pegou os coaches no action");
  return {
    type: COACHES_SUCCESS,
    loading: false,
    coachesList: coachesList
  }
}

function coachesFailure(errorMessage){
  console.log("Deu merda nos coaches no action");
  return {
    type: COACHES_FAILURE,
    loading: false,
    errorMessage
  }
}

export default function getCoaches(){

  console.log("getCoaches no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(coachesRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/coaches/',
      contentType: 'application/json'
    }).done(coaches => {

      console.log(coaches);
      // Dispatch the success action
      dispatch(coachesSuccess(coaches));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(coachesFailure(error))

    });

  }
}