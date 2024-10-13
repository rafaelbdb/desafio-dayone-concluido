import React from 'react';

function BotaoLimpar({ onClear }) {
    return (
        <button type="reset" id="limpar" className='btn btn-warning' onClick={onClear}>Limpar</button>
    )
}

export default BotaoLimpar;