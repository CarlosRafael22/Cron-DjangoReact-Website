export const loadState = () => {
	console.log("Pegando do state");
	try{
		const serializedState = localStorage.getItem('state');
		// const receitas = localStorage.getItem('receitas');
		// console.log(receitas);
		if(serializedState === null){
			console.log("Foi null");
			return undefined;
		}
		const parsed = JSON.parse(serializedState);
		console.log(parsed);
		return parsed;
	}catch(error){
		console.log(error);
		return undefined;
	}
};

export const saveState = (state) => {
	console.log("Salvando no state");
	try{
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
		console.log(serializedState);
		console.log(localStorage);
	}catch(error){
		console.log("Deu erro ao salvar no localStorage");
		console.log(error);
	}
}