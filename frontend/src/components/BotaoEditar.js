import React from 'react';

function BotaoEditar({ onEdit }) {
    return (
        <button type="button" id="editar" className='btn btn-warning' onClick={onEdit}>Editar</button>
    )
}

export default BotaoEditar;