
export function createGrupo(grupoId, grupoName, coachUsername, pacientesUsernames){
	console.log("CRIANDO UM NOVO GRIPO NO FIREBASE");

	// Criando nova entrada na arvore de chats/
	console.log("CRIANDO UM GRUPO ID ", grupoId);
	const chatsRef = firebase.database().ref('grupos');
	chatsRef.child(grupoId).set({
		id: grupoId,
		created_At: firebase.database.ServerValue.TIMESTAMP,
		chat_id: null,
		coach_username: coachUsername,
		nome_grupo: grupoName
	}).then(function(){
		
		// No retorno do chat criado eu crio um novo node na arvore com chatUsers com os users desse chat como indices
		console.log("CRIANDO UM GRUPOUSERS ID ", grupoId);
		const chatUsersRef = firebase.database().ref('grupoUsers');
		chatUsersRef.child(grupoId+"/"+coachUsername).set(true);

		// Adicionando cada username dos pacientes
		for (const pacienteUsername of pacientesUsernames) {
	    	chatUsersRef.child(grupoId+"/"+pacienteUsername).set(true);
	    }
		
		// CRIEI O GRUPO E ADICIONEI OS USER NO GRUPOUSERS
		// E AGORA VOU CRIAR O CHAT DESSE GRUPO
		createGrupoChat(coachUsername, grupoId, pacientesUsernames);

		console.log("Criou o novo chat no Firebase de id: ", grupoId);
	}).catch(function(error){
		console.error(error);
	});
}


function createGrupoChat(coachUsername, grupoId, pacientesUsernames){
	console.log("CRIANDO UM NOVO CHAT DO GRUPO");

	//const chatID = "c"+coachId.toString()+"G"+grupoId.toString();
	const chatID = "C"+coachUsername+"G"+grupoId.toString();

	// Criando nova entrada na arvore de chats/
	console.log("CRIANDO UM CHAT GRUPO ID ", chatID);
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
		
		// Adicionando cada username dos pacientes
		for (const pacienteUsername of pacientesUsernames) {
	    	chatUsersRef.child(chatID+"/"+pacienteUsername).set(true);
	    }

		console.log("CRIANDO UM CHATMESSAGE ID ", chatID);
		const chatMsgRef = firebase.database().ref('chatMessages');
		chatMsgRef.child(chatID).set({});

		console.log("Criou o novo chat no Firebase de id: ", chatID);
	}).catch(function(error){
		console.error(error);
	});
}


export function getCoachGrupos(coachUsername, thisState, callbackFunction){

	let listaGruposDoCoach = [];

	const grupoUsersRef = firebase.database().ref('grupoUsers');
	grupoUsersRef.once("value").then(function(snapshot){
		console.log("PEGANDO OS grupoS DO COACH NO FIREBASE");
		snapshot.forEach(function(grupoIDChildSnapshot){
			// Se nesse grupoID que a gnt ta olhando tem o coach como um dos participantes
			// pegamos o id do grupo e o paciente

			// EH COM A PORRA DO HASCHILD E NAO CHILD
			if(grupoIDChildSnapshot.hasChild(coachUsername)){
				const data = grupoIDChildSnapshot.val();
				
				const key_grupoID = grupoIDChildSnapshot.key;
				console.log(key_grupoID);
				console.log(data);
				const participantes = Object.keys(data);
				listagruposDoCoach.push({"grupoID":key_grupoID, "participantes":participantes});
			}
		});
		console.log(listagruposDoCoach);
		callbackFunction(listagruposDoCoach, thisState);
	});
}