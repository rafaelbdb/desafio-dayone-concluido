import React, {useEffect, useState} from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import UsuarioService from '../services/UsuarioService'
import FormUsuario from './FormUsuario'

function EditModal({ usuario, onSave, onClose }) {
    const [formData, setFormData] = useState(usuario);
    const [isVisible, setIsVisible] = useState(true);
    const defaultState = {
        nome: '',
        email: '',
        senha: ''
    }

    useEffect(() => {
        setFormData(usuario);
    }, [usuario]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    }

    const handleReset = () => {
        setFormData(defaultState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData) {
                await UsuarioService.editarUsuario(formData);
                onSave(formData);
                toastr.success(`Succeso ao editar usuário com id '${usuario.id}'`);
                handleClose();
            } else {
                toastr.warning(`Erro ao tentar editar usuário.`);
            }
        } catch (error) {
            toastr.error(`Erro ao editar usuário com id '${usuario.id}': ${error.message}`);
        }
    }
    return (
        <div className={`modal-overlay ${isVisible ? 'fade-in' : 'fade-out'}`} onClick={handleClose}>
        <div className={`modal`} onClick={(e) => {e.stopPropagation()}}>
                <div className={`modal-content`}>
                    <FormUsuario
                        title='Editar Usuário'
                        type='editar'
                        formData={formData}
                        setFormData={setFormData}
                        onSave={handleSubmit}
                        onClose={onClose}
                        onClear={handleReset}
                    />
                </div>
        </div>
        </div>
    )
}

export default EditModal;