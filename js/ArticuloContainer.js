import React from 'react'
import Articulo from './Articulo'
import {    mostrarSinArticulos, mostrarConArticulos, paginaCreaArticulo, borraSinArticulos,
            paginaModificaArticulo, paginaMuestraArticulo, borraArticulo, formCrearIncorrecto,
            formModificarIncorrecto
} from './redux/acciones';

//En redux un "container" es un componente que se conecta con el store
//y le despacha acciones y/o recibe los cambios de estado.
//En este caso solo despachamos acciones.
//Recibimos el store en la prop del mismo nombre
//Con la librería 'react-redux' se simplificaría la sintaxis de conexión con el store
//pero de momento se hace así para que se vea qué está pasando 
class ArticuloContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showingArticles: true,
            list : [],
            hayArticulos: true,
            crearArticulo: false,
            formIncorrecto: false,
            modifyArticle: false,
            showingInfo: false,
            idModifyArticle: 0,
            nombre: "",
            cantidad: 0,
            precio: 0
        };
    }

    componentDidMount() {
        //Nos suscribimos a los cambios de estado del store
        this.props.store.subscribe(() => {
            //copiamos el estado del store en el estado local del componente
            //para que al cambiar el estado local se dispare un re-render.
            //En este ejemplo nos interesa el estado completo del store
            //pero normalmente sería solo una parte
            this.setState({ 
                showingArticles: this.props.store.getState().showingArticles,
                list: this.props.store.getState().list,         
                hayArticulos: this.props.store.getState().hayArticulos,
                crearArticulo: this.props.store.getState().crearArticulo,           
                formIncorrecto: this.props.store.getState().formIncorrecto,
                modifyArticle: this.props.store.getState().modifyArticle,
                showingInfo: this.props.store.getState().showingInfo,
                idModifyArticle: this.props.store.getState().idModifyArticle,
                nombre: this.props.store.getState().nombre,
                cantidad: this.props.store.getState().cantidad,
                precio: this.props.store.getState().precio
            })
        })
    }

    handleMostrarSinArticulos = () => {
        this.props.store.dispatch(mostrarSinArticulos())
    }

    handleMostrarConArticulos = (list) => {
        this.props.store.dispatch(mostrarConArticulos(list))
    }

    handlePaginaCreaArticulo = () => {
        this.props.store.dispatch(paginaCreaArticulo())
    }

    handlePaginaModificaArticulos = (nombre, cantidad, precio, id) => {
        this.props.store.dispatch(paginaModificaArticulo(nombre, cantidad, precio, id))
    }

    handlePaginaMuestraArticulo = (nombre, cantidad, precio) => {
        this.props.store.dispatch(paginaMuestraArticulo(nombre, cantidad, precio))
    }

    handleBorraArticulo = (list) => {
        this.props.store.dispatch(borraArticulo(list))
    }

    handleFormCrearIncorrecto = () => {
        this.props.store.dispatch(formCrearIncorrecto())
    }

    handleFormModificarIncorrecto = () => {
        this.props.store.dispatch(formModificarIncorrecto())
    }

    render() {
        return <Articulo    handleMostrarSinArticulos = {this.handleMostrarSinArticulos}
                            handleMostrarConArticulos = {this.handleMostrarConArticulos}
                            handlePaginaCreaArticulo = {this.handlePaginaCreaArticulo}
                            handlePaginaModificaArticulos = {this.handlePaginaModificaArticulos}
                            handlePaginaMuestraArticulo = {this.handlePaginaMuestraArticulo}
                            handleBorraArticulo = {this.handleBorraArticulo}
                            handleFormCrearIncorrecto = {this.handleFormCrearIncorrecto}
                            handleFormModificarIncorrecto = {this.handleFormModificarIncorrecto}
                            list = {this.state.list}
                            showingArticles = {this.state.showingArticles}
                            hayArticulos = {this.state.hayArticulos}
                            crearArticulo = {this.state.crearArticulo}
                            showingInfo = {this.state.showingInfo}
                            idModifyArticle = {this.state.idModifyArticle}
                            formIncorrecto = {this.state.formIncorrecto}
                            nombre = {this.state.nombre}
                            cantidad = {this.state.cantidad}
                            precio = {this.state.precio}
                            store = {this.props.store}
                            ref="Articulo"/>
    }
}

export default ArticuloContainer