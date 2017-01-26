// Initializes FriendlyChat.
export default function FriendlyChat() {
  this.checkSetup();

  //Shortcuts to DOM Elements.
  this.messageList = document.getElementById('messages');
  console.log(this.messageList);
  this.messageForm = document.getElementById('message-form');
  console.log(this.messageForm);
  this.messageInput = document.getElementById('message');
  console.log(this.messageInput);
  this.submitButton = document.getElementById('submit');
  this.submitImageButton = document.getElementById('submitImage');
  this.imageForm = document.getElementById('image-form');
  this.mediaCapture = document.getElementById('mediaCapture');
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  //this.signInButton = document.getElementById('sign-in');
  console.log("Bindeou");
  //this.signOutButton = document.getElementById('sign-out');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');
  console.log(this.signInSnackbar);

  // Saves message on form submit.
  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  //this.signOutButton.addEventListener('click', this.signOut.bind(this));
  //this.signInButton.addEventListener('click', this.signIn.bind(this));
  console.log("Sign in button");
  console.log(this.signInButton);

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', this.toggleButton.bind(this));
  this.messageInput.addEventListener('change', this.toggleButton.bind(this));
  console.log(this.messageInput);

  // Events for image upload.
  this.submitImageButton.addEventListener('click', function() {
    this.mediaCapture.click();
  }.bind(this));
  this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));

  this.initFirebase();
  console.log(this);
}


// Sets up shortcuts to Firebase features and initiate firebase auth.
FriendlyChat.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
  // Shortcuts to Firebase SDK features
  console.log("CONFIGURANDO FIREBASE");
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

  this.imageFile = require('../../images/profile_placeholder.png');
};

// Loads chat messages history and listens for upcoming ones.
FriendlyChat.prototype.loadMessages = function() {
  // TODO(DEVELOPER): Load and listens for new messages.
  // Reference to the /messages/ database path
  this.messagesRef = this.database.ref('messages');

  //Make sure we remove all previous listeners
  this.messagesRef.off();

  //Loads the last 12 messages and listen for new ones
  var setMessage = function(data){
	var val = data.val();
	this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);


  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);
};

// Saves a new message on the Firebase DB.
FriendlyChat.prototype.saveMessage = function(e) {
  e.preventDefault();
  console.log("Save message");
  console.log(this);
  // Check that the user entered a message and is signed in.
  if (this.messageInput.value && this.checkSignedInWithMessage()) {

	// TODO(DEVELOPER): push new message to Firebase.
	var currentUser = this.auth.currentUser;
	console.log("Mandei msg");
	console.log(currentUser);
	console.log(this.messageInput.value);

	// Add a new message entry to the Firebase Database
	this.messagesRef.push({
	  name: currentUser.displayName,
	  text: this.messageInput.value,
	  photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
	}).then(function(){
	  // Clear message text field and SEND button state
	  FriendlyChat.resetMaterialTextfield(this.messageInput);
	  this.toggleButton();
	}.bind(this)).catch(function(error){
	  console.error('Error writing new message to Firebase Database', error);
	});

  }else{
  	console.log("Deu merda");
  }
};

// Sets the URL of the given img element with the URL of the image stored in Firebase Storage.
FriendlyChat.prototype.setImageUrl = function(imageUri, imgElement) {
  imgElement.src = imageUri;

  // TODO(DEVELOPER): If image is on Firebase Storage, fetch image URL and set img element's src.
};

// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
FriendlyChat.prototype.saveImageMessage = function(event) {
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  this.imageForm.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
	var data = {
	  message: 'You can only share images',
	  timeout: 2000
	};
	this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
	return;
  }
  // Check if the user is signed-in
  if (this.checkSignedInWithMessage()) {

	// TODO(DEVELOPER): Upload image to Firebase storage and add message.

  }
};

// Signs-in Friendly Chat.
FriendlyChat.prototype.signIn = function() {

 //  function getUserInfo(auth, result){
 //  	// This gives you a Google Access Token. You can use it to access the Google API.
	// var token = result.credential.accessToken;
	// // The signed-in user info.
	// var user = result.user;

	// auth.info = {
	// 	"token": token,
	// 	"user": user
	// };
	// console.log("Logou");
	// console.log(auth.info);
 //  }

  // TODO(DEVELOPER): Sign in Firebase with credential from the Google user.
  // Sign in Firebase using popup auth and Google as the identity provider
  console.log("Clicou");
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider).then(function(result){
  	// This gives you a Google Access Token. You can use it to access the Google API.
  	console.log("SignPopUp");
  	console.log(result);
	var token = result.credential.accessToken;
	// The signed-in user info.
	var user = result.user;

	let info = {
		"token": token,
		"user": user
	};
	console.log("Logou");
	console.log(info);
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(errorMessage);
});
  console.log(this.auth);
};
// this.auth.signInWithPopup(provider).then(getUserInfo(this.auth, result));
//   console.log(this.auth);
// };

// Signs-out of Friendly Chat.
FriendlyChat.prototype.signOut = function() {
  // TODO(DEVELOPER): Sign out of Firebase.
  console.log("Signing out Firebase");
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FriendlyChat.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
	// Get profile pic and user's name from the Firebase user object.
	console.log("Tem user");
	console.log(this.auth);
	console.log(this.auth.currentUser);
	var profilePicUrl = user.photoURL;   // TODO(DEVELOPER): Get profile pic.
	console.log(profilePicUrl);
	var userName = user.displayName;        // TODO(DEVELOPER): Get user's name.

	// Set the user's profile pic and name.
	this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
	this.userName.textContent = userName;

	// Show user's profile and sign-out button.
	this.userName.removeAttribute('hidden');
	this.userPic.removeAttribute('hidden');
	//this.signOutButton.removeAttribute('hidden');

	// Hide sign-in button.
	//this.signInButton.setAttribute('hidden', 'true');

	// We load currently existing chant messages.
	this.loadMessages();
  } else { // User is signed out!
	// Hide user's profile and sign-out button.
	console.log("Nao tem user");
	this.userName.setAttribute('hidden', 'true');
	this.userPic.setAttribute('hidden', 'true');
	//this.signOutButton.setAttribute('hidden', 'true');

	// Show sign-in button.
	//this.signInButton.removeAttribute('hidden');
	//Make sure we remove all previous listeners
	this.messagesRef != null? this.messagesRef.off() : console.log("Ainda nao tem Referencia para o Banco");
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
FriendlyChat.prototype.checkSignedInWithMessage = function() {
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */
  if(this.auth.currentUser){
	return true;
  }
  // Display a message to the user using a Toast.
  var data = {
	message: 'You must sign-in first',
	timeout: 2000
  };
  //this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Resets the given MaterialTextField.
FriendlyChat.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
FriendlyChat.MESSAGE_TEMPLATE =
	'<div class="message-container">' +
	  '<div class="spacing"><div class="pic"></div></div>' +
	  '<div class="message"></div>' +
	  '<div class="name"></div>' +
	'</div>';

// A loading image URL.
FriendlyChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
FriendlyChat.prototype.displayMessage = function(key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
	var container = document.createElement('div');
	container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;
	div = container.firstChild;
	div.setAttribute('id', key);
	this.messageList.appendChild(div);
  }
  if (picUrl) {
  	console.log("Viu a foto");
  	// console.log(div);
	div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  // console.log("Saiu da foto");
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
	messageElement.textContent = text;
	// Replace all line breaks by <br>.
	messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUri) { // If the message is an image.
	var image = document.createElement('img');
	image.addEventListener('load', function() {
	  this.messageList.scrollTop = this.messageList.scrollHeight;
	}.bind(this));
	this.setImageUrl(imageUri, image);
	messageElement.innerHTML = '';
	messageElement.appendChild(image);
  }
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
FriendlyChat.prototype.toggleButton = function() {
	console.log("To no toggleButton");
  if (this.messageInput.value) {
	this.submitButton.removeAttribute('disabled');
  } else {
	this.submitButton.setAttribute('disabled', 'true');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
FriendlyChat.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
	window.alert('You have not configured and imported the Firebase SDK. ' +
		'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
	window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
		'actually a Firebase bug that occurs rarely. ' +
		'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
		'and make sure the storageBucket attribute is not empty. ' +
		'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
		'displayed there.');
  }
};