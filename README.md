# 🐊 Backlogator

<p align="center">
  <img src="resources/logo-backlogator.png" alt="Backlogator Logo" width="180px" style="border-radius: 20%; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);" />
</p>

<p align="center">
  <strong>Transforme sua biblioteca de jogos da Steam em uma competição divertida com os seus amigos.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Ionic-8.5.0-3880ff?style=for-the-badge&logo=ionic&logoColor=white" alt="Ionic" />
  <img src="https://img.shields.io/badge/React-19.0.0-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.1.3-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Firebase-12.13.0-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Steam_API-Connected-171a21?style=for-the-badge&logo=steam&logoColor=white" alt="Steam API" />
</p>

---

## 📖 Sobre o Projeto

O **Backlogator** é um aplicativo mobile-first desenvolvido com **Ionic React** e **Capacitor**, projetado para jogadores que querem organizar seus backlogs de jogos, monitorar horas jogadas e compartilhar conquistas em um ambiente gamificado com amigos. 

O app consome diretamente a **Steam Web API** para sincronizar bibliotecas de jogos em tempo real e utiliza o **Firebase** como infraestrutura de banco de dados e autenticação segura de usuários.

---

## ✨ Funcionalidades Principais

*   🔐 **Autenticação Segura (Firebase Auth):** Sistema completo de Cadastro, Login com verificação de e-mail e Recuperação de Senha.
*   🛡️ **Proteção Antirobô (Google reCAPTCHA):** Integração com reCAPTCHA v2 para evitar acessos automatizados indesejados.
*   🎮 **Sincronização com a Steam:**
    *   Sincroniza perfil público da Steam usando apenas o link ou SteamID.
    *   Trata perfis privados com avisos informativos elegantes.
    *   Importa e ordena toda a sua biblioteca de jogos com base nas horas jogadas.
*   📊 **Painel de Estatísticas:** Veja o total de jogos da sua biblioteca e a contagem consolidada de horas jogadas no seu perfil.
*   🔍 **Pesquisa e Filtragem Dinâmica:** Filtre jogos da biblioteca por categoria, gênero ou nome em tempo real.
*   📱 **Design Premium Mobile-First:** Interface inspirada nos consoles modernos, com Dark Mode nativo, componentes deslizantes (Swiper.js) e transições suaves.

---

## 🛠️ Tecnologias Utilizadas

### Core & Frameworks
*   **Ionic React (v8):** Componentização mobile nativa e design responsivo.
*   **React (v19):** Biblioteca SPA baseada em hooks e estados reativos.
*   **TypeScript:** Tipagem estática para robustez do código.

### Build & Bundler
*   **Vite (v8):** Bundler extremamente rápido, utilizando o empacotador *Rolldown* sob o capô.
*   **Capacitor (v8):** Empacotamento híbrido para compilação nativa em Android e iOS.

### Backend & Integrações
*   **Firebase SDK:**
    *   *Authentication:* Login, Cadastro e Validação.
    *   *Firestore:* Armazenamento de dados do app.
    *   *Realtime Database:* Sincronizações ágeis do ranking de amigos.
*   **Steam Web API:** Busca de metadados de jogos, imagens oficiais e dados de perfis de usuários.
*   **Google reCAPTCHA v2:** Segurança de formulários.

---

## 🚀 Instalação e Execução Local

Siga as etapas abaixo para configurar e executar o projeto em sua máquina:

### 1. Pré-requisitos
*   [Node.js](https://nodejs.org/) (Recomendado versão 20 ou superior LTS)
*   Gerenciador de pacotes `npm`

### 2. Clonar e Instalar Dependências
No seu terminal favorito, navegue até a pasta do projeto e instale as dependências:
```bash
# Entre na pasta do projeto
cd IES-Projeto-Dados

# Instale os pacotes
npm install
```
> [!TIP]
> No Windows, se você estiver usando o terminal **PowerShell** e encontrar erros de política de execução, você pode habilitar a execução de scripts locais com:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
> Ou opte por executar usando o sufixo `.cmd` (ex: `npm.cmd install`).

### 3. Configurar Variáveis de Ambiente
Crie um arquivo na raiz do projeto chamado `.env.local` e configure suas chaves do Firebase, Steam e reCAPTCHA. Você pode usar como base o arquivo `.env.example`:

```env
# Configurações do Firebase - App de Autenticação
VITE_APP_API_KEY_AUTH=SUA_CHAVE_AQUI
VITE_APP_AUTH_DOMAIN_AUTH=seu-projeto.firebaseapp.com
VITE_APP_PROJECT_ID_AUTH=seu-projeto
VITE_APP_STORAGE_BUCKET_AUTH=seu-projeto.firebasestorage.app
VITE_APP_MESSAGING_SENDER_ID_AUTH=SEU_ID
VITE_APP_APP_ID_AUTH=SEU_APP_ID
VITE_APP_MEASUREMENT_ID_AUTH=SEU_MEASUREMENT_ID

# Configurações do Firebase - App do Banco de Dados
VITE_APP_API_KEY_BANCO=SUA_CHAVE_AQUI
VITE_APP_AUTH_DOMAIN_BANCO=seu-projeto-banco.firebaseapp.com
VITE_APP_DATABASE_URL_BANCO=https://seu-projeto-banco-rtdb.firebaseio.com/
VITE_APP_PROJECT_ID_BANCO=seu-projeto-banco
VITE_APP_STORAGE_BUCKET_BANCO=seu-projeto-banco.firebasestorage.app
VITE_APP_MESSAGING_SENDER_ID_BANCO=SEU_ID
VITE_APP_APP_ID_BANCO=SEU_APP_ID
VITE_APP_MEASUREMENT_ID_BANCO=SEU_MEASUREMENT_ID

# Outras Chaves e APIs
VITE_RECAPTCHA_KEY=SUA_CHAVE_SITE_RECAPTCHA
VITE_STEAM_API_KEY=SUA_CHAVE_STEAM_API
```

### 4. Executar Servidor de Desenvolvimento
Inicie o servidor local do Vite para testar no navegador:
```bash
npm run dev
```
*(ou `npm.cmd run dev` se estiver no PowerShell sem permissão de scripts).*

O terminal exibirá um endereço local semelhante a:
👉 `http://localhost:5173/`

---

## 📁 Estrutura de Pastas

```text
IES-Projeto-Dados/
├── .vscode/               # Configurações do VS Code
├── cypress/               # Testes ponta a ponta (E2E)
├── functions/             # Funções de backend (Firebase Cloud Functions)
├── public/                # Recursos estáticos públicos
├── resources/             # Imagens e logotipos do app
├── src/
│   ├── components/        # Componentes globais reutilizáveis
│   ├── contexts/          # Provedores de contexto React (ex: AuthContext)
│   ├── hooks/             # Custom Hooks da aplicação
│   ├── pages/             # Telas do aplicativo (Home, Login, Tabs...)
│   ├── theme/             # Variáveis globais de estilo e cores do Ionic
│   ├── App.tsx            # Roteamento e estrutura principal
│   └── firebase.ts        # Arquivo de inicialização do Firebase
├── tsconfig.json          # Configurações do compilador TypeScript
└── vite.config.ts         # Configurações do Vite
```

---

## 🧪 Scripts Disponíveis

Os comandos abaixo podem ser rodados com `npm run <script>`:

*   `dev`: Executa o servidor de desenvolvimento Vite local.
*   `build`: Compila o TypeScript e constrói a build otimizada de produção.
*   `preview`: Visualiza a build de produção localmente.
*   `test.unit`: Roda os testes unitários da aplicação usando o **Vitest**.
*   `test.e2e`: Roda os testes funcionais de interface usando o **Cypress**.
*   `lint`: Analisa o projeto em busca de problemas ou avisos no código com o **ESLint**.

---

<p align="center">
  Desenvolvido com 💚 para a disciplina de Engenharia de Software.
</p>
