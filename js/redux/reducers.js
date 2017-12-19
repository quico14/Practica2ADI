import {
    LOG_IN, 
    LOG_OUT, 
    USER_NOT_EXIST, 
    MOSTRAR_SIN_ARTICULOS, 
    MOSTRAR_CON_ARTICULOS,
    PAGINA_CREA_ARTICULO, 
    PAGINA_MODIFICA_ARTICULO, 
    PAGINA_MUESTRA_ARTICULO, 
    PAGINA_BORRA_ARTICULO, 
    FORM_CREAR_INCORRECTO,
    FORM_MODIFICAR_INCORRECTO
} from './acciones'

    const initialState = {
        logged: localStorage.getItem('token') !== null,
        existUser: true
    }


    

export default function reducer(estado = initialState, accion) {
   switch (accion.type) {
        case LOG_IN: return Object.assign({}, estado, {
            logged: true
        })
        case USER_NOT_EXIST: return Object.assign({}, estado, {
            existUser: false
        })
        case LOG_OUT: return Object.assign({}, estado, {
            logged: false,
            existUser: true
        })
        case MOSTRAR_SIN_ARTICULOS: return Object.assign({}, estado, {
            showingArticles: true,
            hayArticulos: false
        })
        case MOSTRAR_CON_ARTICULOS: return Object.assign({}, estado, {
            showingArticles: true,
            hayArticulos: true,
            list: accion.list
        })
        case PAGINA_CREA_ARTICULO: return Object.assign({}, estado, {
            crearArticulo: true,
            showingArticles: false,
            formIncorrecto: false,
            nombre: "",
            cantidad: "",
            precio: ""
        })
        case PAGINA_MODIFICA_ARTICULO: return Object.assign({}, estado, {
            crearArticulo: false,
            showingArticles: false,
            modifyArticle: true,
            nombre: accion.nombre,
            cantidad: accion.cantidad,
            precio: accion.precio,
            idModifyArticle: accion.id,
            showingInfo: false
        })
        case PAGINA_MUESTRA_ARTICULO: return Object.assign({}, estado, {
            showingInfo: true,
            showingArticles: false,
            crearArticulo: false,
            nombre: accion.nombre,
            cantidad: accion.precio,
            precio: accion.cantidad
        })
        case PAGINA_BORRA_ARTICULO: return Object.assign({}, estado, {
            list: accion.list
        })
        case FORM_CREAR_INCORRECTO: return Object.assign({}, estado, {
            formIncorrecto: true
        })
        case FORM_MODIFICAR_INCORRECTO: return Object.assign({}, estado, {
            formIncorrecto: true
        })
        default: return estado
    }  
}