// There are three possible states for our login
// process and we need actions for each of them
export const COACH_PATIENTS_REQUEST = 'COACH_PATIENTS_REQUEST'
export const COACH_PATIENTS_SUCCESS = 'COACH_PATIENTS_SUCCESS'
export const COACH_PATIENTS_FAILURE = 'COACH_PATIENTS_FAILURE'

function coachPatientsRequest(){
  console.log("Pegando os pacientes do coach no action!");
  return {
    type: COACH_PATIENTS_REQUEST,
    loading: true 
  }
}

function coachPatientsSuccess(coachPatientsList){
  console.log("Pegou os pacientes do coach no action");
  return {
    type: COACH_PATIENTS_SUCCESS,
    loading: false,
    coachPatientsList: coachPatientsList
  }
}

function coachPatientsFailure(errorMessage){
  console.log("Deu merda nos pacientes do coach no action");
  return {
    type: COACH_PATIENTS_FAILURE,
    loading: false,
    errorMessage
  }
}

export default function getCoachPatients(coachId){

  console.log("getCoachPatients no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(coachPatientsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/coaches/'+coachId.toString()+'/pacientes_supervisionados/',
      contentType: 'application/json'
    }).done(pacientes_supervisionados => {
      console.log("PAC SUPERVISIONADOS");
      console.log(pacientes_supervisionados);
      // Dispatch the success action
      dispatch(coachPatientsSuccess(pacientes_supervisionados));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(coachPatientsFailure(error))

    });

  }
}


export const ADD_COACH_PATIENTS_REQUEST = 'ADD_COACH_PATIENTS_REQUEST'
export const ADD_COACH_PATIENTS_SUCCESS = 'ADD_COACH_PATIENTS_SUCCESS'
export const ADD_COACH_PATIENTS_FAILURE = 'ADD_COACH_PATIENTS_FAILURE'

function addCoachPatientsRequest(){
  console.log("Pegando os pacientes do coach no action!");
  return {
    type: ADD_COACH_PATIENTS_REQUEST,
    loading: true 
  }
}

function addCoachPatientsSuccess(coachPatientsList){
  console.log("Pegou os pacientes do coach no action");
  return {
    type: ADD_COACH_PATIENTS_SUCCESS,
    loading: false,
    coachPatientsList: coachPatientsList
  }
}

function addCoachPatientsFailure(errorMessage){
  console.log("Deu merda nos pacientes do coach no action");
  return {
    type: ADD_COACH_PATIENTS_FAILURE,
    loading: false,
    errorMessage
  }
}

export default function getCoachPatients(coachId){

  console.log("getCoachPatients no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(addCoachPatientsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/coaches/'+coachId.toString()+'/pacientes_supervisionados/',
      contentType: 'application/json'
    }).done(pacientes_supervisionados => {
      console.log("PAC SUPERVISIONADOS");
      console.log(pacientes_supervisionados);
      // Dispatch the success action
      dispatch(addCoachPatientsSuccess(pacientes_supervisionados));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(addCoachPatientsFailure(error))

    });

  }
}