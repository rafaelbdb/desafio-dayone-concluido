import React from 'react'
import BotaoCancelar from './BotaoCancelar'
import BotaoLimpar from './BotaoLimpar'
import BotaoSalvar from './BotaoSalvar'

function BotoesForm({ onSave, onClose, onClear }) {
    return (
        <div id="botoes_form">
            <BotaoSalvar onSave={onSave} />
            <BotaoLimpar onClear={onClear} />
            {onClose && <BotaoCancelar onClose={onClose} />}
        </div>
    )
}

export default BotoesForm;