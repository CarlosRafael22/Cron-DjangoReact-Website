import React from "react"

import Headline from "../components/Headline"
import ReceitaList from "../components/ReceitaList"
import ReceitaListContainer from "../containers/ReceitaListContainer"

export default class App1Container extends React.Component {

  componentWillUnmount(){
    console.log("Terminando Receita");
  }

  render() {
    return (
      <div className="container">
        <div className="row">          
          <ReceitaListContainer/>
        </div>
      </div>
    )
  }
}