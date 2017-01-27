
export function createChat(coachId, pacienteId){
	console.log("CRIANDO UM NOVO CHAT");

	const chatID = "c"+coachId.toString()+"p"+pacienteId.toString();

	// Criando nova entrada na arvore de chats/
	console.log("CRIANDO UM CHAT ID ", chatID);
	const chatsRef = firebase.database().ref('chats');
	chatsRef.child(chatID).set({
		id: chatID,
		created_At: firebase.database.ServerValue.TIMESTAMP,
		last_message: null
	}).then(function(){
		console.log("Criou o novo chat no Firebase de id: ", chatID);
	}).catch(function(error){
		console.error(error);
	});

	// Criando nova entrada na arvore de chatMessages/
	console.log("CRIANDO UM CHATMESSAGE ID ", chatID);
	const chatMsgRef = firebase.database().ref('chatMessages');
	chatMsgRef.child(chatID).set({
		id: chatID
	}).then(function(){
		console.log("ChatMessage no Firebase de id: ", chatID);
	}).catch(function(error){
		console.error(error);
	});

	return chatID;
}


export function checkChatExists(coachId, pacienteId){

	console.log("CHECANDO SE EXISTE CHAT");

	const chatID = "c"+coachId.toString()+"p"+pacienteId.toString();
	const refPath = "chats/"+chatID;

	let exists;
	var ref = firebase.database().ref(refPath);
	ref.once("value")
	  .then(function(snapshot) {
	    exists = snapshot.exists();  // true
	    console.log("CHECOU AGORA, ", exists);
	    return exists;
	});
	//return true;
}

// Loads chat messages history and listens for upcoming ones.
export function listenMessagesChat(chatID){
  // TODO(DEVELOPER): Load and listens for new messages.
  // Reference to the /messages/ database path
  const refPath = "chatMessages/"+chatID;
  const chatMsgsRef = this.database.ref(refPath);

  //Make sure we remove all previous listeners
  chatMsgsRef.off();

  //Loads the last 12 messages and listen for new ones
  var setMessage = function(data){
	var val = data.val();
	this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);


  chatMsgsRef.limitToLast(12).on('child_added', setMessage);
  chatMsgsRef.limitToLast(12).on('child_changed', setMessage);
}

export function stopListeningChat(chatID){
	const refPath = "chatMessages/"+chatID;
  	const chatMsgsRef = this.database.ref(refPath);

  	//Make sure we remove all previous listeners
  	chatMsgsRef.off();
}