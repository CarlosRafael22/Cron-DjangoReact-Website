import React from "react"

import Headline from "../components/Headline"
import ReceitaList from "../components/ReceitaList"
import ReceitaListContainer from "../containers/ReceitaListContainer"

export default class App1Container extends React.Component {

  componentWillUnmount(){
    console.log("Terminando Receita");
  }

  render() {

    // Se tiver dado um match no path do Receita, por exemplo: /receitas/12 o this.props.children nao vai ser num e a gnt render essa view
    // se nao der match quer dizer que estamos no /receitas/ entao so render ReceitaListContainer
    return (
      <div className="container">
        <div className="row"> 
          {this.props.children != null ? this.props.children : <ReceitaListContainer /> }       
        </div>
      </div>
    )
  }
}