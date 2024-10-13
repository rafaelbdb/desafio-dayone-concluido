import React, { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './assets/css/App.css';
import FormUsuario from './components/FormUsuario';
import UsuarioService from './services/UsuarioService';

function App() {
    const defaultState = {
        nome: '',
        email: '',
        senha: ''
    }

    const [formData, setFormData] = useState(defaultState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.nome && formData.email && formData.senha) {
                await UsuarioService.criarUsuario(formData);
                toastr.success(`Sucesso ao criar usuário com nome '${formData.nome}' e email '${formData.email}'`);
                handleReset();
            } else {
                toastr.warning(`É obrigatório preencher todos os campos.`);
            }
        } catch (error) {
            toastr.error(`Erro ao criar usuário com nome '${formData.nome}': ${error.message}`);
        }
    }

    const handleReset = () => {
        setFormData(defaultState);
    }
    return (
        <div className="App">
            <FormUsuario
                title="Criar Usuário"
                formData={formData}
                setFormData={setFormData}
                onSave={handleSubmit}
                onClear={handleReset}
            />
        </div>
    );
}

export default App;
