import React from 'react'
import Login from './Login'
import { logIn, logOut, userNotExist } from './redux/acciones';

//En redux un "container" es un componente que se conecta con el store
//y le despacha acciones y/o recibe los cambios de estado.
//En este caso solo despachamos acciones.
//Recibimos el store en la prop del mismo nombre
//Con la librería 'react-redux' se simplificaría la sintaxis de conexión con el store
//pero de momento se hace así para que se vea qué está pasando 
class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: localStorage.getItem('token') !== null,
            existUser: true
        };
    }

    componentDidMount() {
        //Nos suscribimos a los cambios de estado del store
        this.props.store.subscribe(() => {
            //copiamos el estado del store en el estado local del componente
            //para que al cambiar el estado local se dispare un re-render.
            //En este ejemplo nos interesa el estado completo del store
            //pero normalmente sería solo una parte
            this.setState({ logged: this.props.store.getState().logged,
                            existUser: this.props.store.getState().existUser           
            })
        })
    }

    handleLogIn = () => {
        this.props.store.dispatch(logIn())
    }

    handleLogOut = () => {
        this.props.store.dispatch(logOut())
    }


    handleUserNotExist = () => {
        this.props.store.dispatch(userNotExist())
    }

    render() {
        return <Login   handleLogIn={this.handleLogIn}
                        handleLogOut={this.handleLogOut}
                        handleUserNotExist={this.handleUserNotExist}
                        logged={this.state.logged}
                        existUser={this.state.existUser}
                        store={this.props.store}/>
    }
}

export default LoginContainer