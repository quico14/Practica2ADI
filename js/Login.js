import React from 'react'
import Articulo from './Articulo'
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {NavItem} from 'react-bootstrap'
import {NavDropdown} from 'react-bootstrap'
import {MenuItem} from 'react-bootstrap'
import styles from '../styles/styles.css'
import ArticuloContainer from './ArticuloContainer'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
    
        this.setState({
          [name]: target.value
        });
    }
    
    handleSubmit = (event) => {
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({  nombre_usuario: this.state.username,
                                    pass: this.state.password
                                })
        }).then(respuesta => {
            if (respuesta.status == 401 || respuesta.status == 400) {
                throw Error(respuesta.status);
            } else {
                
                return respuesta.json();
            }
        }).then(resultado => {
                localStorage.setItem('user',this.state.username)
                localStorage.setItem('token',resultado.token)
                this.props.handleLogIn()
        }).catch(error => {
            this.props.handleUserNotExist()
        });
    }

    logout = () => {
        localStorage.clear()
        this.props.handleLogOut()
    }

    render() {
        if (!this.props.logged) {
            return(
                <div className="wrapper">
                    <div className="container-login">
                        <div className="my-center" className="body-login">
                            <h1 id="welcome">Bienvenido a UABay</h1>
                            
                            <form className="form">
                                <input type="text" placeholder="Username" name="username" onChange={this.handleInputChange}/>
                                <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange}/>
                                <button id="login-button" type="button" onClick={this.handleSubmit}>Login</button>
                            </form>
                            {this.props.existUser === false &&
                            <h1 id="userNotExist">Ese usuario no existe</h1>}
                        </div>
                    </div>
                </div>
            )            
        } else {
            return (
                <div>
                    <div className="wrapper">
                        <Navbar>
                            <Navbar.Header>
                            <Navbar.Brand>
                                UABay
                            </Navbar.Brand>
                            </Navbar.Header>
                            <Nav>
                            <NavItem onClick={() => this.refs.ArticuloContainer.refs.Articulo.getMyArticles()}>Mis artículos</NavItem>
                            <NavItem onClick={() => this.refs.ArticuloContainer.refs.Articulo.createArticuloPage()}>Crear artículo</NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavDropdown title={localStorage.getItem('user')} id="basic-nav-dropdown">
                                <MenuItem onClick={() => {this.logout()}}>Logout</MenuItem>
                            </NavDropdown>
                            </Nav>
                        </Navbar>
                        <ArticuloContainer ref="ArticuloContainer" store={this.props.store}/>
                    </div> 
                </div>
            )
        }
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Login