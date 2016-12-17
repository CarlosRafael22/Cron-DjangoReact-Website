import React from "react"
import IngredienteBox from "./IngredienteBox"
import IngredienteForm from "./IngredienteForm"

export default class IngredienteList extends React.Component{

	constructor(){
		super();

		console.log("Vou dar fetch");
		this._fetchIngredientes();
		this.state = {
			qtdsIngredientes : 5,
			ingredientes: []
		};
		//this._fetchIngredientes();
	}

	_getIngredientes(){

		console.log(this.state.ingredientes);
		return this.state.ingredientes.map( (ingrediente) => {
			return (
				<IngredienteBox nome_ingrediente= {ingrediente.nome_ingrediente} quantidade= {ingrediente.quantidade}
				key= {ingrediente.id} onDelete={this._deleteIngrediente.bind(this)} id={ingrediente.id} />
			);
		});
	}

	_fetchIngredientes(){
		console.log("No fetch");
		jQuery.get('/api/ingredientes/')
			.done(ingredientes =>{
				console.log("Retornou");
				this.setState({ingredientes});
			});
		console.log("Chegou");
	}

	// _fetchIngredientes(){

	// 	let fetchedIngredientes = [];

	// 	jQuery.get('/ingredientes/')
	// 		.done(ingredientes =>{
	// 			fetchedIngredientes = ingredientes;
	// 			console.log("Retornou");
	// 			return fetchedIngredientes;
	// 		});
	// 	console.log("Chegou");
	// }

	_deleteIngrediente(ingrediente){

		// To recebendo o props do IngredienteBox que vem com a callback onDelete tb
		// entao nao da pra fazer o indexOf(linha 62) direto e primeiro temos q pegar o 
		// ingrediente na lista do this.state
		console.log("Vou deletar");
		console.log(ingrediente);
		const ingredienteID = ingrediente.id;

		// Vai procurar o ingrediente que vai ser removido na lista de ingredientes
		let deletedIngrediente = this.state.ingredientes.filter(ingrediente => ingrediente.id == ingredienteID)[0];
		console.log(deletedIngrediente);

		jQuery.ajax({
			method: 'DELETE',
			url: `/api/ingredientes/${deletedIngrediente.id}`
		}).done(function(){
			console.log("Deletou");
		}
		);

		// Mas nao vamos esperar ate que a request pra API termine antes de atualizar o component's state.
		// We will give out user imediate visual feedback, which is known as optimistic update

		// Clonando o array existente com o Spread Operator
		const ingredientes = [...this.state.ingredientes];
		const ingredienteIndex = ingredientes.indexOf(deletedIngrediente);
		console.log(ingredienteIndex);
		// // Remove the ingrediente from the ingrediente's array
		ingredientes.splice(ingredienteIndex, 1);

		// Updates state and the UI updates imediately
		this.setState({ingredientes});
	}

	_addIngrediente(quantidade, nome_ingrediente){

		const ingrediente = {"quantidade": quantidade, "nome_ingrediente": nome_ingrediente};
		console.log("No add");
		console.log(ingrediente);

		jQuery.post('/api/ingredientes/', ingrediente)
			.done(newIngrediente => {
				console.log("Chamar fetch");
				console.log(newIngrediente);
				// Vai fazer um fetch pra ver se ta pegando certinho com o que tem de mais atual no banco
				this._fetchIngredientes()
				console.log("atualizar no Add");
				this.setState({ingredientes: this.state.ingredientes.concat([newIngrediente]) });
			});

	}

	//It's called before the component is rendered for the first time
	componentWillMount(){
		console.log("Will Mount");
		this._fetchIngredientes();
	}

	//Called after component is rendered.
	//This will be the perfect time to start the Polling -> Periodically check the server for updates
	// componentDidMount(){
	// 	this._timer = setInterval( () => this._fetchIngredientes(), 5000 );
	// }

	// //Before component will be removed from the DOM
	// componentWillUnmount(){
	// 	clearInterval(this._timer);
	// }

	render(){

		//Ver se isso realmente eh eficiente
		// Pq ai eu nao preciso chamar o fetch dps de fazer o addIngrediente, ja que vai sempre atualizar no render ao chamar o setState
		//this._fetchIngredientes()

		console.log("Vou pegar");
		const ingredientes = this._getIngredientes();
		const qtdsIngredientes = this.state.ingredientes.length;

		// Verificando se ja pegou os ingredientes do servidor
		// Se nao tiver pega ainda vai mostrar um Alert
		let ingredientesNodes;
		if(this.state.ingredientes !== "undefined"){
			ingredientesNodes = 
			<div className="panel panel-default col-md-8 col-md-offset-2">
				<div className="panel-heading">Existem {qtdsIngredientes} ingredientes no banco:</div>
				<div className="panel-body">
					{ingredientes}
				</div>
			</div>
		}else{
			<div className="alert alert-danger" role="alert">
			  <strong>Oh snap!</strong> <a href="#" className="alert-link">Ainda nao temos as receitas!</a> Estamos esperando o servidor.
			</div>
		}

		return (
			<div>
				<div className="col-md-6 col-md-offset-3 well">
					<IngredienteForm addIngrediente={this._addIngrediente.bind(this)} />
				</div>
				{ingredientesNodes}
			</div>
			
		)
	}
}