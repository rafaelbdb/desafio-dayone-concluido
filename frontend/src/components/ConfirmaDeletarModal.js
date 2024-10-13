import React, { useState } from 'react';

function ConfirmaDeletarModal({ usuario, onConfirm, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    }
    return (
        <div className={`modal-overlay ${isVisible ? 'fade-in' : 'fade-out'}`} onClick={handleClose}>
            <div className={`modal modal_delete`} onClick={(e) => e.stopPropagation()}>
                <div className={`modal-content`}>
                    <form className='form'>
                        <h2>Confirmar Exclusão</h2>
                        <p>Tem certeza que deseja excluir o usuário '{usuario.nome}'?</p>
                        <div className='form-group'>
                            <button type='button' className='btn btn-primary' onClick={onConfirm}>Confirmar</button>
                            <button type='button' className='btn btn-danger' onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmaDeletarModal;