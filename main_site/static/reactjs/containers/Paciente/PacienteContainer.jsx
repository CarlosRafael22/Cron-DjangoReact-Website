import React from "react"
import PacienteListContainer from "./PacienteListContainer"

export default class PacienteContainer extends React.Component{


	render() {

    // Se tiver dado um match no path do Receita, por exemplo: /receitas/12 o this.props.children nao vai ser num e a gnt render essa view
    // se nao der match quer dizer que estamos no /receitas/ entao so render ReceitaListContainer
    return (
      <div className="container">
        <div className="row"> 
          {this.props.children != null ? this.props.children : <PacienteListContainer /> }       
        </div>
      </div>
    )
  }
}