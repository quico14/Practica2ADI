//Este es el "archivo inicial" tal y como está configurado en webpack
//La ejecución de js comenzaría por aquí.
//importamos los componentes y los pintamos en el HTML con ReactDOM.render

import React from 'react'
import ReactDOM from 'react-dom'  
import tachado from '../styles/styles.css'
//Al ser un export default, al importarlo podemos cambiarle el nombre
import Login from './Login'
import EventEmitter from 'wolfy87-eventemitter'

ReactDOM.render(<Login/>
            , document.getElementById('login'));  

/*
//Plantilla Webpack
import Saludo from './ComponenteSaludo'

ReactDOM.render(<Saludo nombre="Pepe"/>
            , document.getElementById('componente'));  
 */
/*
        // Ejemplo 01
        //Definimos la clase del componente
        //En las propiedades de la clase como mínimo debe haber una función 'render' que devuelva el HTML del componente
        class MiComponente extends React.Component {
            render(){
                //el segundo parámetro son las propiedades del componente, este al ser muy simple no tiene :)
                return React.createElement('h1', null, "Hola, soy tu primer componente React")
            }
        }
        //mostramos el componente
        ReactDOM.render(
            React.createElement(MiComponente),      //necesitamos una instancia
            document.getElementById('componente') //dónde lo queremos dibujar
        )
*/
/*
        //Ejemplo 02
        //Definimos la clase del componente
        class MiComponente extends React.Component {
            render() {
                //en el componente las propiedades son accesibles a través de "props"
                return React.createElement('h1', null, this.props.saludo + " soy tu segundo componente React")
            }
        }
        //mostramos el componente
        ReactDOM.render(
            React.createElement(MiComponente, {saludo: 'Qué tal,'}),  //pasamos las propiedades del componente
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 03
        //Definimos la clase del componente
        class MiComponente extends React.Component {
            render() {
                return React.createElement('div', null, 
                    React.createElement('h1', null, "Otro componente React"),
                    React.createElement('p', null, "Pero ahora formado por varias etiquetas")
                )
            }
        }
        //mostramos el componente
        ReactDOM.render(
            React.createElement(MiComponente),
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 04
        //Definimos la clase del componente
        //CUIDADO!!: los componentes React que queramos referenciar con JSX deben comenzar por mayúsculas -->
        class MiComponente extends React.Component {
            render() {
                return <div>
                    <h1>Otro componente más</h1>
                    <p> {this.props.saludo} soy otro componente React más, pero ahora uso JSX </p>
                </div>
            }
        }
        //mostramos el componente
        ReactDOM.render(
            //creamos la instancia del componente al estilo HTML.
            // Los atributos de "props" se pasan como atributos HTML
            <MiComponente saludo="¿Qué tal?,"/>,
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 05
        //Definimos la clase del componente
        class MiComponente extends React.Component {
            render() {
                var elementos = []
                for(var i=0; i<this.props.nombres.length; i++) {
                    elementos.push(<li key={i}>{this.props.nombres[i]}</li>)
                }
                return <ul> {elementos} </ul>
            }
        }
        //mostramos el componente
        ReactDOM.render(
            <MiComponente nombres={['Cersei Lannister', 'Eddard Stark', 'Jon Nieve']}/>,
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 06
        //Definimos la clase del componente
        class MiComponente extends React.Component {
            render() {
                var elementos = this.props.nombres.map(function (item, indice) {
                    return <li key={indice}>{item}</li>
                })
                return <ul> {elementos} </ul>
            }
        }
        //mostramos el componente
        ReactDOM.render(
            <MiComponente nombres={['Cersei Lannister', 'Eddard Stark', 'Jon Nieve']}/>,
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 06b
        class Crono extends React.Component {
            render() {
              return <div>
                <h1>Hola</h1>
                <h2>Son las {new Date().toLocaleTimeString()}.</h2>
              </div>
            }
          }
        
          function tick() {
            ReactDOM.render(
              <Crono/>,
              document.getElementById('componente')
            );
          }
          
          setInterval(tick, 1000);
*/
/*
        //Ejemplo 07
        //Definimos la clase del componente
        class MiBoton extends React.Component {
            constructor(props) {
                super(props)
                this.state = {veces:0}
            }
            pulsado() {
                this.setState({veces: this.state.veces+1})
            }
            render() {
                return <div>
                        <input type="button" value={this.props.mensaje} onClick={this.pulsado.bind(this)}/>
                        <div>Veces pulsado: {this.state.veces}</div>
                    </div>
            }
        }
        //mostramos el componente
        ReactDOM.render(
            <MiBoton mensaje="¡Púlsame!"/>,
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 08
        //Definimos la clase del componente
        class Lista extends React.Component {
            constructor(props) {
                super(props)  
                var ok = new Array(this.props.nombres.length)
                ok.fill(true)
                this.state = {vivos: ok}
            }
            pulsado(e) {
                var vivosNew = this.state.vivos.slice()
                var indice = parseInt(e.target.getAttribute('data-mi-id'))
                vivosNew[indice] = !vivosNew[indice]
                this.setState({vivos: vivosNew})
            }
            render() {
                var elementos = [];
                for(var i=0; i<this.props.nombres.length; i++) {
                    if (this.state.vivos[i])
                        elementos.push(<li key={i} onClick={this.pulsado.bind(this)} data-mi-id={i}>{this.props.nombres[i]}</li>)
                    else
                        elementos.push(<li key={i} onClick={this.pulsado.bind(this)} data-mi-id={i} className="tachado">{this.props.nombres[i]}</li>)
                }
                return <ul> {elementos} </ul>
            }
        }
        //mostramos el componente
        window.componente = ReactDOM.render(
            <Lista nombres={['Cersei Lannister', 'Eddard Stark', 'Jon Nieve']}/>,
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 09
        //Definimos la clase del componente
        class Item extends React.Component {
            render() {
                return <li>{this.props.nombre}</li>
            }
        }
        class Lista extends React.Component {
            render() {
                var elementos = this.props.nombres.map(function(dato, indice){
                    return <Item id={indice} key={indice} nombre={dato}/>
                })
                return <ul> {elementos} </ul>
            }
        }
        //mostramos el componente
        ReactDOM.render(
            <Lista nombres={['Cersei Lannister', 'Eddard Stark', 'Jon Nieve']}/>,
            document.getElementById('componente')
        )
*/
/*
        //Ejemplo 10
        //Definimos la clase del componente
        class Item extends React.Component {
            pulsado = () => this.props.handleClick(this.props.id)
            render() {
                if (this.props.vivo)
                    return <li onClick={this.pulsado}>{this.props.nombre}</li>
                else
                    return <li onClick={this.pulsado} className="tachado">{this.props.nombre}</li>
            }
        }
        class Lista extends React.Component {
            constructor(props) {
                super(props)  
                var vivos = new Array(this.props.nombres.length)
                vivos.fill(true)
                this.state = {vivos: vivos}
            }
            toggle = (id) => {
                var vivos = this.state.vivos
                vivos[id] = !vivos[id]
                this.setState({vivos: vivos})
            }
            render() {
                var elementos = []
                for(var i=0; i<this.props.nombres.length;i++) {
                    elementos.push(<Item id={i}
                                        key={i}
                                        nombre={this.props.nombres[i]}
                                        vivo={this.state.vivos[i]}
                                        handleClick={this.toggle}/>)
                }
                return  <div>
                        <h2>Pulsa sobre un item para cambiar estado</h2>
                        <ul> {elementos} </ul>
                        </div>
            }
        }
        //mostramos el componente
        ReactDOM.render(
                <Lista nombres={['Cersei Lannister', 'Eddard Stark', 'Jon Nieve']}/>,
                document.getElementById('componente')
        )
*/
/*
        //Ejemplo 11
        //Ejemplo de lo que en React llaman "componentes controlados".
        // Se usa con campos de texto,select y similares
        //La idea es que vinculamos manualmente estado y contenido del campo, en las dos direcciones
        class MiComponente extends React.Component {
            constructor(props) {
                super(props)
                this.state = {texto:''}
            }
            handleClick = () => alert("estado texto: " + this.state.texto)
            handleChange = (evento) => {
                //con esto actualizamos el estado cuando cambia el texto de la vista (vista->estado)
                this.setState({texto:evento.target.value})
            }
            render() {
                // con "value=" vinculamos estado->vista
                return <div>
                    <input type="text" placeholder="Escribe algo..." value={this.state.texto} onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>Ver valor</button>
                </div>
            }
        }
        ReactDOM.render(<MiComponente/>, document.getElementById('componente'))
*/
/*
        //Ejemplo 12
        //Definimos la clase del componente
        class Item extends React.Component {
            pulsado = () => this.props.handleClick(this.props.id)
            render() {
                if (this.props.vivo)
                    return <li onClick={this.pulsado}>{this.props.nombre}</li>
                else
                    return <li onClick={this.pulsado} className="tachado">{this.props.nombre}</li>
            }
        }
        class BarraBusqueda extends React.Component {
        handleChange = (evento) => this.props.change(evento.target.value)

        render() {
            return <input type="search"
                            placeholder="texto a buscar..."
                            value={this.props.texto}
                            onChange={this.handleChange} />
        }
        }
        class Lista extends React.Component {
            constructor(props) {
                super(props)
                var vivos = new Array(this.props.nombres.length)
                vivos.fill(true)
                this.state = {vivos: vivos, textoFiltro:''}
            }
            toggle = (id) => {
            var vivos = this.state.vivos
            vivos[id] = !vivos[id]
            this.setState({vivos: vivos})
            }
            changeText = (texto) => {
                this.setState({textoFiltro: texto})
            }
            render() {
                var elementos = []
                for(var i=0; i<this.props.nombres.length;i++) {
                    if (this.props.nombres[i].indexOf(this.state.textoFiltro)>-1) {
                        elementos.push(<Item id={i}
                                            key={i}
                                            nombre={this.props.nombres[i]}
                                            vivo={this.state.vivos[i]}
                                            handleClick={this.toggle}/>)
                    }
                }
                return <div>
                        <BarraBusqueda texto={this.state.textoFiltro} change={this.changeText}/>
                        <ul> {elementos} </ul>
                    </div>
            }
        }
        //mostramos el componente
        ReactDOM.render(
                <Lista nombres={['Cersei Lannister', 'Eddard Stark', 'Jon Nieve']}/>,
                document.getElementById('componente')
        )
*/
/*
        //Ejemplo 13
        class GithubAPI {
            getUser(nombre) {
                return fetch('https://api.github.com/users/'+nombre)
                  .then(function(respuesta){
                      return respuesta.json()
                  })
            }
        }
        class GithubProfile extends React.Component {
           constructor(props) {
               super(props)
               this.state = {}
           }
           //Este método se llama cuando el componente se ha insertado en la página
           componentDidMount() {
               var api = new GithubAPI()
               api.getUser(this.props.login)
                 //La "Fat arrow" es importante aquí porque
                 //conseguimos que "this" sea el objeto actual.
                 //Las funciones de este tipo tienen "vinculación léxica"
                 //y no usan this "dinámico"
                 .then(datos =>
                     this.setState({usuario: datos})
                 )
           }
           render() {
               if (!this.state.usuario) {
                   return <div>No hay datos que mostrar</div>
               }
               else {
                   return <div>
                     <h1>{this.state.usuario.name}</h1>
                     <img src={this.state.usuario.avatar_url}/>
                   </div>
               }
           }
        }
        ReactDOM.render(
            <GithubProfile login="quico14"/>,
            document.getElementById("componente")
        )
*/
/*
        //Ejemplo 14
        //nos permite emitir y recibir eventos arbitrarios
      //(definidos por nosotros)
      var ee = new EventEmitter()
      class NuevoItem extends React.Component {
         constructor(props) {
           super(props)
           this.state = {item:""}
           this.changeItem = this.changeItem.bind(this)
           this.insertarItem = this.insertarItem.bind(this)
         } 
         changeItem(evento) {
           this.setState({item:evento.target.value})
         } 
         insertarItem() {
           //emitimos un evento con nombre arbitrario
           //los parámetros que recibirán los listener se ponen en un array, por si hay varios  
           ee.emitEvent('nuevoItem',[this.state.item])  
         }
         render() {
            return <div>
              <h1>Nuevo item</h1>
              <input type="text" value={this.state.item} onChange={this.changeItem}/>
              <button onClick={this.insertarItem}>Insertar</button>
            </div>
         } 
      }
      class ListaCompra extends React.Component {
        constructor(props) {
          super(props)
          this.state = {items: props.items}  
        }  
        componentDidMount() {
            //queremos recibir el evento "nuevoItem"
            ee.addListener('nuevoItem', (nombre)=>{
                var items_old = this.state.items
                items_old.push(nombre)
                this.setState({items: items_old})
            })
        }
        render() {
            var elementos = this.state.items.map((dato,id) => <li key={id}>{dato}</li>)
            return <div> 
              <h1>Lista de la compra</h1> 
              <ul>{elementos}</ul>
            </div>  
        }
      }
      var datos = ["Tomates", "Pan", "Nocilla", "Manzanas"]
      ReactDOM.render(
          <ListaCompra items={datos}/>,
          document.getElementById("lista")
      )
      ReactDOM.render(
          <NuevoItem/>,
          document.getElementById("formulario")
      )
*/