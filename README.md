Conect+ — Blog

Opção A (padrão): páginas estáticas por post
- Arquivos em `blog/`:
  - `10-tendencias-de-social-media-2024.html`
  - `como-medir-roi-em-campanhas-digitais.html`
  - `o-poder-do-video-marketing-2024.html`

Características
- SEO básico por página (`<title>` e `<meta name="description">` únicos)
- Breadcrumb: Início > Blog > Título do post
- Link “← Voltar para o blog” para `../index.html#blog`
- Layout responsivo com Tailwind e classes existentes; largura legível (~720–768px)
- Imagens com `alt` e hero sem `loading="lazy"`

Opção B (template + JSON) — alternativa escalável
- Arquivos em `blog/`:
  - `post.html`
  - `posts.json`
- Acessar um post via: `blog/post.html?slug=como-medir-roi-em-campanhas-digitais`
- O `post.html` lê o parâmetro `slug`, carrega `posts.json` e injeta título/data/conteúdo, além de atualizar `<title>` e `<meta description>`.

Como adicionar novos posts (Opção B)
1. Adicione um objeto ao array `posts` em `blog/posts.json` com:
   - `slug`, `title`, `dateISO`, `dateText`, `metaDescription`, `heroImage`, `heroAlt`, `contentHtml`
2. Linke no índice: `href="blog/post.html?slug=<seu-slug>"`

Observações
- Mantemos a Opção A como padrão. A Opção B é opcional/documentada para escalar sem criar múltiplos arquivos HTML.
- `styles.css` já inclui `html { scroll-behavior: smooth; }` para navegação suave ao voltar.

Testes recomendados
- Verifique os três links “Ler mais” em `index.html`.
- Em cada página do blog: breadcrumb, link de voltar e navegação anterior/próximo.
- Responsividade em 360px, 768px e 1024px.
- Lighthouse: metas de A11y e Best Practices ≥ 90.


