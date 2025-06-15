import '../assets/css/Plate.css'
import plateImage from '../assets/food_plate.png'
import Modal from './Modal';
import {useState} from "react";

function Plate() {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', content: [] });

    const handleSectorClick = (title, content, position) => {
        setModalOpen(false); // Cierra el modal actual
        setTimeout(() => {
            setModalData({ title, content, position });
            setModalOpen(true);
        }, 100); // Pequeño retardo para permitir el cierre visual
    };


    /* vectores con información de los modales */
    /* Modal del cuadrante superior izquierdo */
    const up_left = ['Arroz', 'Pan integral', 'Pasta'];

    /* Modal del cuadrante superior derecho*/
    const up_right = ['Manzana', 'Zanahoria', 'Espinaca'];

    /* Modal del cuadrante inferior izquierdo */
    const down_left = ['Pollo', 'Tofu', 'Frijoles'];

    /* Modal del cuadrante inferior derecho*/
    const down_right = ['Leche', 'Yogur', 'Queso'];


    return <div className="svg-plate-container">
        <svg viewBox="0 0 400 400" className="svg-plate">
            <defs>
                <clipPath id="circleClip">
                    <circle cx="200" cy="200" r="200" />
                </clipPath>
                <pattern id="plateImage" patternUnits="userSpaceOnUse" width="400" height="400">
                    <image href={plateImage} x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
                </pattern>
            </defs>

            {/* Imagen de fondo */}
            <circle cx="200" cy="200" r="200" fill="url(#plateImage)" clipPath="url(#circleClip)" />

            {/* Sectores rectangulares encima de la imagen */}
            <g clipPath="url(#circleClip)">
                {/* Cuadrante superior izquierdo */}
                <rect
                    x="0"
                    y="0"
                    width="200"
                    height="200"
                    className="sector-overlay"
                    onClick={() => handleSectorClick('Granos', up_left, 'left')}
                />

                {/* Cuadrante superior derecho */}
                <rect
                    x="200"
                    y="0"
                    width="200"
                    height="200"
                    className="sector-overlay"
                    onClick={() => handleSectorClick('Frutas y Verduras', up_right, 'right')}
                />

                {/* Cuadrante inferior izquierdo */}
                <rect
                    x="0"
                    y="200"
                    width="200"
                    height="200"
                    className="sector-overlay"
                    onClick={() => handleSectorClick('Proteínas', down_left, 'left')}
                />

                {/* Cuadrante inferior derecho */}
                <rect
                    x="200"
                    y="200"
                    width="200"
                    height="200"
                    className="sector-overlay"
                    onClick={() => handleSectorClick('Lácteos', down_right, 'right')}
                />
            </g>
        </svg>

        {modalOpen && (
            <Modal
                title={modalData.title}
                content={modalData.content}
                position={modalData.position}
                onClose={() => setModalOpen(false)}
            />

        )}
    </div>
}

export default Plate;