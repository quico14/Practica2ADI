export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const USER_NOT_EXIST = 'USER_NOT_EXIST'
export const MOSTRAR_SIN_ARTICULOS = 'MOSTRAR_SIN_ARTICULOS'
export const MOSTRAR_CON_ARTICULOS = 'MOSTRAR_CON_ARTICULOS'
export const PAGINA_CREA_ARTICULO = 'PAGINA_CREA_ARTICULO'
export const PAGINA_MODIFICA_ARTICULO = 'PAGINA_MODIFICA_ARTICULO'
export const PAGINA_MUESTRA_ARTICULO = 'PAGINA_MUESTRA_ARTICULO'
export const PAGINA_BORRA_ARTICULO = 'PAGINA_BORRA_ARTICULO'
export const FORM_CREAR_INCORRECTO = 'FORM_CREAR_INCORRECTO'
export const FORM_MODIFICAR_INCORRECTO = 'FORM_MODIFICAR_INCORRECTO'

export function logIn() {
    return {
        type: LOG_IN
    }
}

export function logOut() {
    return {
        type: LOG_OUT
    }
}

export function userNotExist() {
    return {
        type: USER_NOT_EXIST
    }
}

export function mostrarSinArticulos() {
    return {
        type: MOSTRAR_SIN_ARTICULOS
    }
}

export function mostrarConArticulos(list) {
    return {
        type: MOSTRAR_CON_ARTICULOS,
        list: list
    }
}

export function paginaCreaArticulo() {
    return {
        type: PAGINA_CREA_ARTICULO
    }
}

export function paginaModificaArticulo(nombre, cantidad, precio, id) {
    return {
        type: PAGINA_MODIFICA_ARTICULO,
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        id: id
    }
}

export function paginaMuestraArticulo(nombre, cantidad, precio) {
    return {
        type: PAGINA_MUESTRA_ARTICULO,
        nombre: nombre,
        cantidad: cantidad,
        precio: precio
    }
}

export function borraArticulo(list) {
    return {
        type: PAGINA_BORRA_ARTICULO,
        list: list
    }
}

export function formCrearIncorrecto() {
    return {
        type: FORM_CREAR_INCORRECTO
    }
}

export function formModificarIncorrecto() {
    return {
        type: FORM_MODIFICAR_INCORRECTO
    }
}

