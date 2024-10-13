import React from 'react';

function BotaoDeletar({ onDelete }) {
    return (
        <button type="button" id="deletar" className='btn btn-danger' onClick={onDelete}>Apagar</button>
    )
}

export default BotaoDeletar;