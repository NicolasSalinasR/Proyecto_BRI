import React, {useEffect, useState} from 'react';
import '../assets/css/Filter2.css';

const Filter2 = ({ onFilter, opcionesPlato = [], opcionesDieta = [], opcionesCocina = [] }) => {

    /*Obtienen las opciones de filtro de las recetas de forma dinamica*/
    const [plato, setPlato] = useState('');
    const [dieta, setDieta] = useState('');
    const [cocina, setCocina] = useState('');

    /* Esto es si se mantiene el botón de filtrar
    const handleFiltrar = () => {
        const filtros = { plato, dieta, cocina };
        onFilter(filtros);
    };
    */

    // Aplica los filtros cada vez que cambie uno de los select
    useEffect(() => {
        onFilter({ plato, dieta, cocina });
    }, [plato, dieta, cocina]);

    return (
        <div className="filter-container">
            <select value={plato} onChange={(e) => setPlato(e.target.value)}>
                <option value="">TIPO DE PLATO</option>
                {opcionesPlato.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                ))}
            </select>

            <select value={dieta} onChange={(e) => setDieta(e.target.value)}>
                <option value="">TIPO DE DIETA</option>
                {opcionesDieta.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                ))}
            </select>

            <select value={cocina} onChange={(e) => setCocina(e.target.value)}>
                <option value="">TIPO DE COCINA</option>
                {opcionesCocina.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                ))}
            </select>

            {/*<button className="filter-button" onClick={handleFiltrar}>FILTRAR</button>*/}
        </div>
    );
};


export default Filter2;
