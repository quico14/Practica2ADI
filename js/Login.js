import React from 'react'
import Articulo from './Articulo'
import {Button} from 'react-bootstrap'
import {Alert} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {ControlLabel} from 'react-bootstrap'
import {Checkbox} from 'react-bootstrap'
import {Navbar} from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {NavItem} from 'react-bootstrap'
import {NavDropdown} from 'react-bootstrap'
import {MenuItem} from 'react-bootstrap'
import styles from '../styles/styles.css'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logged: localStorage.getItem('token') !== null,
            existUser: true,
            showingArticles: false
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
                this.setState({
                    logged: true
                })
        }).catch(error => {
            console.log(error)
            this.setState({
                existUser: false
            })
        });
    }

    logout = () => {
        localStorage.clear()
        this.setState({
            logged: false
        })       
    }

    render() {
        if (!this.state.logged) {
            return(
                <div className="wrapper">
                    <div className="container-login">
                        <div className="my-center" className="body-login">
                            <h1>Bienvenido a UABay</h1>
                            
                            <form className="form">
                                <input type="text" placeholder="Username" name="username" onChange={this.handleInputChange}/>
                                <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange}/>
                                <button id="login-button" type="button" onClick={this.handleSubmit}>Login</button>
                            </form>
                            {this.state.existUser === false &&
                            <h1>Ese usuario no existe</h1>}
                        </div>
                    </div>
                    
                    <ul className="bg-bubbles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
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
                            <NavItem onClick={() => this.refs.Articulo.getMyArticles()}>Mis artículos</NavItem>
                            <NavItem onClick={() => this.refs.Articulo.createArticuloPage()}>Crear artículo</NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavDropdown title={localStorage.getItem('user')} id="basic-nav-dropdown">
                                <MenuItem onClick={() => {this.logout()}}>Logout</MenuItem>
                            </NavDropdown>
                            </Nav>
                        </Navbar>
                        <Articulo ref="Articulo"/>
                        
                    </div> 
                </div>
            )
        }
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Login