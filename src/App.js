import { Fragment, useEffect, useState } from "react";

import Clima from './components/Clima';
import Header from './components/Header';
import Error from './components/Error';
import Formulario from './components/Formulario';

function App() {
  /* State Principal */
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarerror] = useState(false);
  
  const {ciudad, pais} = busqueda;
  
  useEffect(() => {
    const consultarAPI = async() => {

      if (consultar) {
        const appId = '0cc4b4d3d810784b46df924421221330';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        /* Detecta Si Hubo Resultados Correctos En La Consulta */
        if (resultado.cod === "404") {
          guardarerror(true);
        } else {
          guardarerror(false);
        }
      }

    }

    consultarAPI();
  }, [consultar, ciudad, pais]);

  /* Carga Condicional De Un Componente */
  let componente;

  if (error) {
    componente = <Error mensaje={"No Hay Resultados"} />
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header titulo='Clima React App' />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">

            <div className="col m6 s12">
              <Formulario busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar}/>
            </div>

            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
