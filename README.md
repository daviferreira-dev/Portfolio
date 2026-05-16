# Davi Ferreira - Portfólio Interativo

Um portfólio Full Stack moderno focado em UX, Acessibilidade (A11y) e interações experimentais.

## Funcionalidades Principais

1. **Theming Contextual**: O design do site reage à seção em que o usuário está (Terminal para códigos, Creative para eventos).
2. **Navegação por Voz**: Uso da `Web Speech API` para navegação hands-free. Diga "Projetos", "Eventos" ou "Contato".
3. **Mouse Virtual (Mobile)**: Navegação por gestos usando a câmera do celular (Visão Computacional).

## Como Rodar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Build de produção:
   ```bash
   npm run build
   ```

## Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com). Basta conectar o repositório e a Vercel detecta as configurações automaticamente via `vercel.json`.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4**
- **GSAP** + **Framer Motion** (animações)
- **TensorFlow.js** + **Hand-Pose-Detection** (visão computacional)
- **Web Speech API** (navegação por voz)
