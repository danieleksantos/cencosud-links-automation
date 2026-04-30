<div align="center">
  <img src="https://github.com/user-attachments/assets/49e22bec-e330-4ede-a70d-e45abc395f59" alt="Cencosud Links Logo" width="100"/>

  # Cencosud Links - Content and Campaign Builder

  <p>
    <strong>Localização inteligente de produtos e ImageIDs com foco em produtividade, cache local e design ultra-rápido.</strong>
  </p>

<p>
    <img src="https://img.shields.io/badge/React.js-blue?style=for-the-badge" alt="React">
    <img src="https://img.shields.io/badge/Node.js-green?style=for-the-badge" alt="Node">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>
</div>

---
## 🚀 Deploy 

O projeto está configurado para ambiente interno e pode ser testado nos links locais:

- **Frontend (Vite):** [http://localhost:5173](http://localhost:5173)
- **Backend API (Express):** [http://localhost:3001](http://localhost:3001)
- **Status do Serviço:** [http://localhost:3001/status](http://localhost:3001/status)
- **Banco de Dados:** JSON Local Cache (Persistência em File System).


---

## Sobre o Projeto

O Cencosud Links é uma ferramenta robusta para aceleração de campanhas de e-mail marketing, focada em precisão de dados e performance.

- **Experiência Multi-Bandeira:** Busca unificada em 5 redes (Mercantil, Prezunic, Giga, GBarbosa e Bretas).
- **Extração de ImageID:** Recuperação automática do ID oficial de imagem da VTEX para montagem de templates HTML.
- **Segurança:** Proteção via API Key no Header, Rate Limiting contra bloqueios de IP e política de CORS.
- **Identidade Visual:** Design moderno e intuitivo.

## Tecnologias Utilizadas

- **Frontend:** React.js, Tailwind CSS, Lucide Icons, Axios.
- **Backend:** Node.js, Express, Fuse.js (Fuzzy Matcher), Helmet.js.
- **Banco de Dados:** Cache persistente via JSON (FS Promises) organizado por bandeira.
- **DevOps:** Ambiente Node.js isolado com suporte a variáveis de ambiente (.env).

---

## Como rodar o projeto 
### Opção 1: Localmente

Esta opção sobe o servidor de busca e a interface de usuário na máquina local.
#### 1. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na pasta **server**:
<br />

##### Configurações do Servidor
```bash
PORT=3001
```

##### Segurança
```bash
API_ACCESS_KEY= XXXXXXXXXXXXXXXXX
```

#### 2. Inicie o Backend
```bash
cd server
npm install
npm start
```

#### 3. Inicie o Frontend
```bash
cd client
npm install
npm run dev
```
- Interface: http://localhost:5173
- Backend API: http://localhost:3001

### Opção 2: Apenas Consulta de Cache
Se desejar apenas visualizar os dados já minerados, navegue até:

#### 1. Pasta de Cache:
```bash
cd server/cache
# Visualize os arquivos .json de cada bandeira
```

## Inteligência e Performance
### Busca Fuzzy (Busca Aproximada)
O sistema utiliza a biblioteca **Fuse.js** para realizar o Fuzzy Matching. Diferente de uma busca comum que exige termos exatos, o algoritmo calcula a "Distância de Levenshtein". Isso significa que:
- **Tolerância a Erros:** "Bnanana" encontrará "Banana".
- **Busca por Contexto:** Termos fora de ordem ou incompletos ainda retornam o produto correto.
- **Score de Relevância:** Os resultados são ordenados pelo nível de proximidade com o termo pesquisado.

### Gestão de Requisições e Cache
A estratégia de Cache-First é o coração da estabilidade desta ferramenta:
- **Proteção de IP:** E-commerces possuem sistemas anti-bot que bloqueiam IPs que realizam muitas requisições em curto tempo. O cache evita que consultemos o site oficial para termos já pesquisados anteriormente.
- **Velocidade:** Uma requisição ao site oficial pode levar de 2 a 5 segundos. Uma leitura de cache local leva menos de **10ms**.
- **Independência:** Caso o site oficial da bandeira esteja instável, os produtos em cache continuam disponíveis para a equipe de desenvolvimento.

## Arquitetura e Boas Práticas
Este projeto foi desenvolvido aplicando fundamentos sólidos de engenharia de software:
- **ESLint & Prettier:** Padronização rigorosa de código. O ESLint garante a integridade da lógica e boas práticas de React/TS, enquanto o Prettier mantém a formatação visual consistente em todo o projeto.
- **Componentização:** Header, Cards de produto e Tipagens estão isolados. Isso permite que uma alteração visual no card não afete a lógica de busca do App.
- **Strict Typing:** Uso de TypeScript 100% tipado, garantindo que erros de dados sejam capturados no desenvolvimento, não em produção.
- **Resiliência:** Sistema inteligente de tratamento de erros que traduz falhas técnicas (como backend offline) em mensagens claras para o usuário final.

## Credenciais de Acesso (Segurança)
<p>A aplicação exige uma chave de acesso para comunicar o Frontend com o Backend de forma segura.</p>

## Preview
<p align="center"> 
<img src="https://github.com/user-attachments/assets/704d613e-052d-485b-9455-1b531488c638" alt="Desktop Preview" width="300" /></p>

<br>
<br>
<div align="center">
<p>Desenvolvido por <strong>Daniele K. Santos</strong></p>
</div>
