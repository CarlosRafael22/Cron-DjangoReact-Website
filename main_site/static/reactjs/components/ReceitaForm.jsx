import React from "react"

export default class ReceitaForm extends React.Component{

	constructor(){
		super();

		this.state = {
			data_uri: null,
			processing: false
		}
	}

	_handleFile(event){

		const reader = new FileReader();
		const file = event.target.files[0];
		console.log(file);

		reader.onload = (upload) => {
			this.setState({
				data_uri: upload.target.result,
				filename: file.name,
				filetype: file.type
			});
		};

		reader.readAsDataURL(file);
	}

	_handleSubmit(event){
		// Then the page doesnt reaload when the form is submitted!!
		event.preventDefault();

		// Populated from refs in JSX
		let tempo_preparo = this._tempo_preparo;
		let nivel_dificuldade = this._nivel_dificuldade;
		let nome_receita = this._nome_receita;
		let ingredientes = this._ingredientes;
		let modo_preparo = this._modo_preparo;
		let categoria = this._categoria;
		//let foto_receita = this._foto;

		console.log("No form");
		//console.log(foto_receita.value);
		console.log(this.state);

		// Criando o objeto que vai ser mandado com a foto
		const foto_data = {
			data_uri: this.state.data_uri,
			filename: this.state.filename,
			filetype: this.state.filetype
		};
		console.log(foto_data);

		const lista_ingredientes = ingredientes.value.split('\n');
		//console.log(lista_ingredientes);

		const lista_modo_preparo = modo_preparo.value.split('\n');

		this.props.addReceita(tempo_preparo.value, nivel_dificuldade.value, nome_receita.value, lista_ingredientes, lista_modo_preparo, categoria.value, null);
		this._tempo_preparo.value = "";
		this._nivel_dificuldade.value = "";
		this._nome_receita.value = "";
		this._ingredientes.value = "";
		this._modo_preparo.value = "";
	}

	render(){

		const imageFile = require('../../images/recipe-icon.png');

		const categorias = ['Bolos e Tortas', 'Doces e Sobremesas', 'Massas', 'Lanches'];

		const categorias_select = categorias.map( (categoria, idx) => <option key={idx}>{categoria}</option>);

		return(

			<form onSubmit={this._handleSubmit.bind(this)}>
				<div className="form-group">
					<label>Adicione novas receitas</label>

					<div className="form-group row">
						<div className="col-sm-4">
							<img src={imageFile} className="img-thumbnail" alt="Cinque Terre" width="150" height="136" />
						</div>
						<div className="col-sm-8">
							<div className="col-sm-5">
								<label htmlFor="tempo-preparo">Tempo de preparo</label>
								<input type="text" className="form-control" id="tempo-preparo" ref={(input) => this._tempo_preparo = input}/>
							</div>
							
							<div className="col-sm-5">
								<label htmlFor="nivel-dificuldade">Nivel de dificuldade</label>
								<input type="text" className="form-control" id="nivel-dificuldade" ref={(input) => this._nivel_dificuldade = input}/>
							</div>

							<div className="form-group col-sm-6">
							    <label htmlFor="categoriaSelect">Categoria da Receita</label>
							    <select className="form-control" id="categoriaSelect" ref={(select) => this._categoria = select}>
							      {categorias_select}
							    </select>
							</div>
					    	
						</div>				
					    
					</div>
					<div className="form-group">
					    <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" ref={(input) => this._foto = input}
					    onChange={this._handleFile.bind(this)}/>
					    	<small id="fileHelp" className="form-text text-muted">Essa sera a imagem de capa da receita</small>
					</div>
					<div className="form-group row">
						<label htmlFor="nome-receita" className="col-form-label col-xs-4">Nome da receita:</label>
						<div className="col-xs-8">
							<input id="nome-receita" type="text" className="form-control" ref={(input) => this._nome_receita = input} />
						</div>						
					</div>
					<div className="form-group">
					    <label htmlFor="ingredientes-textarea">Ingredientes</label>
					    <textarea className="form-control" id="ingredientes-textarea" rows="5" ref={(input) => this._ingredientes = input}></textarea>
					 </div>
					<div className="form-group">
					    <label htmlFor="modo-preparo-textarea">Modo de preparo</label>
					    <textarea className="form-control" id="modo-preparo-textarea" rows="5" ref={(input) => this._modo_preparo = input}></textarea>
					 </div>
					<div className="form-group row">
				      <div>
				        <button type="submit" className="btn btn-primary col-md-4 col-md-offset-7">Adicione</button>
				      </div>
				    </div>
				</div>
				
			</form>
		);
	}
}


ReceitaForm.propTypes = {
	addReceita: React.PropTypes.func.isRequired
};