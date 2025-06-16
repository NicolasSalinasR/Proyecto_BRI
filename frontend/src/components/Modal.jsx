import '../assets/css/Modal.css'

function Modal({ title, content, onClose, position = 'center' }) {
    const positionClass =
        position === 'left' ? 'modal-left' :
            position === 'right' ? 'modal-right' :
                'modal-center'; // default

    return (

        <div className={`modal-overlay`}>
            <div className={`modal-container ${positionClass}`} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-filter">
                    <input type="text" placeholder="Buscar ingredientes..." disabled />
                </div>

                <div className="modal-content">
                    <ul className="checkbox-list">
                        {content.map((item, index) => (
                            <li key={index}>
                                <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>{item}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>




    );
}

export default Modal;
