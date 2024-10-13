import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import './assets/css/Admin.css'
import BotaoDeletar from './components/BotaoDeletar'
import BotaoEditar from './components/BotaoEditar'
import ConfirmaDeletarModal from './components/ConfirmaDeletarModal'
import EditModal from './components/EditModal'
import UsuarioService from './services/UsuarioService'

function Admin() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEdit, setUsuarioEdit] = useState(null);
    const [usuarioDelete, setUsuarioDelete] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleEdit = (usuario) => {
        setUsuarioEdit(usuario);
        fetchUsuarios();
    }

    const handleDelete = (usuario) => {
        setUsuarioDelete(usuario);
    }

    const handleDeleteConfirm = async () => {
        try {
            if (usuarioDelete) {
                await UsuarioService.deletarUsuario(usuarioDelete.id);
                toastr.success(`Sucesso ao deletar usuário com ID '${usuarioDelete.id}'`);
                setUsuarios(usuarios.filter((u) => u.id !== usuarioDelete.id));
            } else {
                toastr.warning(`Erro ao tentar deletar usuário.`);
            }
        } catch (error) {
            toastr.error(`Erro ao deletar usuário com ID '${usuarioDelete.id}': ${error.message}`);
        }
        setUsuarioDelete(null);
    }

    const fetchUsuarios = async () => {
        try {
            const response = await UsuarioService.buscarUsuarios();
            if (response.data.result) {
                setUsuarios(response.data.result);
                toastr.success(`Sucesso ao carregar usuários.`)
            } else {
                toastr.warning(`Nenhum usuário encontrado.`)
            }
        } catch (error) {
            toastr.error(`Erro ao carregar usuários.`);
        }
    }

    return (
        <div className='Admin'>
            <h1>Usuários</h1>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <BotaoEditar onEdit={() => handleEdit(usuario)} />
                                <BotaoDeletar onDelete={() => handleDelete(usuario)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {usuarioEdit && (
                <EditModal
                    usuario={usuarioEdit}
                    onSave={(usuarioEditado) => {
                        setUsuarios(
                            usuarios.map((u) => u.id === usuarioEditado.id ? usuarioEditado : u)
                        );
                    }}
                    onClose={() => setUsuarioEdit(null)}
                />
            )}
            {usuarioDelete && (
                <ConfirmaDeletarModal
                    usuario={usuarioDelete}
                    onConfirm={handleDeleteConfirm}
                    onClose={() => setUsuarioDelete(null)}
                />
            )}
        </div>
    )
}

export default Admin;