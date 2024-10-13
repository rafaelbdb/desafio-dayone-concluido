import React from 'react';

function BotaoSalvar({ onSave }) {
    return (
        <button type="submit" id="salvar" className='btn btn-success' onClick={onSave}>SALVAR</button>
    )
}

export default BotaoSalvar;