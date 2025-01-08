# Personal Management API

## Descrição
Personal Management API é um sistema para gerenciar planos de treino, exercícios e usuários (alunos e administradores). Ele foi desenvolvido utilizando a clean architecture e DDD (Domain-Driven Design) e utiliza tecnologias modernas como Node.js, Nest e Prisma.

---

## Funcionalidades Principais

### **Gerenciamento de Usuários**
- **Criação de Usuários:**
  - Endpoint para cadastrar alunos e administradores.
  - Garantia de que os dados obrigatórios sejam preenchidos.
- **Autenticação:**
  - Login de usuários (alunos e administradores).
  - Geração de tokens para autenticação em outros endpoints.
- **Autorização:**
  - Controle de permissões, garantindo que apenas administradores possam realizar ações restritas.

### **Gerenciamento de Exercícios**
- **CRUD de Exercícios:**
  - Criação, leitura, atualização e exclusão de exercícios.
  - Apenas administradores podem executar ações nesse módulo.

### **Planos de Treino**
- **Criação de Planos de Treino:**
  - Planos associados a exercícios específicos.
  - Personalização de planos para diferentes alunos.
- **Listagem de Planos:**
  - Alunos podem visualizar seus planos de treino atribuídos.

### **Execução de Treinos**
- **Registro de Cargas:**
  - Alunos registram o peso utilizado em cada exercício.
  - Histórico de execução para acompanhamento de progresso.
- **Feedback de Treinos:**
  - Alunos podem enviar feedbacks após a execução.
  - Administradores podem responder aos feedbacks.

---

## Arquitetura e Tecnologias

### **Arquitetura**
- **Domain-Driven Design (DDD):**
  - Separação em subdomínios: Identity Management, Training and Progress Tracking.
  - Uso de agregados para gerenciar entidades complexas.
- **Camadas:**
  - Application: Contém os casos de uso e as interfaces dos repositorios
  - Enterprise: Contém as entidades.
  - Infra: Implementações técnicas, como repositórios e integração com banco de dados.

### **Tecnologias**
- **Node.js**: Ambiente de execução.
- **Nest**: Framework web para rotas e middlewares.
- **Prisma**: ORM para comunicação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **TypeScript**: Garantia de tipagem estática.

---

## Endpoints

### **Usuários**
- `POST /accounts` - Cria um novo usuário.
- `POST /sessions` - Realiza login e retorna um token de autenticação.

### **Exercícios**
- `POST /exercises` - Cria um novo exercício (apenas administradores).
- `PUT /exercises` - Edita um exercicio disponivel.
- `DELETE /exercises` - Deleta um exercicio disponivel.
- `GET /exercises` - Lista todos os exercícios disponíveis.

### **Planos de Treino**
- `POST /training-plans` - Cria um novo plano de treino.
- `GET /training-plans` - Lista planos de treino para um aluno.

### **Treinamento**
- `POST /trainings` - Cria um treinamento com exercicios associados.
- `GET /trainings?trainingPlanId=` - Lista planos de treino para um aluno.

### **Execução de Treinos**
- `POST /trainings/feedbacK` - Registra um feedback associado a um treinamento e cria registros com a carga utilizada em cada exercicio do treinamento.
- `POST /trainings/feedback/:id/reply` - Responde a um feedback de treino. ( apenas administrador )
- `GET /trainings/feedback` - Obtem uma lista com todos os feedbacks dos alunos. ( apenas administrador )
- `PUT /trainings/feedbacks/reply/:id` - Marca a resposta de um feedback como lida.

---

## Configuração e Execução

### **Requisitos**
- Node.js v16+
- PostgreSQL

### **Configuração do Ambiente**
1. Clone o repositório:
   ```bash
   git clone https://github.com/FelipeAmorimDEV/personal-management-api.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/personal_management
   JWT_SECRET=your_secret_key
   ```
4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

### **Execução**
- Modo de desenvolvimento:
  ```bash
  npm run dev
  ```
- Modo de produção:
  ```bash
  npm run build
  npm start
  ```

---

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Envie suas alterações:
   ```bash
   git push origin minha-feature
   ```
4. Abra um pull request no repositório original.

---

## Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
