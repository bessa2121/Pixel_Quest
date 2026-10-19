# Pixel Quest

Jogo de aventura em pixel art (HTML5 Canvas, JavaScript puro, sem build).
2 territórios · 10 mapas · 10 chefes · 4 classes (Guerreiro, Arqueiro, Mago, Ninja) · loja, missões e personalização do herói.

## Estrutura

```
pixel-quest/
├── index.html        # páginas (início, mapa, jogar, missões, herói)
├── vercel.json       # configuração de deploy
├── favicon.svg
├── css/style.css     # estilos e tema claro/escuro
└── js/               # carregados nesta ordem pelo index.html
    ├── data.js       # territórios, mapas, chefes, classes, missões, loja
    ├── state.js      # progresso salvo (localStorage), XP, missões
    ├── sprites.js    # sprites em pixel art (herói, slimes, chefes)
    ├── map.js        # desenho do mapa do mundo
    ├── ui.js         # telas: início, mapa, herói, missões
    ├── game.js       # motor do jogo: fases, armas, chefes, loop
    └── main.js       # inicialização
```

## Rodar localmente

```bash
npx serve .
# ou: python3 -m http.server 8000
```

## Deploy na Vercel

- **Pelo painel:** Add New → Project → importe o repositório (ou arraste a pasta). Framework Preset: **Other**. Build Command e Output Directory: deixe em branco.
- **Pela CLI:** `npm i -g vercel` e depois `vercel --prod` dentro da pasta.

Não há dependências nem etapa de build.

## Controles

Setas ou WASD movem, Espaço ataca com a arma da classe, P pausa. No celular há botões na tela.
O progresso fica salvo no navegador (chave `pq3` no localStorage).
