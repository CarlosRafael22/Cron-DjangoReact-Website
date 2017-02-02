import React from "react"
import { render } from "react-dom"

import ReceitaContainer from "./containers/Receita/ReceitaContainer"

class ReceitaApp extends React.Component {
  render() {
    return (
      <ReceitaContainer />
    )
  }
}

render(<ReceitaApp/>, document.getElementById('ReceitaDiv'), function(){
	console.timeEnd('react-app')
})