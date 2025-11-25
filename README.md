# VECT | Architectural AI Refinement

<div align="center">
  <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" alt="VECT Architecture" width="100%" style="border-radius: 10px; margin-bottom: 20px;">

  <h3>The Next Generation of Architectural Visualization</h3>
  
  <p align="center">
    <a href="#sobre">Sobre</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#funcionalidades">Funcionalidades</a> •
    <a href="#instalação">Instalação</a>
  </p>
</div>

---

## 🏛️ Sobre o Projeto

**VECT** é uma plataforma de ponta projetada para arquitetos e designers de interiores que buscam elevar suas visualizações a um novo patamar. Utilizando o poder da **Inteligência Artificial Generativa (Google Gemini)**, o VECT permite o refinamento instantâneo de renders, ajustes de iluminação, troca de materiais e exploração criativa com uma interface fluida e intuitiva.

Não é apenas uma ferramenta de edição; é um **copiloto criativo** para a arquitetura moderna.

## ⚡ Tech Stack

Este projeto foi construído com uma arquitetura moderna e robusta, focada em performance e experiência do usuário.

- **Frontend Core:** React 19, TypeScript, Vite
- **Estilização:** Tailwind CSS v3, PostCSS, Autoprefixer
- **Roteamento:** React Router DOM v6+
- **IA & Integração:** Google Gemini API (`gemini-2.0-flash`)
- **Gerenciamento de Estado:** React Hooks (Custom Hooks para Canvas, Histórico e Viewport)
- **Ícones:** Lucide React

## 💎 Funcionalidades Principais

### 🎨 Editor Inteligente (Canvas)
Um ambiente de edição poderoso e responsivo.
- **Ferramentas de Desenho:** Pincel, Borracha, Seleção (Retângulo/Círculo).
- **Navegação Fluida:** Pan & Zoom (até 500%) com controles intuitivos.
- **Histórico Robusto:** Sistema de Undo/Redo ilimitado para experimentação sem medo.
- **Máscaras de IA:** Seleção precisa de áreas para regeneração via IA.

### 🚀 Arquitetura Profissional
- **Roteamento SPA:** Navegação instantânea entre Home, Editor, Perfil e Configurações.
- **Design System Premium:** Interface "Glassmorphism" com animações suaves e feedback visual rico.
- **Modularidade:** Código refatorado em componentes isolados e hooks reutilizáveis (`useCanvas`, `useHistory`).

## 🛠️ Instalação e Uso

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos
- Node.js (v18+)
- NPM ou Yarn

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/vect.git
   cd vect
   ```

2. **Configure o Frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Variáveis de Ambiente**
   Crie um arquivo `.env` na pasta `frontend` com sua chave da API do Gemini:
   ```env
   VITE_GEMINI_API_KEY=sua_chave_api_aqui
   ```

4. **Execute o Projeto**
   ```bash
   npm run dev
   ```
   O projeto estará rodando em `http://localhost:3000`.

---

<div align="center">
  <p>Desenvolvido com 💙 e ☕ para o futuro da arquitetura.</p>
</div>