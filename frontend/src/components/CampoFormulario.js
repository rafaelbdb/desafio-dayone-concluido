import React from 'react';

function CampoFormulario({ id, label, type, value, onChange }) {
    return (
        <div className='row align-items-center mb-3'>
            <label htmlFor={id} className='col-sm-2 col-form-label'>{label}</label>
            <div className='col-sm-10'>
                <input type={type} id={id} name={id} className='form-control' value={value} onChange={onChange} required />
            </div>
        </div>
    )
}

export default CampoFormulario;