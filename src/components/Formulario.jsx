import { useState } from "react";
import PropTypes from 'prop-types';

import Error from './Error';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
    /* State Del Formulario */
    const [error, guardarError] = useState(false);

    const {ciudad, pais} = busqueda;

    /* Funcion Que Coloca Los Elementos En El State */
    const handleChange = e => {

        /* Actualizar El State */
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        /* Validar */
        if(ciudad.trim() === '' || pais.trim() === '') {
            guardarError(true);
            return;
        }
        
        guardarError(false);

        /* Pasarlo Al Componente Principal */
        guardarConsultar(true);
    }

    return ( 
        <form onSubmit={handleSubmit}>

            {error ? <Error mensaje="Ambos Campos Son Obligatorios"/> : null}

            <div className="input-field col s12">
                <input type="text" name="ciudad" id="ciudad" value={ciudad} onChange={handleChange}/>
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select name="pais" id="pais" value={pais} onChange={handleChange}>
                    <option value="">-- Seleccione Un Pais --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>

            <div className="input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar Clima"/>
            </div>
        </form>
     );
}
 
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;