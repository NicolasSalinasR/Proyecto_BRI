import '../assets/css/Plate.css';
import plateImage from '../assets/food_plate.png';
import Modal from './Modal';
import { useState } from "react";

function Plate() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', content: [] });
    const [activeSector, setActiveSector] = useState(null);

    const handleSectorClick = (title, content, position, sectorKey) => {
        setModalOpen(false);
        setTimeout(() => {
            setModalData({ title, content, position });
            setActiveSector(sectorKey);
            setModalOpen(true);
        }, 100);
    };

    const up_left = [
        "Arroz integral", "Arroz blanco", "Avena", "Cebada", "Trigo sarraceno",
        "Mijo", "Quinoa", "Amaranto", "Centeno", "Trigo duro", "Pan integral",
        "Pan de centeno", "Pan de avena", "Pasta de trigo integral", "Pasta de sémola",
        "Fideos de arroz", "Tortillas de maíz", "Tortillas de trigo", "Cuscús",
        "Bulgur", "Harina de trigo", "Harina de maíz", "Harina de avena",
        "Galletas integrales", "Cereal de desayuno"
    ];

    const up_right = ['Manzana', 'Zanahoria', 'Espinaca'];
    const down_left = ['Pollo', 'Tofu', 'Frijoles'];
    const down_right = ['Leche', 'Yogur', 'Queso'];

    return (
        <div className="svg-plate-container">
            <svg viewBox="0 0 400 400" className="svg-plate">
                <defs>
                    <clipPath id="circleClip">
                        <circle cx="200" cy="200" r="200" />
                    </clipPath>
                    <pattern id="plateImage" patternUnits="userSpaceOnUse" width="400" height="400">
                        <image href={plateImage} x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
                    </pattern>
                </defs>

                <circle cx="200" cy="200" r="200" fill="url(#plateImage)" clipPath="url(#circleClip)" />

                <g clipPath="url(#circleClip)">
                    <rect
                        x="0"
                        y="0"
                        width="200"
                        height="200"
                        className={`sector-overlay ${activeSector === 'up_left' ? 'active' : ''}`}
                        onClick={() => handleSectorClick('Granos y derivados', up_left, 'left', 'up_left')}
                    />
                    <rect
                        x="200"
                        y="0"
                        width="200"
                        height="200"
                        className={`sector-overlay ${activeSector === 'up_right' ? 'active' : ''}`}
                        onClick={() => handleSectorClick('Frutas y Verduras', up_right, 'right', 'up_right')}
                    />
                    <rect
                        x="0"
                        y="200"
                        width="200"
                        height="200"
                        className={`sector-overlay ${activeSector === 'down_left' ? 'active' : ''}`}
                        onClick={() => handleSectorClick('Proteínas', down_left, 'left', 'down_left')}
                    />
                    <rect
                        x="200"
                        y="200"
                        width="200"
                        height="200"
                        className={`sector-overlay ${activeSector === 'down_right' ? 'active' : ''}`}
                        onClick={() => handleSectorClick('Lácteos y otros', down_right, 'right', 'down_right')}
                    />
                </g>
            </svg>

            {modalOpen && (
                <Modal
                    title={modalData.title}
                    content={modalData.content}
                    position={modalData.position}
                    onClose={() => {
                        setModalOpen(false);
                        setActiveSector(null);
                    }}
                />
            )}
        </div>
    );
}

export default Plate;
