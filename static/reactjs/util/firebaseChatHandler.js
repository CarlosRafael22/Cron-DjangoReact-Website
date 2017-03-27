
export function createChat(coachId, pacienteId, coachUsername, pacienteUsername){
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
		
		// No retorno do chat criado eu crio um novo node na arvore com chatUsers com os users desse chat como indices
		console.log("CRIANDO UM CHATUSERS ID ", chatID);
		const chatUsersRef = firebase.database().ref('chatUsers');
		chatUsersRef.child(chatID+"/"+coachUsername).set(true);
		chatUsersRef.child(chatID+"/"+pacienteUsername).set(true);


		console.log("CRIANDO UM CHATMESSAGE ID ", chatID);
		const chatMsgRef = firebase.database().ref('chatMessages');
		chatMsgRef.child(chatID).set({});

		console.log("Criou o novo chat no Firebase de id: ", chatID);
	}).catch(function(error){
		console.error(error);
	});
}


export function getCoachChats(coachUsername, thisState, callbackFunction){

	let listaChatsDoCoach = [];

	const chatUsersRef = firebase.database().ref('chatUsers');
	chatUsersRef.once("value").then(function(snapshot){
		console.log("PEGANDO OS CHATS DO COACH NO FIREBASE");
		snapshot.forEach(function(chatIDChildSnapshot){
			// Se nesse chatID que a gnt ta olhando tem o coach como um dos participantes
			// pegamos o id do chat e o paciente

			// EH COM A PORRA DO HASCHILD E NAO CHILD
			if(chatIDChildSnapshot.hasChild(coachUsername)){
				const data = chatIDChildSnapshot.val();
				
				const key_chatID = chatIDChildSnapshot.key;
				console.log(key_chatID);
				console.log(data);
				const participantes = Object.keys(data);
				listaChatsDoCoach.push({"chatID":key_chatID, "participantes":participantes});
			}
		});
		console.log(listaChatsDoCoach);
		callbackFunction(listaChatsDoCoach, thisState);
	});
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