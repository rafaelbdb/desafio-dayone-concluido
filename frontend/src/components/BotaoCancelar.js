import React from 'react';

function BotaoCancelar({ onClose }) {
    return (
        <button type="button" id="cancelar" className='btn btn-secondary' onClick={onClose}>Cancelar</button>
    )
}

export default BotaoCancelar;