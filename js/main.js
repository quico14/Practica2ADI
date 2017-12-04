//Este es el "archivo inicial" tal y como está configurado en webpack
//La ejecución de js comenzaría por aquí.
//importamos los componentes y los pintamos en el HTML con ReactDOM.render




import React from 'react'
import ReactDOM from 'react-dom'  
import { createStore } from 'redux'

import rootReducer from './redux/reducers'
//Al ser un export default, al importarlo podemos cambiarle el nombre
import LoginContainer from './LoginContainer'
import EventEmitter from 'wolfy87-eventemitter'

var store = createStore(rootReducer)

ReactDOM.render(<LoginContainer store={store}/>
            , document.getElementById('login'));