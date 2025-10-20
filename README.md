# 🌐 Cápsula do Tempo — Frontend (Next.js)

Este é o **frontend** do projeto **Cápsula do Tempo**, uma aplicação web que permite aos usuários criarem, armazenarem e receberem mensagens no futuro — uma “cápsula do tempo digital”.

---

## 🚀 Tecnologias Utilizadas

* **Next.js 15 (com Turbopack)** — Framework React moderno para aplicações web rápidas.
* **React 19** — Biblioteca principal para construção da interface.
* **Tailwind CSS 4** — Estilização rápida e responsiva.
* **AOS** — Animações suaves e modernas.
* **Shadcn UI** — Componentes acessíveis e personalizáveis.
* **Axios / SWR** — Comunicação com o backend.
* **React Hook Form + Zod** — Validação e controle de formulários.
* **Next-Themes** — Suporte a temas claro/escuro.
* **React Hot Toast / NextJS Toast Notify** — Notificações interativas.

---

## ⚙️ Requisitos

Antes de iniciar o projeto, assegure-se de ter instalados:

* **Node.js** (versão 20 ou superior)
* **npm** (gerenciador de pacotes)
* **Docker** (para rodar a aplicação em container, opcional)

---

## 💻 Rodando Localmente

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Lenox8/Capsula-APP-FrontEd
cd diretorio
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure variáveis de ambiente

Crie um arquivo `.env.local` na raiz e adicione:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4️⃣ Execute o projeto em modo desenvolvimento

```bash
npm run dev
```

Acesse em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🐳 Rodando com Docker

### 1️⃣ Build da imagem

```bash
docker build -t capsula-frontend .
```

### 2️⃣ Executar o container

```bash
docker run -d -p 3000:3000 capsula-frontend
```

O aplicativo estará disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Estrutura do Projeto

```
client/
│
├── app/                # Estrutura de páginas e rotas Next.js
├── components/         # Componentes reutilizáveis
├── hooks/              # Custom hooks
├── public/             # Imagens e assets estáticos
├── styles/             # Configuração do Tailwind CSS
├── utils/              # Funções auxiliares
└── package.json        # Configuração de dependências
```

---

##  Scripts Principais

| Comando         | Descrição                           |
| --------------- | ----------------------------------- |
| `npm run dev`   | Executa em modo de desenvolvimento  |
| `npm run build` | Compila a aplicação para produção   |
| `npm start`     | Inicia o servidor de produção       |
| `npm run lint`  | Verifica erros de linting no código |

---

## 🧱 Dockerfile (Resumo)

O projeto utiliza **build multi-stage** para otimização:

1️⃣ **Builder Stage:** instala dependências e compila o projeto.
2️⃣ **Runner Stage:** roda a aplicação final em ambiente leve (Node Alpine).

---

## ✨ Funcionalidades Principais

* Autenticação de usuário (login/cadastro)
* Criação e edição de cápsulas
* Listagem de cápsulas pendentes
* Envio automático via backend
* Interface moderna e responsiva

---

## 👨‍💻 Desenvolvido por

**Lenox Mucumbi**
Licenciatura em Ensino de Programação Informática
📍 *Instituto Superior Dom Bosco, 2025*

**Nota: copie o file docker.componse para o mesmo diretorio raiz das pastas frontend e backend**
