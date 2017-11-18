import React from 'react'
import {Thumbnail} from 'react-bootstrap'
import {Grid} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Glyphicon} from 'react-bootstrap'
import styles from '../styles/styles.css'


class Articulo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingArticles: true,
            list : [],
            hayArticulos: true,
            crearArticulo: false,
            cantidad: 0,
            precio: 0,
            nombre: "",
            formIncorrecto: false,
            modifyArticle: false,
            showingInfo: false,
            idModifyArticle: 0
        };
        this.getMyArticles()
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
    
        this.setState({
          [name]: target.value
        });
    }

    getMyArticles = () => {
        fetch("http://localhost:3000/usuarios/" + localStorage.getItem("user") + "/articulos", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(respuesta => {
            return respuesta.json();
        }).then(resultado => {
           if (resultado.message) {
            this.setState({
                showingArticles: true,
                hayArticulos: false
            })
           } else {
                this.setState({
                    showingArticles: true,
                    hayArticulos: true,
                    list: []
                })
                resultado.map(articulo => 
                    this.setState({
                        list: this.state.list.concat([articulo])
                    })   
                )
            }
        })   
    }

    createArticuloPage = () => {
        this.setState({
            crearArticulo: true,
            showingArticles: false,
            nombre: "",
            cantidad: 0,
            precio: 0
        }) 
    }

    modifyArticlePage = (item) => {
        this.setState({
            crearArticulo: false,
            showingArticles: false,
            modifyArticle: true,
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio,
            idModifyArticle: item.ID,
            showingInfo: false
        }) 
    }

    deleteArticle = item => {
        fetch("http://localhost:3000/usuarios/" + localStorage.getItem("user") + "/articulos/" + item.ID, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'token' : localStorage.getItem('token')
            }
        }).then(respuesta => {
            var array = this.state.list;
            var index = array.indexOf(item)
            array.splice(index, 1);
            this.setState({
                list: array
            })
            if (array.length == 0) {
                this.setState({
                    hayArticulos: false
                })
            }
       })
    }

    getArticle = item => {
        fetch("http://localhost:3000/usuarios/" + localStorage.getItem("user") + "/articulos/" + item.ID, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(respuesta => {
            return respuesta.json()
        }).then(resultado => {
            this.setState({
                showingInfo: true,
                showingArticles: false,
                crearArticulo: false,
                nombre: resultado.nombre,
                cantidad: resultado.precio,
                precio: resultado.cantidad
            }) 
        })
    }

    handleCreate = (event) => {
        if (this.state.cantidad < 1 || this.state.precio < 0.01 || !this.state.nombre) {
            this.setState({
                formIncorrecto: true
            })
        } else {
            fetch("http://localhost:3000/usuarios/" + localStorage.getItem('user') + "/articulos", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'token' : localStorage.getItem('token')
                },
                body: JSON.stringify({  nombre: this.state.nombre,
                                        cantidad: this.state.cantidad,
                                        precio: this.state.precio
                                    })
            }).then(respuesta => {
                this.getMyArticles();
            });
        }
    }

    handleModify = id => {
        if (this.state.cantidad < 1 || this.state.precio < 0.01 || !this.state.nombre) {
            this.setState({
                formIncorrecto: true
            })
        } else {
            fetch("http://localhost:3000/usuarios/" + localStorage.getItem('user') + "/articulos/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                    'token' : localStorage.getItem('token')
                },
                body: JSON.stringify({  nombre: this.state.nombre,
                                        cantidad: this.state.cantidad,
                                        precio: this.state.precio
                                    })
            }).then(respuesta => {
                this.getMyArticles();
            });
        }
    }

    render() {
        if (this.state.showingArticles && this.state.hayArticulos) {
            return (
                <div className="body-cards">
                    <ul className="surveys grid">
                        {this.state.list.map(item => { 
                            return (
                                <li className="survey-item" key={item.ID}>
                                    <span className="survey-name">
                                        {item.nombre}
                                    </span>
                                    <br/>
                                    <span className="survey-country grid-only">
                                        {item.cantidad}
                                    </span>
                                    <br/>
                                    <div className="pull-right">
                                        <span className="survey-progress">
                                            <span className="survey-progress-labels">
                                                <span className="survey-progress-label">
                                                    <Button bsStyle="link" className="glyphicon-card" onClick={() => {this.deleteArticle(item)}} title="Borrar artículo"><Glyphicon glyph="trash" /></Button>
                                                </span>
                                                <span className="survey-progress-label">
                                                    <Button bsStyle="link" className="glyphicon-card" onClick={() => {this.modifyArticlePage(item)}} title="Editar artículo"><Glyphicon glyph="pencil"/></Button>
                                                </span>
                                                <span className="survey-progress-label">
                                                    <Button bsStyle="link" className="glyphicon-card" onClick={() => {this.getArticle(item)}} title="Detalles del artículo"><Glyphicon glyph="info-sign"/></Button>
                                                </span>
                                            </span>
                                        </span>
                                        <br/>
                                        <span className="survey-end-date">
                                            {item.precio}
                                        </span>
                                        <span className="survey-stage">
                                            <span className="stage draft">Draft</span>
                                            <span className="stage awarded">Awarded</span>
                                            <span className="stage live active">Live</span>
                                            <span className="stage ended">Ended</span>        
                                        </span>
                                    </div>
                                    <span className="survey-name">
                                        
                                    </span>
                                </li>
                                    
                            )
                        })}
                    </ul>  
                </div>
            )
        } else if(!this.state.hayArticulos && this.state.showingArticles) {
            return (
                <div className="container-login">
                    <div className="my-center" className="body-login">
                        <h1>No tienes ningún artículo</h1>
                    </div>
                </div>
            )     
        } else if(this.state.crearArticulo) {
            return (
                <div className="container-login">
                    <div className="my-center" className="body-login">
                        <h1>Crea un nuevo artículo</h1>         
                        <form className="form">
                            <input type="text" defaultValue="" placeholder="Nombre" name="nombre" onChange={this.handleInputChange}/>
                            <input type="number" defaultValue="" min="1" placeholder="Cantidad (mín. 1)" name="cantidad" onChange={this.handleInputChange}/>
                            <input type="number" defaultValue="" min="0.01" placeholder="Precio (mín. 0.01)" name="precio" onChange={this.handleInputChange}/>
                            <button id="crear-articulo" type="button" onClick={this.handleCreate}>Crear artículo</button>
                            {this.state.formIncorrecto === true &&
                            <h1>Revisa tu formulario</h1>}
                        </form>
                    </div>
                </div>
            )
        } else if(this.state.showingInfo) {
            return (
                <div className="container-info">
                    <div className="my-center" className="body-login">       
                        <form className="form">
                            <h1>Nombre: {this.state.nombre}</h1>
                            <h1>Cantidad: {this.state.cantidad} uds.</h1>
                            <h1>Precio: {this.state.precio}€</h1>
                        </form>
                    </div>
                </div>
            )
        } else{
            return (
                <div className="container-login">
                    <div className="my-center" className="body-login">
                        <h1>Modifica un artículo</h1>         
                        <form className="form">
                            <input type="text" defaultValue={this.state.nombre} placeholder="Nombre" name="nombre" onChange={this.handleInputChange}/>
                            <input type="number" min="1" defaultValue={this.state.cantidad} placeholder="Cantidad (mín. 1)" name="cantidad" onChange={this.handleInputChange}/>
                            <input type="number" min="0.01" defaultValue={this.state.precio} placeholder="Precio (mín. 0.01)" name="precio" onChange={this.handleInputChange}/>
                            <button id="crear-articulo" type="button" onClick={() => {this.handleModify(this.state.idModifyArticle)}}>Modificar artículo</button>
                            {this.state.formIncorrecto === true &&
                            <h1>Revisa tu formulario</h1>}
                        </form>
                    </div>
                </div>
            )
        }
    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default Articulo