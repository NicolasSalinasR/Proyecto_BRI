function Modal({ title, content, onClose, position = 'center' }) {
    const positionClass =
        position === 'left' ? 'modal-left' :
            position === 'right' ? 'modal-right' :
                'modal-center'; // default

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className={`modal-dialog modal-lg ${positionClass}`} role="document">
            <div className="modal-content">
                    <div className="modal-header position-relative">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {content && content.length > 0 ? (
                            <div className="d-flex flex-column gap-2">
                                {content.map((item, index) => (
                                    <div className="form-check d-flex align-items-center" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`check-${index}`}
                                            style={{ transform: 'scale(1.2)' }}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={`check-${index}`}>
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No hay contenido disponible.</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
