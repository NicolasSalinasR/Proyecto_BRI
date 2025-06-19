import React, { useState } from 'react';
import '../assets/css/Filter2.css';

const tiposDePlato = ['Plato de fondo', 'Postre', 'Entrada', 'Cena', 'Principal'];
const tiposDeDieta = ['Vegano', 'Sin gluten', 'Keto', 'Sin dieta'];
const tiposDeCocina = ['Asiático', 'Norteamericano', 'Nacional', 'México'];


/*
* Componente que aplica las muestras por tipo de cocina, tipo de plato y tipo de dieta, por ahora solo esta el estilo
* */
const Filter2 = () => {

    /* Para controlar la opción de filtro elegido*/
    const [plato, setPlato] = useState('');
    const [dieta, setDieta] = useState('');
    const [cocina, setCocina] = useState('');

    /* Luego de presionar FILTRAR*/
    const handleFiltrar = () => {
        console.log('Filtros seleccionados:', { plato, dieta, cocina });
        // Aquí puedes llamar a una función para filtrar recetas, hacer fetch, etc.

    };

    return (
        <div className="filter-container">
            <select value={plato} onChange={(e) => setPlato(e.target.value)}>
                <option value="">TIPO DE PLATO</option>
                {tiposDePlato.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                ))}
            </select>

            <select value={dieta} onChange={(e) => setDieta(e.target.value)}>
                <option value="">TIPO DE DIETA</option>
                {tiposDeDieta.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                ))}
            </select>

            <select value={cocina} onChange={(e) => setCocina(e.target.value)}>
                <option value="">TIPO DE COCINA</option>
                {tiposDeCocina.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                ))}
            </select>

            <button className="filter-button" onClick={handleFiltrar}>FILTRAR</button>
        </div>
    );
};

export default Filter2;
