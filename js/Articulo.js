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
            cantidad: 0,
            precio: 0,
            nombre: ""
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
            this.props.handleMostrarSinArticulos()
           } else {
                this.props.handleMostrarConArticulos(resultado)
            }
        })   
    }

    createArticuloPage = () => {
        this.props.handlePaginaCreaArticulo()
    }

    modifyArticlePage = (item) => {
        this.props.handlePaginaModificaArticulos(item.nombre, item.cantidad, item.precio, item.ID)
    }

    deleteArticle = item => {
        fetch("http://localhost:3000/usuarios/" + localStorage.getItem("user") + "/articulos/" + item.ID, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'token' : localStorage.getItem('token')
            }
        }).then(respuesta => {
            var array = this.props.list;
            var index = array.indexOf(item)
            array.splice(index, 1);
            this.props.handleBorraArticulo(array)
            if (array.length == 0) {
                this.props.handleMostrarSinArticulos()
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
            this.props.handlePaginaMuestraArticulo(item.nombre, item.cantidad, item.precio)
        })
    }

    handleCreate = (event) => {
        if (this.state.cantidad < 1 || this.state.precio < 0.01 || !this.state.nombre) {
            this.props.handleFormCrearIncorrecto()
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
            this.props.handleFormModificarIncorrecto()
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
        if (this.props.showingArticles && this.props.hayArticulos) {
            return (
                <div className="body-cards">
                    <ul className="surveys grid">
                        {this.props.list.map(item => { 
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
        } else if(!this.props.hayArticulos && this.props.showingArticles) {
            return (
                <div className="container-login">
                    <div className="my-center" className="body-login">
                        <h1>No tienes ningún artículo</h1>
                    </div>
                </div>
            )     
        } else if(this.props.crearArticulo) {
            return (
                <div className="container-login">
                    <div className="my-center" className="body-login">
                        <h1>Crea un nuevo artículo</h1>         
                        <form className="form">
<<<<<<< HEAD
                            <input type="text" value={this.state.nombre} placeholder="Nombre" name="nombre" onChange={this.handleInputChange}/>
                            <input type="number" value={this.state.cantidad} min="1" placeholder="Cantidad (mín. 1)" name="cantidad" onChange={this.handleInputChange}/>
                            <input type="number" value={this.state.precio} min="0.01" placeholder="Precio (mín. 0.01)" name="precio" onChange={this.handleInputChange}/>
=======
                            <input type="text" value="" placeholder="Nombre" name="nombre" onChange={this.handleInputChange}/>
                            <input type="number" value="" min="1" placeholder="Cantidad (mín. 1)" name="cantidad" onChange={this.handleInputChange}/>
                            <input type="number" value="" min="0.01" placeholder="Precio (mín. 0.01)" name="precio" onChange={this.handleInputChange}/>
>>>>>>> b64aa8ab1b62221f0a7744f10758af2719d692d1
                            <button id="crear-articulo" type="button" onClick={this.handleCreate}>Crear artículo</button>
                            {this.state.formIncorrecto === true &&
                            <h1>Revisa tu formulario</h1>}
                        </form>
                    </div>
                </div>
            )
        } else if(this.props.showingInfo) {
            return (
                <div className="container-info">
                    <div className="my-center" className="body-login">       
                        <form className="form">
                            <h1>Nombre: {this.props.nombre}</h1>
                            <h1>Cantidad: {this.props.cantidad} uds.</h1>
                            <h1>Precio: {this.props.precio}€</h1>
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
                            <input type="text" defaultValue={this.props.nombre} placeholder="Nombre" name="nombre" onChange={this.handleInputChange}/>
                            <input type="number" min="1" defaultValue={this.props.cantidad} placeholder="Cantidad (mín. 1)" name="cantidad" onChange={this.handleInputChange}/>
                            <input type="number" min="0.01" defaultValue={this.props.precio} placeholder="Precio (mín. 0.01)" name="precio" onChange={this.handleInputChange}/>
                            <button id="crear-articulo" type="button" onClick={() => {this.handleModify(this.props.idModifyArticle)}}>Modificar artículo</button>
                            {this.props.formIncorrecto === true &&
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