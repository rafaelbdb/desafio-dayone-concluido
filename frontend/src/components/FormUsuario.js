import React from 'react';
import BotoesForm from './BotoesForm';
import CampoFormulario from './CampoFormulario';

function FormUsuario({ title, type = 'criar', formData = { nome: '', email: '', senha: '' }, setFormData, onSave, onClose, onClear }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const campos = ['nome', 'email', 'senha'].map((id) => ({
        id,
        label: `${id.charAt(0).toUpperCase() + id.slice(1)}: `,
        type: id === 'email' ? 'email' : id === 'senha' ? 'password' : 'text',
        value: formData[id],
        onChange: handleChange
    }));

    return (
        <form id='form_usuario' className={(type === 'criar') ? 'form_usuario' : ''}>
            <h1 id='title'>{title}</h1>
            {campos.map(
                (campo) => {
                    return (
                        <CampoFormulario
                            key={campo.id}
                            id={campo.id}
                            label={campo.label}
                            type={campo.type}
                            value={campo.value}
                            onChange={campo.onChange}
                        />
                    )
                }
            )}
            <BotoesForm
                onSave={onSave}
                onClose={onClose}
                onClear={onClear}
            />
        </form>
    )
}

export default FormUsuario;