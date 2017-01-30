//export const Firebase = {

	function _validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	};

	export function _signInFirebase(emailOrUsername, password) {
		console.log("Vou logar no Firebase");
		console.log(emailOrUsername, password);

		// Primeiro vendo se passou email ou username
		if(_validateEmail(emailOrUsername)){
			const email = emailOrUsername;
			console.log("Com email");
			firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
		  	// This gives you a Google Access Token. You can use it to access the Google API.
		  	console.log("Logou Firebase");
		  	console.log(result);
			// var token = result.credential.accessToken;
			// // The signed-in user info.
			// var user = result.user;

			// let info = {
			// 	"token": token,
			// 	"user": user
			// };
			// console.log("Info");
			// console.log(info);
		  	}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorCode === 'auth/wrong-password') {
			    alert('Wrong password.');
			  } else {
			    alert(errorMessage);
			  }
			  console.log(error);
			});
		}else{
			const username = emailOrUsername;
			console.log("Com username");
			// Se passou o username a gnt vai ter q pegar o email
			const usuariosRef = firebase.database().ref('usuarios');
			usuariosRef.orderByChild('username').startAt(username).endAt(username).once('value', function(snapshot){
				// Vai ter iterar pelo snapshot que volta para com o child() ter acesso
				// a cada user e pegar o email
				// e o snapshot:
				// Object
				//  30 : Object
					// displayName : "wilton"
					// email : "wilton@hotmail.com"
					// userUID : "iha3yNACCkPNmWI1YWlWjYMAMVH2"
					// username : "wilton"
				let email;
				console.log("Email do username: ", username);
				console.log(snapshot);
				console.log(snapshot.val());
				snapshot.forEach(function(childSnapshot){

					console.log("Child snapshot");
					console.log(childSnapshot);

					email = childSnapshot.child("email").val();
					console.log(email);
					console.log("Vou logar firebase");

				})
				
				console.log("Ja to esperando pra logar");
				firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
			  	// This gives you a Google Access Token. You can use it to access the Google API.
			  	console.log("Logou Firebase");
			  	console.log(result);
			  }).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  if (errorCode === 'auth/wrong-password') {
				    alert('Wrong password.');
				  } else {
				    alert(errorMessage);
				  }
				  console.log(error);
				});
			})

		}
	};

	export function _addUserInFirebase(username, id){
		console.log("Vai add user na tabela Firebase");
		const usuariosRef = firebase.database().ref('usuarios');
		usuariosRef.push({
			username: username,
			djangoID: id
		}).then(function(){
			console.log("Criou o novo usuario no Firebase");
		}).catch(function(error){
			console.error(error);
		});

	};


	export function _signUpFirebase(email, password, username, djangoId, tipo_de_user){
		console.log("Vou signUp no Firebase");
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){
		  	// This gives you a Google Access Token. You can use it to access the Google API.
		  	console.log("Criou no Firebase");
		  	console.log(result);
		  	console.log(result.uid);

		  	// Salvando o displayName como username pq senao ao falar no chat nao vai aparecer nome algum
		  	result.updateProfile({
		        displayName: username
		    }).then(function() {
		        // Update successful.

		        console.log("Vai add user na tabela Firebase");
				const usuariosRef = firebase.database().ref('usuarios');
				usuariosRef.child(djangoId).set({
					username: username,
					userUID: result.uid,
					email: result.email,
					displayName: result.displayName,
					tipo_de_user: tipo_de_user
				}).then(function(){
					console.log("Criou o novo usuario no Firebase");
				}).catch(function(error){
					console.error(error);
				});

		    }, function(error) {
		        // An error happened.
		        console.log("Deu merda no updateProfile");
		        console.log(error);
		    });        

		  	
		  })
		    .catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if (errorCode === 'auth/wrong-password') {
		    alert('Wrong password.');
		  } else {
		    alert(errorMessage);
		  }
		  console.log(error);
		});
	};


	export function _signOutFirebase(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  console.log("Deslogou Firebase");
		  console.log(localStorage);
		}, function(error) {
		  // An error happened.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode);
		  console.log(errorMessage);
		});
	};


//};