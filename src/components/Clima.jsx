import PropTypes from 'prop-types';

const Clima = ({resultado}) => {
    
    /* Extrar Valores De La Respuesta De La API */
    const {name, main} = resultado;

    /* Para Que No Se Renderice El JSX Si No Tiene Data */
    if (!name) return null;

    /* Formula De Grados Kelvin A Grados Centigrados */
    const temperatura = parseFloat(main.temp - 273.15, 10).toFixed(2);
    const temperaturaMax = parseFloat(main.temp_max - 273.15, 10).toFixed(2);
    const temperaturaMin = parseFloat(main.temp_min - 273.15, 10).toFixed(2);
    
    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El Clima De {name} es: </h2>
                <p className="temperatura">
                    {temperatura} <span>&#x2103;</span>
                </p>

                <p> Temperatura Máxima:
                    {temperaturaMax} <span>&#x2103;</span>
                </p>
                
                <p> Temperatura Minima:
                    {temperaturaMin} <span>&#x2103;</span>
                </p>
            </div>
        </div>
     );
}

Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}
 
export default Clima;