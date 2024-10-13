<?php
header("Access-Control-Allow-Origin: *");  // Permite todas as origens. Substitua o "*" pela origem específica, se necessário.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  // Métodos HTTP permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Cabeçalhos permitidos
header("Access-Control-Allow-Credentials: true");  // Se precisar enviar cookies ou autenticação com credenciais

require_once(__DIR__ . "/../config/db.php");
final class Usuario
{
    private $conn, $agora;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->getConnection();
        $this->agora = date('Y-m-d H:i:s');
    }

    public function criar($nome, $email, $senha)
    {
        if ($this->buscarPorEmail($email)['result']) {
            return ['status' => 0, 'msg' => "Já existe um usuário cadastrado com email '{$email}'!"];
        }

        $sql = "INSERT INTO usuarios
                    (
                        nome
                        , email
                        , senha
                        , created_by
                        , created_at
                    ) VALUES (
                        :nome
                        , :email
                        , :senha
                        , :created_by
                        , :created_at
                    )
                ";
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
        $created_by = 'quem_criou';

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':created_by', $created_by);
        $stmt->bindParam(':created_at', $this->agora);

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso ao criar usuário com nome '{$nome}' e email '{$email}'.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro ao criar usuário com nome '{$nome}' e email '{$email}'.\n\n{$e->getMessage()}"];
        }
    }

    public function buscar($id = null)
    {
        $sql = "SELECT * 
                FROM usuarios
                WHERE deleted_by IS NULL
                AND deleted_at IS NULL
                ";
        $sql .= $id ? "AND id = :id" : "";

        $stmt = $this->conn->prepare($sql);
        if ($id) {
            $stmt->bindParam(':id', $id);
        }

        try {
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $msg = $resultado ? "Sucesso ao buscar usuário(s)." : "Nenhum usuário encontrado.";
            return ['status' => 1, 'msg' => $msg, 'result' => $resultado];
        } catch (PDOException $e) {
            $msg = $id ? "Erro ao buscar usuário com id '{$id}'!\n\n{$e->getMessage()}" : "Erro ao buscar usuários!";
            return ['status' => 0, 'msg' => $msg];
        }
    }

    public function buscarPorEmail($email)
    {
        $sql = "SELECT * 
                FROM usuarios
                WHERE deleted_by IS NULL
                AND deleted_at IS NULL
                AND email = :email
                ";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':email', $email);

        try {
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $msg = $resultado ? "Sucesso ao buscar usuário com email '{$email}'." : "Nenhum usuário com email '{$email}' encontrado.";
            return ['status' => 1, 'msg' => $msg, 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro ao buscar usuário com email '{$email}'!\n\n{$e->getMessage()}"];
        }
    }

    public function editar($id, $nome, $email, $senha)
    {
        if (!$id) {
            return ['status' => 0, 'msg' => 'Erro ao editar usuário: ID precisa ser informado!'];
        }

        if (!$this->buscar($id)) {
            return ['status' => 0, 'msg' => "Nenhum usuário com ID {$id} encontrado."];
        }

        $sql = "UPDATE usuarios
                SET 
                    nome = :nome
                    ,email = :email
                    ,senha = :senha
                    ,updated_by = :updated_by
                    ,updated_at = :updated_at
                WHERE id = :id
                ";

        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
        $updated_by = 'quem_alterou';

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':updated_by', $updated_by);
        $stmt->bindParam(':update_at', $this->agora);

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso ao editar usuário com ID {$id}.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro ao editar usuário com ID {$id}!\n\n{$e->getMessage()}"];
        }
    }

    public function deletar($id)
    {
        if (!$id) {
            return ['status' => 0, 'msg' => 'Erro ao deletar usuário: ID precisa ser informado!'];
        }

        if(!$this->buscar($id)){
            return ['status' => 0, 'msg' => "Nenhum usuário com ID {$id} encontrado."];
        }

        $sql = "UPDATE usuarios
                SET 
                    deleted_by = :deleted_by
                    ,deleted_at = :deleted_at
                WHERE id = :id
                ";
        $deleted_by = 'quem_deletou';

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':deleted_by', $deleted_by);
        $stmt->bindParam(':deleted_at', $this->agora);
        $stmt->bindParam(':id', $id);

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso ao deletar usuário com ID {$id}.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro ao deletar usuário com ID {$id}!\n\n{$e->getMessage()}"];
        }
    }

    public function remover($id)
    {
        if (!$id) {
            return ['status' => 0, 'msg' => "Erro ao remover usuário: ID precisa ser informado!"];
        }

        $sql = "DELETE FROM usuarios WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        try {
            $resultado = $stmt->execute();
            return ['status' => 1, 'msg' => "Sucesso ao remover usuário com id {$id}.", 'result' => $resultado];
        } catch (PDOException $e) {
            return ['status' => 0, 'msg' => "Erro ao remover usuário com id {$id}!\n\n{$e->getMessage()}"];
        }
    }
}

$usuario = new Usuario();

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'msg' => ''];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $response = $usuario->buscar($_GET['id'] ?? null);
        break;
    case 'POST':
        $response['msg'] = 'Dados insuficientes para criar o usuário!';
        if ($data['nome'] && $data['email'] && $data['senha']) {
            $response = $usuario->criar($data['nome'], $data['email'], $data['senha']);
        }
        break;
    case 'PUT':
        $response['msg'] = 'Dados insuficientes para editar o usuário!';
        $response = ($data['deletar']) ? $usuario->deletar($data['id']) : $usuario->editar($data['id'], $data['nome'], $data['email'], $data['senha']);
        break;
    case 'DELETE':
        $response = $usuario->remover($data['id']);
        break;

    default:
        $response['msg'] = 'Método não suportado.';
        break;
}

echo json_encode($response);
